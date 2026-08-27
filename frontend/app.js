// Papoi page script.
//
// This file brings everything together on the page:
//   - it renders the menu and the cart,
//   - it toggles between the menu view and the cart view, and
//   - it listens for clicks on "Add to cart" and the cart +, -, and Remove
//     buttons, updating the cart and the header counter.
//
// The menu, render, and cart logic live in their own files (menu.js,
// render.js, cart.js) so they can also be tested in Node.

const menuContainer = document.getElementById("menu");
const cartView = document.getElementById("cart-view");
const cartCountElement = document.getElementById("cart-count");
const menuButton = document.getElementById("view-menu");
const cartButton = document.getElementById("view-cart");

// Render the menu into the page once the page has loaded.
menuContainer.innerHTML = renderMenu(menu, CATEGORIES);

// Refresh the cart section and the header counter to match the current cart.
function updateCartView() {
  cartView.innerHTML = renderCart(cart, menu);
  cartCountElement.textContent = cartCount(cart);
}

// Switch which view is visible: "menu" or "cart".
function showView(view) {
  menuContainer.classList.toggle("hidden", view !== "menu");
  cartView.classList.toggle("hidden", view !== "cart");
  if (view === "cart") {
    updateCartView();
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

// Handle clicks inside the cart view: +, -, and Remove.
cartView.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
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

// Toggle between the menu and cart views.
menuButton.addEventListener("click", () => showView("menu"));
cartButton.addEventListener("click", () => showView("cart"));
