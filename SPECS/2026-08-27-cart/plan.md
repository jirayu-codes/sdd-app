# Cart — Plan

Red/Green TDD approach: write a failing test first, then the minimal code to
make it pass.

## Task group 1: Cart state (group by item)

1. Change the in-memory cart from a flat list to grouped entries (`item` +
   `quantity`). Add pure functions:
   - `addToCart(cart, item)` — increment quantity if present, else add entry
     with quantity `1`
   - `cartCount(cart)` — sum of all quantities
2. Write a failing test for each of these (red), then implement (green).

## Task group 2: Cart quantity controls

3. Add pure functions:
   - `increaseQuantity(cart, itemId)` — bump the matching entry's quantity
   - `decreaseQuantity(cart, itemId)` — reduce by 1, remove the entry when it
     would drop below 1
   - `removeFromCart(cart, itemId)` — delete the entry for that item
   - `cartTotal(cart)` — sum of `price × quantity`
4. Write a failing test for each (red), then implement (green).

## Task group 3: Render the cart

5. Add a function `renderCart(cart, menu)` that returns HTML for the cart
   rows: one row per entry with name, quantity, line price, **+**, **−**, and
   **Remove**.
6. Write a failing test for the cart rendering (red), then implement (green).

## Task group 4: Toggle menu/cart views in the page

7. Add the UI wiring: a "View cart" control and a "Back to menu" control that
   toggle which section is shown.
8. Render the cart into the page and bind the buttons:
   - **+** calls `increaseQuantity`
   - **−** calls `decreaseQuantity`
   - **Remove** calls `removeFromCart`
9. Re-render the cart and update the header counter and total after any change.
10. Show a friendly "Your cart is empty" message when the cart has no entries.
11. Verify manually in the browser.

## Task group 5: Final checks

12. Run all tests and confirm everything passes.
13. Run any linting/formatting checks if available.
14. Review the implementation against the specs in SPECS/ and this feature
    spec; report any differences for approval.
