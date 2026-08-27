// The main test runner.
//
// It loads every test file listed here, runs all the tests in them, and then
// prints a summary. Exit code is non-zero if any test fails, so it works with
// CI and also with a simple "node test/run-tests.js" command.

const { summary } = require("./harness.js");

// Add every test file here so they all get run.
require("./menu.test.js");
require("./render.test.js");
require("./cart.test.js");
require("./cart-render.test.js");
require("./checkout.test.js");
require("./checkout-render.test.js");

const ok = summary();
if (!ok) {
  process.exit(1);
}
