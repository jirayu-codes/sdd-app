# Menu Page — Requirements

Feature spec for roadmap item 1: **Menu page**.

## Scope

Show the cafe's menu to the customer, grouped by category. Each item shows a
name, a picture (emoji), a description, and a price, with an **Add to cart**
button. Clicking the button updates a simple in-memory cart counter so we can
see it work.

This feature does **not** include the full cart page (change quantities,
remove items) — that is roadmap item 2.

## Decisions

- **Grouped by category.** Categories: Hot Drinks, Cold Drinks, Pastries,
  Snacks.
- **Emoji as the picture.** Each item uses an emoji for its visual. No image
  files, so no assets to manage.
- **Simple cart counter.** Clicking "Add to cart" adds the item to an
  in-memory cart and updates a counter in the page. Full cart management
  (view, change quantities, remove) is deferred to roadmap item 2.
- **Vanilla HTML, CSS, JavaScript.** No frameworks or libraries. The menu data
  is hard-coded in a JavaScript file.
- **No database.** All data stays in memory for the running page.
- **Red/Green TDD.** Tests are written first, then the feature code is written
  to make them pass.

## Menu data model

Each menu item is a plain JavaScript object with these fields:

- `id` — a unique number
- `name` — the display name (string)
- `description` — a short sentence (string)
- `price` — a number in dollars (e.g. `4.50`)
- `emoji` — the picture emoji (string)
- `category` — one of the four categories (string)

The menu is a list (array) of these objects, hard-coded in a JS file.

## Example menu

### Hot Drinks
| id | name | description | price | emoji |
|----|------|-------------|-------|-------|
| 1 | Espresso | A small, strong coffee shot. | 3.50 | ☕ |
| 2 | Cappuccino | Espresso with steamed milk and foam. | 4.50 | ☕ |
| 3 | Hot Chocolate | Rich cocoa with steamed milk. | 4.00 | 🍫 |

### Cold Drinks
| id | name | description | price | emoji |
|----|------|-------------|-------|-------|
| 4 | Iced Latte | Espresso over cold milk and ice. | 5.00 | 🧊 |
| 5 | Fresh Orange Juice | Freshly squeezed oranges. | 4.50 | 🍊 |

### Pastries
| id | name | description | price | emoji |
|----|------|-------------|-------|-------|
| 6 | Butter Croissant | Flaky, buttery pastry. | 3.00 | 🥐 |
| 7 | Blueberry Muffin | Soft muffin full of blueberries. | 3.50 | 🫐 |

### Snacks
| id | name | description | price | emoji |
|----|------|-------------|-------|-------|
| 8 | Cheese Toastie | Melted cheese on toasted bread. | 5.50 | 🧀 |
| 9 | Caesar Wrap | Chicken, lettuce and sauce in a wrap. | 7.00 | 🌯 |

## Success criteria

- The menu page shows all items, grouped under their category headings.
- Each item card shows the emoji, name, description, and price.
- Every item has an **Add to cart** button.
- Clicking a button adds the item to the in-memory cart and updates the cart
  counter visible on the page.
- The page is styled simply and looks neat (visually appealing).
