// Tests for the in-memory cart and its counter.
// See: SPECS/2026-08-27-menu-page/requirements.md

const { test, expect } = require("./harness.js");
const { menu } = require("../frontend/menu.js");
const { addToCart, cartCount } = require("../frontend/cart.js");

test("the cart starts empty with a count of zero", () => {
  const cart = [];
  expect(cartCount(cart)).toBe(0);
});

test("adding an item puts it in the cart and bumps the count", () => {
  const cart = [];
  addToCart(cart, menu[0]);
  expect(cart.length).toBe(1);
  expect(cart[0].id).toBe(menu[0].id);
  expect(cartCount(cart)).toBe(1);
});

test("adding the same item twice counts two items", () => {
  const cart = [];
  addToCart(cart, menu[0]);
  addToCart(cart, menu[0]);
  expect(cartCount(cart)).toBe(2);
});

test("adding different items increases the count for each", () => {
  const cart = [];
  addToCart(cart, menu[0]);
  addToCart(cart, menu[3]);
  addToCart(cart, menu[6]);
  expect(cartCount(cart)).toBe(3);
});
