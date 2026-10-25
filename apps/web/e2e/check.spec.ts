import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

// These tests click as soon as a screen appears; the tap guard has its own test below.
test.beforeEach(async ({ page }, info) => {
  if (!info.title.includes('tap guard')) await page.addInitScript(() => (window.__dvTapSettleMs = 0));
});

async function expectNoAxeViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
}

async function expectNoHorizontalScroll(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

/** Starts a check and fills the basic information. */
async function startCheck(page: Page, age: string, sex: 'Nữ' | 'Nam'): Promise<void> {
  await page.goto('/kiem-tra');
  await page.getByRole('button', { name: 'Tôi đã hiểu' }).click();
  await page.getByRole('button', { name: 'Không có dấu hiệu nào ở trên' }).click();
  await page.getByLabel(/^Tuổi của/).fill(age);
  await page.getByLabel(sex, { exact: true }).check();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
}

/** Waits until the engine is idle: screens are read only once the busy state is gone. */
async function settle(page: Page): Promise<void> {
  await page.locator('.check[aria-busy="false"]').waitFor();
}

/** Answers every question with "no" (or the first option) until the review screen. */
async function answerNoToEverything(page: Page, eachScreen?: () => Promise<void>): Promise<number> {
  for (let i = 0; i < 45; i++) {
    await settle(page);
    if (eachScreen) await eachScreen();
    if (await page.getByRole('heading', { name: 'Xem lại câu trả lời' }).isVisible()) return i;
    if (await page.locator('.triage').isVisible()) return i;
    const none = page.getByRole('button', { name: /^Không có (dấu hiệu|triệu chứng|bệnh|điều) nào ở trên$/ });
    if (await none.isVisible()) {
      await none.click();
      continue;
    }
    const no = page.getByRole('button', { name: 'Không', exact: true });
    if (await no.isVisible()) {
      await no.click();
      continue;
    }
    await page.getByRole('group', { name: 'Chọn câu trả lời' }).getByRole('button').first().click();
  }
  throw new Error('The check did not reach the review screen');
}

test('the terms and privacy page is reachable from every page and marked as a draft', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Điều khoản và quyền riêng tư' }).click();
  await expect(page.getByText(/Bản nháp, chưa qua luật sư rà soát/)).toBeVisible();
  await expectNoAxeViolations(page);
});

test('home shows the start button and a call link to 115', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Bắt đầu kiểm tra' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Gọi 115' }).first()).toHaveAttribute('href', 'tel:115');
  await expectNoAxeViolations(page);
  await expectNoHorizontalScroll(page);
});

test('an emergency sign leads straight to "Gọi 115"', async ({ page }) => {
  await page.goto('/kiem-tra');
  await page.getByRole('button', { name: 'Tôi đã hiểu' }).click();
  await page.locator('.choice').first().click();
  await page.getByRole('button', { name: /^Tiếp tục/ }).click();
  await expect(page.getByRole('heading', { name: /Gọi 115 ngay/ })).toBeVisible();
  await expectNoAxeViolations(page);
});

test('a full check for fever reaches a result with rounded percentages', async ({ page }) => {
  await startCheck(page, '30', 'Nam');
  await page.getByRole('button', { name: /Sốt/ }).click();
  await expectNoAxeViolations(page);
  const asked = await answerNoToEverything(page);
  expect(asked).toBeGreaterThan(3);
  await page.getByRole('button', { name: 'Xem kết quả' }).click();
  await expect(page.locator('.triage')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Tình trạng có thể liên quan' })).toBeVisible();
  await expect(page.getByText(/(khoảng|dưới) \d+%/).first()).toBeVisible();
  await expectNoAxeViolations(page);
  await expectNoHorizontalScroll(page);
});

test('accent-insensitive search finds a complaint by a synonym', async ({ page }) => {
  await startCheck(page, '40', 'Nữ');
  await page.getByLabel(/Tìm triệu chứng/).fill('nhuc dau');
  await expect(page.locator('.complaint')).toHaveCount(1);
  await expect(page.locator('.complaint')).toContainText('Đau đầu');
});

test('search respects the accents typed and reads a sentence', async ({ page }) => {
  await startCheck(page, '40', 'Nữ');
  const search = page.getByLabel(/Tìm triệu chứng/);
  await search.fill('đầu');
  await expect(page.locator('.complaint')).toHaveCount(1);
  await expect(page.locator('.complaint')).toContainText('Đau đầu');
  await search.fill('bé bị sốt cao');
  await expect(page.locator('.complaint')).toHaveCount(1);
  await expect(page.locator('.complaint')).toContainText('Sốt');
  // "nôn" (vomiting) is not "nóng", which is part of a fever synonym.
  await search.fill('nôn');
  await expect(page.locator('.search-status')).toContainText('Chưa tìm thấy "nôn"');
});

test('a symptom the pilot does not cover gets advice, and every complaint stays on screen', async ({ page }) => {
  await startCheck(page, '70', 'Nữ');
  await page.getByLabel(/Tìm triệu chứng/).fill('chóng mặt');
  const status = page.locator('.search-status');
  await expect(status).toHaveAttribute('role', 'status');
  await expect(status).toContainText('Chưa tìm thấy "chóng mặt"');
  await expect(status).toContainText('gọi 115');
  await expect(status).toContainText('Kết quả sẽ chưa tính đến "chóng mặt"');
  await expect(page.locator('.complaint')).toHaveCount(3);
  await expectNoAxeViolations(page);
  await expectNoHorizontalScroll(page);
  await page.locator('.complaint', { hasText: 'Đau đầu' }).click();
  await settle(page);
  await expect(page.locator('.search-status')).toHaveCount(0);
});

test('when the on-screen keyboard opens, the search field moves up so the advice below stays visible', async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem('dv.fontScale', '1.75'));
  await startCheck(page, '70', 'Nữ');
  const { width, height } = page.viewportSize() ?? { width: 393, height: 727 };
  const search = page.getByLabel(/Tìm triệu chứng/);
  await search.focus();
  // An on-screen keyboard takes about 40% of a phone screen.
  await page.setViewportSize({ width, height: Math.round(height * 0.6) });
  await search.pressSequentially('chóng mặt');
  await expect(page.locator('.search-status strong').first()).toBeInViewport();
  // The search box sits below the sticky header, not under it.
  const gap = await search.evaluate(
    (el) => el.getBoundingClientRect().top - (document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 0),
  );
  expect(gap).toBeGreaterThanOrEqual(0);
});

