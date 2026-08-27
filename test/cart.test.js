// Tests for the in-memory cart and its counter.
// See: SPECS/2026-08-27-cart/requirements.md

const { test, expect } = require("./harness.js");
const { menu } = require("../frontend/menu.js");

const cartModule = require("../frontend/cart.js");

function freshCart() {
  return cartModule.newCart();
}

test("a new cart starts empty with a count of zero", () => {
  const cart = freshCart();
  expect(cartModule.cartCount(cart)).toBe(0);
  expect(cartModule.cartTotal(cart)).toBe(0);
});

test("adding an item creates a grouped entry with quantity one", () => {
  const cart = freshCart();
  cartModule.addToCart(cart, menu[0]);
  expect(cart.length).toBe(1);
  expect(cart[0].item.id).toBe(menu[0].id);
  expect(cart[0].quantity).toBe(1);
  expect(cartModule.cartCount(cart)).toBe(1);
});

test("adding the same item twice groups it as quantity two", () => {
  const cart = freshCart();
  cartModule.addToCart(cart, menu[0]);
  cartModule.addToCart(cart, menu[0]);
  expect(cart.length).toBe(1);
  expect(cart[0].quantity).toBe(2);
  expect(cartModule.cartCount(cart)).toBe(2);
});

test("adding different items keeps separate grouped entries", () => {
  const cart = freshCart();
  cartModule.addToCart(cart, menu[0]);
  cartModule.addToCart(cart, menu[3]);
  cartModule.addToCart(cart, menu[6]);
  expect(cart.length).toBe(3);
  expect(cartModule.cartCount(cart)).toBe(3);
});

test("increaseQuantity bumps a matching entry and keeps the count in step", () => {
  const cart = freshCart();
  cartModule.addToCart(cart, menu[0]);
  cartModule.increaseQuantity(cart, menu[0].id);
  expect(cart[0].quantity).toBe(2);
  expect(cartModule.cartCount(cart)).toBe(2);
});

test("decreaseQuantity reduces the quantity", () => {
  const cart = freshCart();
  cartModule.addToCart(cart, menu[0]);
  cartModule.addToCart(cart, menu[0]);
  cartModule.decreaseQuantity(cart, menu[0].id);
  expect(cart[0].quantity).toBe(1);
});

test("decreaseQuantity removes the entry when quantity would drop below one", () => {
  const cart = freshCart();
  cartModule.addToCart(cart, menu[0]);
  cartModule.decreaseQuantity(cart, menu[0].id);
  expect(cart.length).toBe(0);
});

test("removeFromCart deletes the entry for an item", () => {
  const cart = freshCart();
  cartModule.addToCart(cart, menu[0]);
  cartModule.addToCart(cart, menu[3]);
  cartModule.removeFromCart(cart, menu[0].id);
  expect(cart.length).toBe(1);
  expect(cart[0].item.id).toBe(menu[3].id);
});

test("cartTotal sums price times quantity", () => {
  const cart = freshCart();
  cartModule.addToCart(cart, menu[0]); // 3.50 x 1
  cartModule.addToCart(cart, menu[3]); // 5.00 x 1
  cartModule.addToCart(cart, menu[3]); // +5.00 -> total 13.50
  expect(cartModule.cartTotal(cart)).toBe(3.5 + 5.0 + 5.0);
});
