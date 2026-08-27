# Order Confirmation — Requirements

Feature spec for roadmap item 4: **Order confirmation** (the final step after
a successful payment).

## Scope

After the simulated payment succeeds, show the customer a friendly order
confirmation with a unique, automatically increasing order number and a
message that the order has been sent to the kitchen. This replaces the
current "Payment successful" box so the checkout ends cleanly.

This is the last piece of the ordering flow (menu → cart → checkout →
confirmation). The long-term "kitchen view" is a separate future roadmap item
and is out of scope here.

## Decisions

- **Order number + "sent to kitchen".** The confirmation shows an order
  number (auto-incremented in memory, e.g. `#1`, `#2`, …) and a friendly
  "order sent to kitchen" message.
- **Confirmation replaces the success box.** The small "Payment successful"
  box is replaced by the confirmation screen after the "Processing…" step.
  A **Done** button returns the customer to the menu.
- **Clear the cart at payment.** The cart is cleared the moment the order is
  placed (this already happens at payment in the current checkout), so the
  next order starts fresh.
- **No summary of items/total on this screen.** The confirmation keeps it
  simple — just the order number and the message (per the roadmap scope).
- **No database / no persistence.** The order number lives in memory only and
  resets to `#1` when the page is refreshed, exactly like the cart. Nothing is
  stored to disk or sent anywhere.
- **Vanilla HTML, CSS, JavaScript.** No frameworks or libraries.
- **Red/Green TDD.** Tests are written first; then code is written to pass.

## Order model

An order is a plain object:

- `{ number: <integer> }` — a friendly, increasing order number.

The order book keeps a counter of "next" numbers:

- `newOrderBook()` — starts with `next: 1`.
- `placeOrder(orderBook, cart)` — takes the next number, increments the
  counter, clears the cart, and returns the order `{ number }`.

`placeOrder` takes its inputs as arguments (pure, like the cart helpers) so it
can be tested in Node.

## Confirmation behaviour

- After a valid payment's "Processing…" step, the page shows the confirmation
  with the order number and the "sent to kitchen" message.
- A **Done** button clears the confirmation and returns to the menu.
- Placing each new order produces a higher number than the previous one
  (`#1`, then `#2`, and so on) until the page is refreshed.

## Success criteria

- After paying, the customer sees an order number and a "sent to kitchen"
  message instead of the old "Payment successful" box.
- The order number increases by one for each new order placed in the same
  page session (`#1`, `#2`, …).
- The cart is empty after paying, so a new order can be started.
- The **Done** button returns to the menu.
- The page is styled simply and looks neat.
