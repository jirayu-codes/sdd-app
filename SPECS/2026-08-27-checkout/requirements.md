# Checkout — Requirements

Feature spec for roadmap item 3: **Checkout** (simulated secure payment).

## Scope

Let the customer leave the cart and complete a simulated, secure payment for
the items in their cart. Reaching checkout requires a non-empty cart. The
payment form validates the entered details and, on success, marks the order as
paid in memory.

This feature does **not** include the order-confirmation message that appears
after payment — that is roadmap item 4.

## Decisions

- **Checkout button in the cart view.** The cart view has a **Checkout**
  button that switches to the checkout view (same in-page toggle pattern as
  the menu/cart views). The button is only shown when the cart is not empty.
- **Payment form fields.** Name on card, card number, expiry (MM/YY), and CVC.
  The card number auto-formats into groups of four digits as the customer
  types.
- **Validate the form.** Show friendly, clear error messages when fields are
  missing or invalid. A valid (test) card is accepted — the customer can type
  a test card like `4242 4242 4242 4242`, any future expiry, and a 3-digit CVC.
- **Processing then success.** On a valid payment, show a brief
  "Processing…" step, then a success state that marks the order as paid in
  memory (ready for the order-confirmation step next roadmap item).
- **No database / no real payment.** This is a simulated secure checkout. No
  real card data is stored or sent anywhere; nothing is persisted to disk.
- **Vanilla HTML, CSS, JavaScript.** No frameworks or libraries.
- **Red/Green TDD.** Tests are written first, then the feature code is written
  to make them pass.

## Payment data model

The payment details are plain values (strings). A function validates them and
returns either the errors or success:

- `name` — a non-empty name on the card
- `cardNumber` — 15–16 digits (spaces allowed while typing; stripped before
  checking)
- `expiry` — a future month/year in `MM/YY`
- `cvc` — 3 digits

## Checkout behaviour

- **Validation:** a single function checks each field and returns a list of
  messages (one per problem). The page shows the messages under the fields.
- **Processing:** after valid details are submitted, the page shows
  "Processing…" briefly (a short delay), then a success message.
- **Success:** the order is marked paid in memory (e.g. a `paid` flag), the
  cart can be cleared, and the page is ready for the order-confirmation step.

## Success criteria

- From a non-empty cart, the customer can start checkout.
- The payment form shows the name, card number, expiry, and CVC fields, with
  the card number auto-formatting into groups of four.
- Invalid or missing fields show clear, friendly error messages.
- Entering valid details runs a brief "Processing…" step and then shows
  success, marking the order paid in memory.
- An empty cart does not offer checkout.
- The page is styled simply and looks neat.
