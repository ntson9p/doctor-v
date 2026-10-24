// Time from an answer to the next screen, with the CPU slowed down to mimic a low-end phone.
// Usage: build, start `npx astro preview --port 4321`, then: node scripts/latency.mjs [cpu-slowdown]
import { chromium, devices } from '@playwright/test';

const rate = Number(process.argv[2] ?? 6);
const browser = await chromium.launch();
const context = await browser.newContext({ ...devices['Pixel 5'] });
const page = await context.newPage();
await context.addInitScript(() => (window.__dvTapSettleMs = 0));
const cdp = await context.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate });

await page.goto('http://localhost:4321/kiem-tra');
await page.getByRole('button', { name: 'Tôi đã hiểu' }).click();
await page.getByRole('button', { name: 'Không có dấu hiệu nào ở trên' }).click();
await page.getByLabel(/^Tuổi của/).fill('30');
await page.getByLabel('Nữ', { exact: true }).check();
await page.getByRole('button', { name: 'Tiếp tục' }).click();

const times = [];
const timed = async (action) => {
  const before = await page.locator('main').innerText();
  const t0 = Date.now();
  await action();
  await page.waitForFunction((b) => document.querySelector('main')?.innerText !== b, before, { timeout: 30000 });
  times.push(Date.now() - t0);
};

await timed(() => page.getByRole('button', { name: /Đau bụng/ }).click());
for (let i = 0; i < 40; i++) {
  if (await page.getByRole('heading', { name: 'Xem lại câu trả lời' }).isVisible()) break;
  const none = page.getByRole('button', { name: /^Không có (dấu hiệu|triệu chứng|bệnh|điều) nào ở trên$/ });
  if (await none.isVisible()) {
    await timed(() => none.click());
    continue;
  }
  const no = page.getByRole('button', { name: 'Không', exact: true });
  if (await no.isVisible()) {
    await timed(() => no.click());
    continue;
  }
  await timed(() => page.getByRole('group', { name: 'Chọn câu trả lời' }).getByRole('button').first().click());
}
const t1 = Date.now();
await page.getByRole('button', { name: 'Xem kết quả' }).click();
await page.locator('.triage').waitFor();
const result = Date.now() - t1;
const sorted = [...times].sort((a, b) => a - b);
const q = (p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
console.log(`CPU ×${rate}: ${times.length} steps, median ${q(0.5)} ms, p90 ${q(0.9)} ms, max ${sorted.at(-1)} ms; result ${result} ms`);
await browser.close();
