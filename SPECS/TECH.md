# Tech

**Papoi** is built with the following tech choices.

## Stack

- **Vanilla HTML, CSS, and JavaScript** for the frontend. No frameworks or
  libraries (students only know vanilla JS).
- **A simple Python backend** using Python's built-in `http.server` module.
  Its only job is to **serve the static HTML, CSS, and JS files**. No
  installs or dependencies needed.
- **No database.** The students have not learned databases, SQL, or storing
  data on disk yet, so we avoid them entirely.

## How data stays in memory

- The **menu** is hard-coded in a JavaScript file (a list of items, each with
  a name, description, picture, and price).
- The **cart** lives in JavaScript memory while the page is open. Refreshing
  the page clears the cart. There is no saving between visits.

## Simulated payment

The checkout stage for Papoi shows a card form (name, card number, expiry, CVC) with
fake card details. The card number auto-formats into groups of digits. No real
payment is made. Confirming just marks the order as paid in memory.

## Engineering standards

The project follows these simple, shared defaults:

- **Red/Green TDD** — write a failing test first, watch it fail (red), then
  write the smallest code to make it pass (green), and refactor.
- **Spec-driven development** — all work starts from a written spec; code must
  trace back to an approved spec.
- **Simplicity over complexity** — prefer the simplest clear solution.
- **DRY** — don't repeat yourself; reuse shared code instead of copying it.
