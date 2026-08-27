# Menu Page — Plan

Red/Green TDD approach: write a failing test first, then the minimal code to
make it pass.

## Task group 1: Setup the test tooling

1. Add a simple test runner. Since the project is vanilla JS with no
   dependencies, use the browser's built-in capabilities or a lightweight
   Node-based test (whichever the team is comfortable with). No extra
   libraries beyond what is already available.
2. Make sure checks can run with one command (e.g. `npm test` or a Python
   runner). Keep it simple.

## Task group 2: Red test for the menu data

3. Write a failing test that checks the menu data model:
   - the menu is an array
   - every item has the fields `id`, `name`, `description`, `price`, `emoji`,
     `category`
   - every `category` is one of the four allowed categories
   - every `id` is unique
4. Run the test and watch it fail (red) because the menu module does not exist
   yet.

## Task group 3: Green — create the menu data

5. Create the menu as a JavaScript module (hard-coded list) with the fields
   above.
6. Run the test again and make it pass (green).

## Task group 4: Red test for showing the menu

7. Write a failing test for the render behavior:
   - rendering produces one item card per menu item
   - each card contains the emoji, name, description, and price
   - items are grouped under their category heading
   - each card has an "Add to cart" button
8. Run the test and watch it fail (red).

## Task group 5: Green — render the menu page

9. Build the menu rendering in vanilla JS: read the menu, group items by
   category, and create the HTML cards.
10. Wire the page so the menu appears under category headings when the page
    loads.
11. Run the tests and make them pass (green).

## Task group 6: Red test for the cart counter

12. Write a failing test: clicking "Add to cart" adds the item to the
    in-memory cart and the cart counter updates.
13. Run the test and watch it fail (red).

## Task group 7: Green — cart counter

14. Create a simple in-memory cart (an array) and an "add to cart" function
    that appends an item.
15. Hook the cart counter into the buttons and update it when an item is
    added.
16. Run the tests and make them pass (green).

## Task group 8: Final checks

17. Run all tests and confirm everything passes.
18. Run any linting/formatting checks if available.
19. Manually verify in the browser: items grouped by category, cards look
    good, clicking Add to cart bumps the counter.
20. Review the implementation against the specs in SPECS/ and this feature
    spec; report any differences for approval.
