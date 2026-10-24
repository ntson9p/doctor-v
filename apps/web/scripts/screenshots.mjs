// Screenshots of the main screens for visual review (not a test).
// Usage: build, start `npx astro preview --port 4321`, then: node scripts/screenshots.mjs <out-dir> [scale]
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium, devices } from '@playwright/test';

const out = process.argv[2] ?? 'screenshots';
const scale = process.argv[3] ?? '1';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ ...devices['Pixel 5'] });
await context.addInitScript((s) => localStorage.setItem('dv.fontScale', s), scale);
const page = await context.newPage();
const base = 'http://localhost:4321';
let n = 0;
const shot = async (name) => {
  n += 1;
  await page.screenshot({ path: join(out, `${String(n).padStart(2, '0')}-${name}.png`), fullPage: true });
};

await page.goto(base + '/');
await shot('home');
await page.goto(base + '/kiem-tra');
await page.getByRole('button', { name: 'Tôi đã hiểu' }).waitFor();
await shot('intro');
await page.getByRole('button', { name: 'Tôi đã hiểu' }).click();
await shot('emergency-screen');
await page.getByRole('button', { name: 'Không có dấu hiệu nào ở trên' }).click();
await page.getByLabel(/^Tuổi của/).fill('34');
await page.getByLabel('Nữ', { exact: true }).check();
await shot('profile');
await page.getByRole('button', { name: 'Tiếp tục' }).click();
await shot('complaints');
await page.getByRole('button', { name: /Sốt/ }).click();
await shot('first-question');
// Walk on with "no" answers, saving a yes/no and a multiple-choice screen when met.
let savedYesNo = false;
let savedChoice = false;
for (let i = 0; i < 45; i++) {
  if (await page.getByRole('heading', { name: 'Xem lại câu trả lời' }).isVisible()) break;
  const none = page.getByRole('button', { name: /^Không có (dấu hiệu|triệu chứng|bệnh|điều) nào ở trên$/ });
  if (await none.isVisible()) {
    await none.click();
    continue;
  }
  const no = page.getByRole('button', { name: 'Không', exact: true });
  if (await no.isVisible()) {
    if (!savedYesNo) {
      await shot('yes-no-question');
      savedYesNo = true;
    }
    await no.click();
    continue;
  }
  if (!savedChoice) {
    await shot('multiple-choice');
    savedChoice = true;
  }
  await page.getByRole('group', { name: 'Chọn câu trả lời' }).getByRole('button').first().click();
}
await shot('review');
await page.getByRole('button', { name: 'Xem kết quả' }).click();
await shot('result');

// Emergency stop: fever with a purpuric rash after cold hands.
await page.getByRole('button', { name: 'Kiểm tra lại từ đầu' }).click();
await page.getByRole('button', { name: 'Không có dấu hiệu nào ở trên' }).click();
await page.getByLabel(/^Tuổi của/).fill('16');
await page.getByLabel('Nam', { exact: true }).check();
await page.getByRole('button', { name: 'Tiếp tục' }).click();
await page.getByRole('button', { name: /Sốt/ }).click();
await page.getByLabel(/Tay chân lạnh/).check();
await page.getByRole('button', { name: /^Tiếp tục/ }).click();
for (let i = 0; i < 6 && !(await page.locator('.triage').isVisible()); i++) {
  const q = await page.locator('[data-autofocus]').innerText();
  const yes = /ban|nốt đỏ/i.test(q) ? 'Có' : 'Không';
  await page.getByRole('button', { name: yes, exact: true }).click();
}
await shot('result-emergency');
await browser.close();
console.log(`saved ${n} screenshots to ${out}`);
