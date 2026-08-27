// Tests for rendering the cart.
// See: SPECS/2026-08-27-cart/requirements.md

const { test, expect } = require("./harness.js");
const { menu } = require("../frontend/menu.js");
const cartModule = require("../frontend/cart.js");
const { renderCart } = require("../frontend/render.js");

test("an empty cart renders an empty-message", () => {
  const cart = cartModule.newCart();
  const html = renderCart(cart, menu);
  expect(html.includes("empty")).toBe(true);
});

test("the cart renders one row per grouped item with name, quantity, and price", () => {
  const cart = cartModule.newCart();
  cartModule.addToCart(cart, menu[0]);
  cartModule.addToCart(cart, menu[0]); // quantity 2
  cartModule.addToCart(cart, menu[3]);
  const html = renderCart(cart, menu);

  expect(html.includes(menu[0].name)).toBe(true);
  expect(html.includes(menu[3].name)).toBe(true);
  expect(html.includes("2")).toBe(true); // quantity of menu[0]
  expect(html.includes((2 * menu[0].price).toFixed(2))).toBe(true); // line price
});

test("each cart row has increase, decrease, and remove controls", () => {
  const cart = cartModule.newCart();
  cartModule.addToCart(cart, menu[0]);
  const html = renderCart(cart, menu);
  expect(html.includes("cart-increase")).toBe(true);
  expect(html.includes("cart-decrease")).toBe(true);
  expect(html.includes("cart-remove")).toBe(true);
});
