import { test, expect } from '@playwright/test';

const INITIAL_URL = 'https://statics.webridge.net/';
const REDIRECT_TARGET_URL = 'https://webridge.net/';

const ROBOTS_TXT_URL = 'https://statics.webridge.net/robots.txt';
const ROBOTS_TXT_EXPECTED_CONTENT = `User-agent: *
Disallow: /`;

test('トップページは指定されたURLへリダイレクトされる', async ({ page }) => {
  const [initialRequest] = await Promise.all([
    page.waitForEvent('request', request => request.url() === INITIAL_URL),
    page.goto(INITIAL_URL),
  ]);

  const initialResponse = await initialRequest.response();
  expect(initialResponse).not.toBeNull();
  expect(initialResponse?.status()).toBe(301);
  const locationHeader = initialResponse?.headers().location;
  expect(locationHeader).toBe(REDIRECT_TARGET_URL);
  await page.waitForURL(REDIRECT_TARGET_URL);
  expect(page.url()).toBe(REDIRECT_TARGET_URL);
});

test('robots.txtでクローリングは全て拒否される', async ({ page }) => {
  const response = await page.goto(ROBOTS_TXT_URL);

  expect(response).not.toBeNull();
  expect(response?.status()).toBe(200);
  const responseBody = await response?.text();
  expect(responseBody).toBe(ROBOTS_TXT_EXPECTED_CONTENT);
});