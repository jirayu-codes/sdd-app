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

// Works in Node for testing.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { renderMenu };
}
