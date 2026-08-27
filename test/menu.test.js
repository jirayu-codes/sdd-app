// Tests for the menu data model.
// See: SPECS/2026-08-27-menu-page/requirements.md

const { test, expect } = require("./harness.js");
const { menu, CATEGORIES } = require("../frontend/menu.js");

const REQUIRED_FIELDS = ["id", "name", "description", "price", "emoji", "category"];

test("the menu is an array", () => {
  expect(Array.isArray(menu)).toBe(true);
});

test("every menu item has all the required fields", () => {
  menu.forEach((item) => {
    REQUIRED_FIELDS.forEach((field) => {
      expect(Object.prototype.hasOwnProperty.call(item, field)).toBe(true);
    });
  });
});

test("every category is one of the four allowed categories", () => {
  menu.forEach((item) => {
    expect(CATEGORIES.includes(item.category)).toBe(true);
  });
});

test("every id is unique", () => {
  const ids = menu.map((item) => item.id);
  const uniqueIds = new Set(ids);
  expect(uniqueIds.size).toBe(ids.length);
});

test("price is a positive number", () => {
  menu.forEach((item) => {
    expect(typeof item.price).toBe("number");
    expect(item.price > 0).toBe(true);
  });
});
