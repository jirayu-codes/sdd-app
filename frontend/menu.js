// Papoi menu data.
//
// This file holds the cafe's menu as a hard-coded list. It works in two
// places:
//   - in the browser (it creates a `menu` variable on the page), and
//   - in Node for testing (it sets module.exports).
//
// See SPECS/2026-08-27-menu-page/requirements.md for the data model.

const CATEGORIES = ["Hot Drinks", "Cold Drinks", "Pastries", "Snacks"];

const menu = [
  { id: 1, name: "Espresso", description: "A small, strong coffee shot.", price: 3.5, emoji: "☕", category: "Hot Drinks" },
  { id: 2, name: "Cappuccino", description: "Espresso with steamed milk and foam.", price: 4.5, emoji: "☕", category: "Hot Drinks" },
  { id: 3, name: "Hot Chocolate", description: "Rich cocoa with steamed milk.", price: 4.0, emoji: "🍫", category: "Hot Drinks" },
  { id: 4, name: "Iced Latte", description: "Espresso over cold milk and ice.", price: 5.0, emoji: "🧊", category: "Cold Drinks" },
  { id: 5, name: "Fresh Orange Juice", description: "Freshly squeezed oranges.", price: 4.5, emoji: "🍊", category: "Cold Drinks" },
  { id: 6, name: "Butter Croissant", description: "Flaky, buttery pastry.", price: 3.0, emoji: "🥐", category: "Pastries" },
  { id: 7, name: "Blueberry Muffin", description: "Soft muffin full of blueberries.", price: 3.5, emoji: "🫐", category: "Pastries" },
  { id: 8, name: "Cheese Toastie", description: "Melted cheese on toasted bread.", price: 5.5, emoji: "🧀", category: "Snacks" },
  { id: 9, name: "Caesar Wrap", description: "Chicken, lettuce and sauce in a wrap.", price: 7.0, emoji: "🌯", category: "Snacks" }
];

// Works in Node for testing.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { menu, CATEGORIES };
}
