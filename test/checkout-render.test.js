// Tests for rendering the checkout form.
// See: SPECS/2026-08-27-checkout/requirements.md

const { test, expect } = require("./harness.js");
const { renderCheckout } = require("../frontend/render.js");

test("the checkout form includes all four payment fields", () => {
  const html = renderCheckout();
  expect(html.includes('placeholder="Name on card"')).toBe(true);
  expect(html.includes('placeholder="Card number"')).toBe(true);
  expect(html.includes('placeholder="MM/YY"')).toBe(true);
  expect(html.includes('placeholder="CVC"')).toBe(true);
});

test("the checkout form has a Pay button", () => {
  const html = renderCheckout();
  expect(html.includes("Pay")).toBe(true);
});
