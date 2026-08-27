// A tiny, no-dependency test runner for this project.
//
// It works with Node's built-in modules only — no npm packages to install.
// Students can run it with:  npm test
//
// A test file looks like this:
//
//   const { test } = require("./test/harness.js");
//   test("the thing works", () => {
//     expect(1 + 1).toBe(2);
//   });
//
// Every test file that uses the harness must also be added to the list of
// files in test/run-tests.js.

let passed = 0;
let failed = 0;
const failures = [];

// Register a single test. The callback runs and we catch any thrown error.
function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log("  PASS  " + name);
  } catch (error) {
    failed += 1;
    failures.push({ name, error });
    console.log("  FAIL  " + name);
    console.log("        " + error.message);
  }
}

// A small helper that returns an object with a few match functions.
function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(
          "Expected " + JSON.stringify(expected) + " but got " + JSON.stringify(actual)
        );
      }
    },
    toEqual(expected) {
      const a = JSON.stringify(actual);
      const e = JSON.stringify(expected);
      if (a !== e) {
        throw new Error("Expected " + e + " but got " + a);
      }
    },
    toBeGreaterThan(expected) {
      if (!(actual > expected)) {
        throw new Error(
          "Expected " + JSON.stringify(actual) + " to be greater than " + JSON.stringify(expected)
        );
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error("Expected " + JSON.stringify(actual) + " to be truthy");
      }
    },
    toContain(item) {
      if (!actual.includes(item)) {
        throw new Error(
          "Expected array to contain " + JSON.stringify(item) +
          " but got " + JSON.stringify(actual)
        );
      }
    }
  };
}

function summary() {
  console.log("\n" + passed + " passed, " + failed + " failed");
  if (failed > 0) {
    console.log("\nFailures:");
    failures.forEach((f) => console.log("  - " + f.name + ": " + f.error.message));
  }
  return failed === 0;
}

module.exports = { test, expect, summary };
