# Menu Page — Validation

## How to know the feature is done and can be merged

### Automated checks

- [ ] The Red/Green TDD tests are written first and pass at the end.
- [ ] All tests pass with one command (no manual setup needed).
- [ ] Tests cover:
  - the menu data model (fields present, valid categories, unique ids)
  - rendering every item with emoji, name, description, and price, grouped by
    category, with an Add to cart button
  - the cart counter updating when a button is clicked

### Manual checks

- [ ] Open the page in a browser (served by the Python backend).
- [ ] All menu items from the spec appear under the correct category headings.
- [ ] Each item card shows the emoji, name, description, and price.
- [ ] Clicking **Add to cart** adds the item and the cart counter increases.
- [ ] The page looks neat and is easy to read/navigate.

### Spec alignment (before merge)

- [ ] Update the constitution (SPECS/) and this feature spec where the
    implementation differs, after user approval.
- [ ] Confirm no database, SQL, or persistence was introduced; data stays in
    memory for the running page.
- [ ] Confirm vanilla HTML/CSS/JS only — no frameworks or added libraries.

When all automated and manual checks pass and any spec differences have been
approved, the branch can be merged.
