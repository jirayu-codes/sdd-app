# Order Confirmation — Validation

## How to know the feature is done and can be merged

### Automated checks

- [ ] The Red/Green TDD tests are written first and pass at the end.
- [ ] All tests pass with one command (`npm test`, no manual setup).
- [ ] Tests cover:
  - `newOrderBook` starts its next number at 1
  - `placeOrder` returns the next number and increases the counter (#1, #2, …)
  - `placeOrder` clears the cart
  - `renderConfirmation` shows the order number and the "sent to kitchen"
    message, and includes a Done button

### Manual checks

- [ ] Open the page in a browser (served by the Python backend).
- [ ] Add items, go to checkout, and pay with a valid test card
    (e.g. `4242 4242 4242 4242`, any future expiry, 3-digit CVC).
- [ ] After the "Processing…" step, the confirmation shows an order number
    and a "sent to kitchen" message (instead of the old success box).
- [ ] The cart is empty after paying.
- [ ] Place a second order and confirm the order number has increased.
- [ ] The **Done** button returns to the menu.
- [ ] The page looks neat and is easy to read/navigate.

### Spec alignment (before merge)

- [ ] Update the constitution (SPECS/) and this feature spec where the
    implementation differs, after user approval.
- [ ] Confirm no database, SQL, or persistence was introduced; the order
    number is in memory only and resets on refresh.
- [ ] Confirm vanilla HTML/CSS/JS only — no frameworks or added libraries.

When all automated and manual checks pass and any spec differences have been
approved, the branch can be merged.
