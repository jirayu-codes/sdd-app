// Papoi in-memory order book.
//
// When a payment succeeds we hand the customer an order number so the
// kitchen can match the order. Numbers just count up (1, 2, 3, ...) and only
// live in memory while the page is open — refreshing the page starts back at
// #1 (see SPECS/TECH.md).
//
// The helpers are pure (they take their inputs as arguments) so they can be
// tested in Node.

// A fresh order book. The "next" number is the one the next order will get.
function newOrderBook() {
  return { next: 1 };
}

// Place an order: return the next order number, bump the counter for next
// time, and clear the cart so the next order starts empty.
function placeOrder(orderBook, cart) {
  const order = { number: orderBook.next };
  orderBook.next += 1;
  cart.splice(0, cart.length);
  return order;
}

// Works in Node for testing.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    newOrderBook,
    placeOrder
  };
}
