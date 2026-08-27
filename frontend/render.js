// Papoi menu rendering.
//
// This builds the HTML for the menu page. It is a pure function: you give it
// the menu and the list of categories, and it gives you back a string of
// HTML. Keeping it pure (no touching the page) makes it easy to test.
//
// The "Add to cart" button carries data-item-id so the page script can know
// which item was clicked.

function renderMenu(menu, categories) {
  const sections = categories.map((category) => {
    const items = menu.filter((item) => item.category === category);
    const cards = items
      .map((item) => {
        const price = item.price.toFixed(2);
        return (
          '<article class="menu-item">' +
            '<div class="item-emoji">' + item.emoji + "</div>" +
            '<h3 class="item-name">' + item.name + "</h3>" +
            '<p class="item-description">' + item.description + "</p>" +
            '<p class="item-price">$' + price + "</p>" +
            '<button class="add-to-cart" data-item-id="' + item.id + '">Add to cart</button>' +
          "</article>"
        );
      })
      .join("");

    return (
      '<section class="menu-category">' +
        "<h2>" + category + "</h2>" +
        '<div class="menu-grid">' + cards + "</div>" +
      "</section>"
    );
  });

  return sections.join("");
}

// Render the cart into HTML. One row per grouped entry with the item name,
// quantity, line price, and +, -, and Remove controls. Shows the grand total.
// Returns a friendly message when the cart is empty.
function renderCart(cart, menu) {
  if (cart.length === 0) {
    return '<p class="empty-cart">Your cart is empty.</p>';
  }

  const total = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);

  const rows = cart
    .map((entry) => {
      const id = entry.item.id;
      const lineTotal = (entry.item.price * entry.quantity).toFixed(2);
      return (
        '<div class="cart-row">' +
          '<div class="cart-name">' + entry.item.name + "</div>" +
          '<div class="cart-line">' +
            '<button class="cart-decrease" data-item-id="' + id + '">-</button>' +
            '<span class="cart-quantity">' + entry.quantity + "</span>" +
            '<button class="cart-increase" data-item-id="' + id + '">+</button>' +
          "</div>" +
          '<div class="cart-line-total">$' + lineTotal + "</div>" +
          '<button class="cart-remove" data-item-id="' + id + '">Remove</button>' +
        "</div>"
      );
    })
    .join("");

  return (
    '<div class="cart-rows">' + rows + "</div>" +
    '<div class="cart-total">Total: $' + total.toFixed(2) + "</div>" +
    '<button id="checkout-button" type="button">Checkout</button>'
  );
}

// Render the simulated payment form. Shows four fields and a Pay button, and
// a list of error messages (if any).
function renderCheckout(errors) {
  const errorList = (errors || [])
    .map(function (message) {
      return '<li class="payment-error">' + message + "</li>";
    })
    .join("");

  return (
    '<h2>Checkout</h2>' +
    '<form id="checkout-form" class="checkout-form">' +
      '<label>Name on card' +
        '<input id="payment-name" type="text" placeholder="Name on card" />' +
      "</label>" +
      '<label>Card number' +
        '<input id="payment-card" type="text" inputmode="numeric" placeholder="Card number" />' +
      "</label>" +
      '<div class="checkout-row">' +
        '<label>Expiry (MM/YY)' +
          '<input id="payment-expiry" type="text" placeholder="MM/YY" />' +
        "</label>" +
        '<label>CVC' +
          '<input id="payment-cvc" type="text" inputmode="numeric" placeholder="CVC" />' +
        "</label>" +
      "</div>" +
      '<ul id="payment-errors" class="payment-errors">' + errorList + "</ul>" +
      '<button id="pay-button" type="submit">Pay</button>' +
    "</form>"
  );
}

// Works in Node for testing.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { renderMenu, renderCart, renderCheckout };
}
