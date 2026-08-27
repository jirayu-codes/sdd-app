# Checkout — Validation

## How to know the feature is done and can be merged

### Automated checks

- [ ] The Red/Green TDD tests are written first and pass at the end.
- [ ] All tests pass with one command (`npm test`, no manual setup).
- [ ] Tests cover:
  - `formatCardNumber` groups digits into fours (and strips non-digits)
  - card number, CVC, and expiry validation (valid and invalid cases)
  - `validatePayment` returns the right error messages and passes for a valid
    test card
  - the checkout form rendering includes all four fields and the Pay button

### Manual checks

- [ ] Open the page in a browser (served by the Python backend).
- [ ] From a non-empty cart, the customer can start checkout; an empty cart
    does not offer checkout.
- [ ] The card number auto-formats into groups of four as the customer types.
- [ ] Invalid or missing fields show clear, friendly error messages.
- [ ] Entering valid details shows a brief "Processing…" step, then success.
- [ ] The page looks neat and is easy to read/navigate.

### Spec alignment (before merge)

- [ ] Update the constitution (SPECS/) and this feature spec where the
    implementation differs, after user approval.
- [ ] Confirm no database, SQL, or persistence was introduced; payment is
    simulated and nothing is stored to disk or sent anywhere.
- [ ] Confirm vanilla HTML/CSS/JS only — no frameworks or added libraries.

When all automated and manual checks pass and any spec differences have been
approved, the branch can be merged.
