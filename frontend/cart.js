// Papoi in-memory cart.
//
// The cart is just an array. This module keeps a single shared cart for the
// page and provides small helper functions. Everything lives in memory only;
// refreshing the page clears it (see SPECS/TECH.md).
//
// Pure functions that take the cart as an argument are easy to test in Node.

// Add an item to the cart. An "item" here is one of the menu objects.
function addToCart(cart, item) {
  cart.push(item);
  return cart;
}

// How many items are in the cart right now.
function cartCount(cart) {
  return cart.length;
}

// One shared cart for the running page.
const cart = [];

// Works in Node for testing.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { addToCart, cartCount };
}
