# Roadmap

## Current state

The **Papoi** menu page is built. The frontend shows the menu grouped by
category (Hot Drinks, Cold Drinks, Pastries, Snacks), with each item card
showing an emoji, name, description, and price, plus an **Add to cart** button.
The **cart** is also built: customers can toggle between the menu and an
in-page cart view, where items are grouped with quantities and each row has
increase (+), decrease (-), and remove controls, plus a running total. The app
has a simple Python backend serving the static files, and a no-dependency test
runner (`npm test`) with passing Red/Green TDD tests.

## Next steps (in order of priority)

1. **Checkout** — let the customer enter fake payment details and complete the
   payment.
2. **Order confirmation** — show "order sent to kitchen" as a confirmation
   step.

## Long-term vision

- Turn the simple "send to kitchen" confirmation into a real **kitchen view**
  for Papoi — a separate screen where the kitchen receives incoming orders
  live.
