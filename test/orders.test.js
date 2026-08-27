// Tests for the in-memory order book and order numbers.
// See: SPECS/2026-08-27-order-confirmation/requirements.md

const { test, expect } = require("./harness.js");
const { newOrderBook, placeOrder } = require("../frontend/orders.js");

test("a new order book starts its next number at 1", () => {
  const book = newOrderBook();
  expect(book.next).toBe(1);
});

test("placeOrder returns the next number and then increases the counter", () => {
  const book = newOrderBook();
  const cart = [{ item: {}, quantity: 1 }];
  const first = placeOrder(book, cart);
  expect(first.number).toBe(1);
  const second = placeOrder(book, cart);
  expect(second.number).toBe(2);
  expect(book.next).toBe(3);
});

test("placeOrder clears the cart", () => {
  const book = newOrderBook();
  const cart = [{ item: {}, quantity: 2 }];
  placeOrder(book, cart);
  expect(cart.length).toBe(0);
});
