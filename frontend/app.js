// Papoi page script.
//
// This file brings everything together on the page:
//   - it renders the menu into the page, and
//   - it listens for clicks on the "Add to cart" buttons and updates the
//     cart counter.
//
// The menu, render, and cart logic live in their own files (menu.js,
// render.js, cart.js) so they can also be tested in Node.

const menuContainer = document.getElementById("menu");
const cartCountElement = document.getElementById("cart-count");

// Render the menu into the page once the page has loaded.
menuContainer.innerHTML = renderMenu(menu, CATEGORIES);

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