test('the largest text size is remembered and the layout does not scroll sideways', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Cỡ chữ').click();
  await page.getByRole('button', { name: 'Lớn nhất' }).click();
  await page.reload();
  const scale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--scale').trim());
  expect(scale).toBe('1.75');
  await expectNoHorizontalScroll(page);
  await page.goto('/kiem-tra');
  await page.getByRole('button', { name: 'Tôi đã hiểu' }).click();
  await expectNoHorizontalScroll(page);
});

test('the whole check works at the largest text size without sideways scrolling', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('dv.fontScale', '1.75'));
  await startCheck(page, '70', 'Nữ');
  await expectNoHorizontalScroll(page);
  await page.getByRole('button', { name: /Đau bụng/ }).click();
  await answerNoToEverything(page, () => expectNoHorizontalScroll(page));
  await expectNoHorizontalScroll(page);
  await page.getByRole('button', { name: 'Xem kết quả' }).click();
  await expect(page.locator('.triage')).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test('"Sửa" on the review screen asks again from that question', async ({ page }) => {
  await startCheck(page, '25', 'Nam');
  await page.getByRole('button', { name: /Đau đầu/ }).click();
  const firstQuestion = await page.locator('[data-autofocus]').innerText();
  await answerNoToEverything(page);
  await page.getByRole('button', { name: 'Sửa' }).first().click();
  await expect(page.locator('[data-autofocus]')).toHaveText(firstQuestion);
  await answerNoToEverything(page);
  await expect(page.getByRole('heading', { name: 'Xem lại câu trả lời' })).toBeVisible();
});

test('tap guard: taps in the first moments after a question appears are ignored', async ({ page }) => {
  const anyAnswer = page.getByRole('button', { name: /^(Không|Không có (dấu hiệu|triệu chứng|bệnh|điều) nào ở trên)$/ }).first();
  // The whole screen: two checklists in a row can share the same title.
  const question = page.locator('main');
  await page.goto('/kiem-tra');
  await page.getByRole('button', { name: 'Tôi đã hiểu' }).click();
  // The emergency screen is guarded too: an instant tap is ignored, a later one is taken.
  await page.getByRole('button', { name: 'Không có dấu hiệu nào ở trên' }).click();
  await expect(page.getByLabel(/^Tuổi của/)).toHaveCount(0);
  await page.waitForTimeout(450);
  await page.getByRole('button', { name: 'Không có dấu hiệu nào ở trên' }).click();
  await page.getByLabel(/^Tuổi của/).fill('30');
  await page.getByLabel('Nam', { exact: true }).check();
  await page.getByRole('button', { name: 'Tiếp tục' }).click();
  await page.getByRole('button', { name: /Đau đầu/ }).click();
  await settle(page);
  // A tap right after the question appears (a second tap queued while the last answer computed).
  const shown = await question.innerText();
  await anyAnswer.click();
  await page.waitForTimeout(150);
  await settle(page);
  expect(await question.innerText()).toBe(shown);
  // After the screen has settled the same tap is taken.
  await page.waitForTimeout(450);
  await anyAnswer.click();
  await settle(page);
  await expect.poll(() => question.innerText()).not.toBe(shown);
});
