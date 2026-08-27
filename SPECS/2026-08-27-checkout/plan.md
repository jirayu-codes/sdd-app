# Checkout — Plan

Red/Green TDD approach: write a failing test first, then the minimal code to
make it pass.

## Task group 1: Pure payment helpers

1. Add pure functions for the card number and card details:
   - `formatCardNumber(value)` — keep only digits and group them in fours
   - `isValidCardNumber(value)` — 15–16 digits after stripping spaces
   - `isValidCvc(value)` — exactly 3 digits
   - `isValidExpiry(value)` — valid `MM/YY` and not in the past
2. Write a failing test for each (red), then implement (green).

## Task group 2: Validate the whole form

3. Add `validatePayment(details)` that checks `name`, `cardNumber`, `expiry`,
   and `cvc`, returning a list of friendly messages (empty when valid).
4. Write a failing test for validation (red), then implement (green).

## Task group 3: Render the checkout form

5. Add `renderCheckout(cart)` returning HTML for the checkout view: the four
   form fields and a **Pay** button, with a spot for error messages.
6. Write a failing test for the checkout rendering (red), then implement
   (green).

## Task group 4: Wire the page

7. Add a **Checkout** button to the cart view (shown only when the cart is
   not empty) that switches to the checkout view.
8. Wire the "Back" / view-nav to move between menu, cart, and checkout views.
9. On submit:
   - call `validatePayment`; show any error messages
   - if valid, show "Processing…" for a short moment, then a success state
   - on success, mark the order paid in memory and clear the cart
10. Bind card-number formatting to the input as the customer types.
11. Verify manually in the browser.

## Task group 5: Final checks

12. Run all tests and confirm everything passes.
13. Run any linting/formatting checks if available.
14. Review the implementation against the specs in SPECS/ and this feature
    spec; report any differences for approval.
