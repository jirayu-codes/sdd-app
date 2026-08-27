// Papoi page script.
//
// This file brings everything together on the page:
//   - it renders the menu, the cart, and the checkout form,
//   - it toggles between the menu, cart, and checkout views, and
//   - it listens for clicks on "Add to cart", the cart +, -, and Remove
//     buttons, and the checkout form, updating the page to match.
//
// The menu, render, cart, and checkout logic live in their own files
// (menu.js, render.js, cart.js, checkout.js) so they can also be tested in
// Node.

const menuContainer = document.getElementById("menu");
const cartView = document.getElementById("cart-view");
const checkoutView = document.getElementById("checkout-view");
const cartCountElement = document.getElementById("cart-count");
const menuButton = document.getElementById("view-menu");
const cartButton = document.getElementById("view-cart");

// Becomes true after a successful payment.
let paid = false;

// Counts order numbers for this page session (starts at #1).
const orderBook = newOrderBook();

// Render the menu into the page once the page has loaded.
menuContainer.innerHTML = renderMenu(menu, CATEGORIES);

// Refresh the cart section and the header counter to match the current cart.
function updateCartView() {
  cartView.innerHTML = renderCart(cart, menu);
  cartCountElement.textContent = cartCount(cart);
}

// Show the checkout view with a fresh (or re-styled) payment form.
function showCheckoutForm(errors) {
  checkoutView.innerHTML = renderCheckout(errors);
  const form = document.getElementById("checkout-form");
  const cardInput = document.getElementById("payment-card");

  // Format the card number into groups of four as the customer types.
  if (cardInput) {
    cardInput.addEventListener("input", () => {
      cardInput.value = formatCardNumber(cardInput.value);
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handlePayment();
    });
  }
}

// Read the form, validate it, and either show the errors or process.
function handlePayment() {
  const details = {
    name: document.getElementById("payment-name").value,
    cardNumber: document.getElementById("payment-card").value,
    expiry: document.getElementById("payment-expiry").value,
    cvc: document.getElementById("payment-cvc").value
  };

  const errors = validatePayment(details, new Date());
  if (errors.length > 0) {
    showCheckoutForm(errors);
    return;
  }

  // Valid: show a brief "Processing" step, then the confirmation.
  checkoutView.innerHTML = '<p class="processing">Processing&hellip;</p>';
  setTimeout(() => {
    paid = true;
    const order = placeOrder(orderBook, cart);
    updateCartView();
    checkoutView.innerHTML = renderConfirmation(order);
    const doneButton = document.getElementById("done-button");
    if (doneButton) {
      doneButton.addEventListener("click", () => showView("menu"));
    }
  }, 1200);
}

// Switch which view is visible: "menu", "cart", or "checkout".
function showView(view) {
  menuContainer.classList.toggle("hidden", view !== "menu");
  cartView.classList.toggle("hidden", view !== "cart");
  checkoutView.classList.toggle("hidden", view !== "checkout");
  if (view === "cart") {
    updateCartView();
  } else if (view === "checkout") {
    showCheckoutForm();
  }
}

// When any "Add to cart" button is clicked, put that item in the cart and
// update the counter.
menuContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart");
  if (!button) {
    return;
  }
  const id = Number(button.getAttribute("data-item-id"));
  const item = menu.find((entry) => entry.id === id);
  if (item) {
    addToCart(cart, item);
    cartCountElement.textContent = cartCount(cart);
  }
});

// Handle clicks inside the cart view: +, -, Remove, and Checkout.
cartView.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }
  if (button.id === "checkout-button") {
    showView("checkout");
    return;
  }
  const id = Number(button.getAttribute("data-item-id"));

  if (button.classList.contains("cart-increase")) {
    increaseQuantity(cart, id);
  } else if (button.classList.contains("cart-decrease")) {
    decreaseQuantity(cart, id);
  } else if (button.classList.contains("cart-remove")) {
    removeFromCart(cart, id);
  }
  updateCartView();
});

// Toggle between the menu, cart, and checkout views.
menuButton.addEventListener("click", () => showView("menu"));
cartButton.addEventListener("click", () => showView("cart"));
