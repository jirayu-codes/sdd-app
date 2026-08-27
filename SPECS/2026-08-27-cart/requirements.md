# Cart — Requirements

Feature spec for roadmap item 2: **Cart**.

## Scope

Let the customer view their cart, and change the items in it: add more of an
item, reduce how many of an item, remove an item entirely, and see the running
total. This builds on the in-memory cart from the menu page.

This feature does **not** include checkout/payment or the order-confirmation
step — those are roadmap items 3 and 4.

## Decisions

- **In-page cart view.** The cart is shown on the same page, toggled with the
  menu (no separate page or routing). A "View cart" control shows the cart and
  hides the menu; a "Back to menu" control shows the menu again.
- **Group by item with quantities.** The cart is displayed as one row per menu
  item, with a quantity. Currently the cart stores one entry per click; this
  feature changes the cart so adding an item increments that item's quantity
  instead of pushing a duplicate.
- **Cart actions.** Every item row has: **+** (increase qty), **−** (decrease
  qty), and **Remove** (delete the item). A running **total** is shown. When
  the cart is empty, a friendly message is shown.
- **Vanilla HTML, CSS, JavaScript.** No frameworks or libraries.
- **No database.** All data stays in memory for the running page. If the cart
  was grouped by item before, adding or removing changes the in-memory state.
- **Red/Green TDD.** Tests are written first, then the feature code is written
  to make them pass.

## Cart data model

The cart is a list of entries. Each entry is a plain JavaScript object:

- `item` — one of the menu item objects
- `quantity` — how many of that item (a whole number, at least 1)

The shared in-memory cart is an array of these entries.

## Cart behaviour

- **Add to cart** (from the menu): if the item isn't in the cart, add an entry
  with quantity `1`; if it's already there, increase its quantity by `1`.
- **+**: increase the entry's quantity by `1`.
- **−**: if the quantity is `1`, reduce to `0` and remove the entry; otherwise
  decrease the quantity by `1`. (Simplest option: − removes the entry when
  quantity would drop below `1`.)
- **Remove**: delete the entry entirely.
- **Count** (the header counter): the total number of items, i.e. the sum of
  all quantities. So two Cappuccinos count as `2`, not as two separate rows.
- **Total price**: the sum of `item.price × quantity` for every entry.

## Success criteria

- The customer can view their cart from the menu page and go back to the menu.
- The cart shows one row per menu item with its quantity and line price.
- From the cart, the customer can increase quantity, decrease quantity, and
  remove an item.
- The running total updates whenever the cart changes.
- The menu page's cart counter matches the total number of items in the cart.
- An empty cart shows a friendly message.
- The page is styled simply and looks neat.
