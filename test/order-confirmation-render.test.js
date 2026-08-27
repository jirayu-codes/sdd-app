// Tests for rendering the order confirmation.
// See: SPECS/2026-08-27-order-confirmation/requirements.md

const { test, expect } = require("./harness.js");
const { renderConfirmation } = require("../frontend/render.js");

test("the confirmation shows the order number and sent-to-kitchen message", () => {
  const html = renderConfirmation({ number: 1 });
  expect(html.includes("Order #1")).toBe(true);
  expect(html.toLowerCase().includes("sent to the kitchen")).toBe(true);
});

test("the confirmation has a Done button", () => {
  const html = renderConfirmation({ number: 5 });
  expect(html.includes('id="done-button"')).toBe(true);
});
