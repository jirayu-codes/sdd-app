// Tests for the simulated checkout payment.
// See: SPECS/2026-08-27-checkout/requirements.md

const { test, expect } = require("./harness.js");
const {
  formatCardNumber,
  isValidCardNumber,
  isValidCvc,
  isValidExpiry,
  validatePayment
} = require("../frontend/checkout.js");

// A fixed reference "now" so expiry tests are not affected by the date the
// tests are run. Mid-2026.
const NOW = new Date(2026, 7, 15); // Aug 15 2026

test("formatCardNumber groups digits into fours", () => {
  expect(formatCardNumber("4242424242424242")).toBe("4242 4242 4242 4242");
});

test("formatCardNumber strips non-digits", () => {
  expect(formatCardNumber("4242-4242 4242 4242x")).toBe("4242 4242 4242 4242");
});

test("formatCardNumber handles partial input while typing", () => {
  expect(formatCardNumber("1234 56")).toBe("1234 56");
  expect(formatCardNumber("")).toBe("");
});

test("isValidCardNumber accepts 15 and 16 digit numbers", () => {
  expect(isValidCardNumber("4242424242424242")).toBe(true);
  expect(isValidCardNumber("424242424242424")).toBe(true);
});

test("isValidCardNumber rejects short, long, and non-digit values", () => {
  expect(isValidCardNumber("42421234")).toBe(false);
  expect(isValidCardNumber("42424242424242424242")).toBe(false);
  expect(isValidCardNumber("abcabcabcabcabca")).toBe(false);
  expect(isValidCardNumber("")).toBe(false);
});

test("isValidCvc accepts exactly 3 digits", () => {
  expect(isValidCvc("123")).toBe(true);
});

test("isValidCvc rejects wrong length and non-digits", () => {
  expect(isValidCvc("12")).toBe(false);
  expect(isValidCvc("1234")).toBe(false);
  expect(isValidCvc("abc")).toBe(false);
  expect(isValidCvc("")).toBe(false);
});

test("isValidExpiry accepts a future month/year", () => {
  expect(isValidExpiry("12/27", NOW)).toBe(true);
  expect(isValidExpiry("01/30", NOW)).toBe(true);
});

test("isValidExpiry rejects a past or badly formatted expiry", () => {
  expect(isValidExpiry("01/20", NOW)).toBe(false); // past
  expect(isValidExpiry("13/27", NOW)).toBe(false); // bad month
  expect(isValidExpiry("1/27", NOW)).toBe(false); // bad format
  expect(isValidExpiry("", NOW)).toBe(false);
});

test("validatePayment returns errors for missing and invalid details", () => {
  const errors = validatePayment({ name: "", cardNumber: "123", expiry: "", cvc: "" }, NOW);
  expect(errors.length).toBeGreaterThan(0);
  expect(errors.join(" ").toLowerCase().includes("name")).toBe(true);
  expect(errors.join(" ").toLowerCase().includes("card")).toBe(true);
});

test("validatePayment returns no errors for a valid test card", () => {
  const errors = validatePayment(
    { name: "Jane Doe", cardNumber: "4242 4242 4242 4242", expiry: "12/27", cvc: "123" },
    NOW
  );
  expect(errors.length).toBe(0);
});
