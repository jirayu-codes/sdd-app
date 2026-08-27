# Roadmap

## Current state

The **Papoi** menu page is built. The frontend shows the menu grouped by
category (Hot Drinks, Cold Drinks, Pastries, Snacks), with each item card
showing an emoji, name, description, and price, plus an **Add to cart** button.
The **cart** is also built: customers can toggle between the menu and an
in-page cart view, where items are grouped with quantities and each row has
increase (+), decrease (-), and remove controls, plus a running total.

The **checkout** is built too: a **Checkout** button in the cart view (shown
when the cart is not empty) opens a simulated secure payment form with name,
card number, expiry, and CVC. The card number auto-formats into groups of
four; the form validates the details and shows friendly error messages; and a
valid test card runs a brief "Processing" step then a success state that
marks the order paid and clears the cart. Payment is simulated — nothing is
stored or sent.

The app has a simple Python backend serving the static files, and a
no-dependency test runner (`npm test`) with passing Red/Green TDD tests.

## Next steps (in order of priority)

1. **Order confirmation** — after payment, show "order sent to kitchen" as a
   confirmation step.

## Long-term vision

- Turn the simple "send to kitchen" confirmation into a real **kitchen view**
  for Papoi — a separate screen where the kitchen receives incoming orders
  live.
