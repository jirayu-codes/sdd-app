// Papoi in-memory cart.
//
// The cart is a list of entries. Each entry groups a menu item with a
// quantity:
//     { item: <menu object>, quantity: <number> }
// Adding an item that is already in the cart increases its quantity instead
// of creating a duplicate row. Everything lives in memory only; refreshing
// the page clears it (see SPECS/TECH.md).
//
// The helper functions are pure (they take the cart as an argument) so they
// are easy to test in Node.

// Create a fresh, empty cart. Use this so each caller gets its own array.
function newCart() {
  return [];
}

// Add an item. If the item is already in the cart, increase its quantity;
// otherwise add a new entry with quantity 1.
function addToCart(cart, item) {
  const entry = cart.find((e) => e.item.id === item.id);
  if (entry) {
    entry.quantity += 1;
  } else {
    cart.push({ item, quantity: 1 });
  }
  return cart;
}

// Total number of items, i.e. the sum of all quantities.
function cartCount(cart) {
  return cart.reduce((sum, entry) => sum + entry.quantity, 0);
}

// Total price of everything in the cart: price x quantity for each entry.
function cartTotal(cart) {
  return cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
}

// Increase the quantity of the entry with this item id.
function increaseQuantity(cart, itemId) {
  const entry = cart.find((e) => e.item.id === itemId);
  if (entry) {
    entry.quantity += 1;
  }
  return cart;
}

// Decrease the quantity by one. If it would drop below 1, remove the entry.
function decreaseQuantity(cart, itemId) {
  const index = cart.findIndex((e) => e.item.id === itemId);
  if (index === -1) {
    return cart;
  }
  cart[index].quantity -= 1;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  return cart;
}

// Remove the entry for this item id entirely.
function removeFromCart(cart, itemId) {
  const index = cart.findIndex((e) => e.item.id === itemId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  return cart;
}

// Remove every entry from the cart (used after a successful payment).
function emptyCart(cart) {
  cart.splice(0, cart.length);
  return cart;
}

// One shared cart for the running page.
const cart = newCart();

// Works in Node for testing.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    newCart,
    addToCart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    emptyCart
  };
}
