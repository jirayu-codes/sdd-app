# Order Confirmation — Plan

Red/Green TDD approach: write a failing test first, then the minimal code to
make it pass.

## Task group 1: Pure order helpers

1. Create `frontend/orders.js` with:
   - `newOrderBook()` — returns `{ next: 1 }`
   - `placeOrder(orderBook, cart)` — returns `{ number: orderBook.next }`,
     increments `orderBook.next`, and clears the cart
2. Write failing tests (red) for each, then implement (green):
   - a new order book starts its next number at 1
   - placing an order returns the current next number and increases the
     counter for the following order (#1, then #2)
   - placing an order clears the cart

## Task group 2: Render the confirmation

3. Add `renderConfirmation(order)` to `frontend/render.js` returning HTML with
   the order number (`#1`), a "sent to kitchen" message, and a **Done** button.
4. Write a failing test (red) for the confirmation rendering, then implement
   (green).

## Task group 3: Wire the page

5. In `frontend/app.js`, replace the "Payment successful" box with the
   confirmation: on the processing timer firing, call `placeOrder`, render
   `renderConfirmation(order)` into the checkout view, and set up the **Done**
   button to return to the menu.
6. Confirm the cart is cleared at payment (as before) and the order number
   keeps counting up across multiple orders in the same session.
7. Verify manually in the browser.

## Task group 4: Final checks

8. Run all tests and confirm everything passes.
9. Review the implementation against the specs in SPECS/ and this feature
   spec; report any differences for approval.
