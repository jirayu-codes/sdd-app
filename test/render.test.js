// Tests for rendering the menu page.
// See: SPECS/2026-08-27-menu-page/requirements.md

const { test, expect } = require("./harness.js");
const { menu, CATEGORIES } = require("../frontend/menu.js");
const { renderMenu } = require("../frontend/render.js");

test("renders an item card for every menu item", () => {
  const html = renderMenu(menu, CATEGORIES);
  menu.forEach((item) => {
    expect(html.includes(item.name)).toBe(true);
  });
});

test("each card contains the emoji, description, and price", () => {
  const html = renderMenu(menu, CATEGORIES);
  menu.forEach((item) => {
    expect(html.includes(item.emoji)).toBe(true);
    expect(html.includes(item.description)).toBe(true);
    expect(html.includes(item.price.toFixed(2))).toBe(true);
  });
});

test("items are grouped under their category heading", () => {
  const html = renderMenu(menu, CATEGORIES);
  CATEGORIES.forEach((category) => {
    expect(html.includes(category)).toBe(true);
  });
});

test("every card has an Add to cart button", () => {
  const html = renderMenu(menu, CATEGORIES);
  expect(html.split(">Add to cart</button>").length - 1).toBe(menu.length);
});
