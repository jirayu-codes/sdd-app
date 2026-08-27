// Papoi simulated secure checkout.
//
// The payment here is fake: it never talks to a bank and nothing is stored.
// These pure helper functions check the card details the customer enters, so
// the page can validate the form and, if valid, show a success message.
//
// Pure functions (they take their inputs as arguments) are easy to test.

// Keep only the digits in a value (used before checking lengths).
function onlyDigits(value) {
  return String(value).replace(/\D/g, "");
}

// Turn a card number into groups of four digits with spaces, e.g.
// "4242424242424242" -> "4242 4242 4242 4242". Strips anything that is not a
// digit, and stops at 16 digits.
function formatCardNumber(value) {
  const digits = onlyDigits(value).slice(0, 16);
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join(" ");
}

// A card number is valid if it is 15 or 16 digits.
function isValidCardNumber(value) {
  const digits = onlyDigits(value);
  return digits.length === 15 || digits.length === 16;
}

// A CVC is valid if it is exactly 3 digits.
function isValidCvc(value) {
  return onlyDigits(value).length === 3;
}

// An expiry is valid "MM/YY" that has not already passed. It is good through
// the last day of its month. `now` is normally the current date but can be
// passed in for testing.
function isValidExpiry(value, now) {
  const match = /^(\d{2})\/(\d{2})$/.exec(String(value).trim());
  if (!match) {
    return false;
  }
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) {
    return false;
  }
  const endOfMonth = new Date(year, month, 0, 23, 59, 59); // last day of month
  return endOfMonth.getTime() >= now.getTime();
}

// Check every field of the payment details and return a list of friendly
// messages. The list is empty when everything is valid.
function validatePayment(details, now) {
  const errors = [];

  if (!String(details.name || "").trim()) {
    errors.push("Please enter the name on the card.");
  }

  if (!isValidCardNumber(details.cardNumber || "")) {
    errors.push("Please enter a valid card number (15 or 16 digits).");
  }

  if (!isValidExpiry(details.expiry || "", now)) {
    errors.push("Please enter a valid future expiry date (MM/YY).");
  }

  if (!isValidCvc(details.cvc || "")) {
    errors.push("Please enter the 3-digit CVC.");
  }

  return errors;
}

// Works in Node for testing.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    formatCardNumber,
    isValidCardNumber,
    isValidCvc,
    isValidExpiry,
    validatePayment
  };
}
