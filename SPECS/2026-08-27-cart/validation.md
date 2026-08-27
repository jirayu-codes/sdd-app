# Cart — Validation

## How to know the feature is done and can be merged

### Automated checks

- [ ] The Red/Green TDD tests are written first and pass at the end.
- [ ] All tests pass with one command (`npm test`, no manual setup).
- [ ] Tests cover:
  - adding to the cart groups items by quantity (no duplicate rows)
  - `cartCount` sums all quantities
  - increasing, decreasing, and removing quantities
  - `cartTotal` sums `price × quantity`
  - rendering the cart shows one row per item with qty, line price, +, −,
    and Remove
  - the menu header counter matches the total item count

### Manual checks

- [ ] Open the page in a browser (served by the Python backend).
- [ ] From the menu page, the customer can open the cart view and go back to
    the menu.
- [ ] Adding an item from the menu is reflected as a quantity in the cart
    (not duplicate rows).
- [ ] **+** and **−** change the quantity as expected, **Remove** deletes the
    item.
- [ ] The running total updates after each change.
- [ ] The cart header counter matches the total number of items.
- [ ] An empty cart shows a friendly message.
- [ ] The page looks neat and is easy to read/navigate.

### Spec alignment (before merge)

- [ ] Update the constitution (SPECS/) and this feature spec where the
    implementation differs, after user approval.
- [ ] Confirm no database, SQL, or persistence was introduced; data stays in
    memory for the running page.
- [ ] Confirm vanilla HTML/CSS/JS only — no frameworks or added libraries.

When all automated and manual checks pass and any spec differences have been
approved, the branch can be merged.
