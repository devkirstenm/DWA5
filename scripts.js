// selecting whole form including dividend, divider, and calculate button (its nested)
const form = document.querySelector("[data-form]");
// select result element. This will be changed with various error messages using result.innerText
const result = document.querySelector("[data-result]");

// when user clicks submit, event happens
form.addEventListener("submit", (event) => {
  // prevent page refresh
  event.preventDefault();
  // allows accessing of form field values
  // event.target = returns element where event occured
  const entries = new FormData(event.target);
  // converts FormData into object with key value pairs of dividend and divider
  const { dividend, divider } = Object.fromEntries(entries);

  // Scenario: Validation when values are missing
  // if dividend or divider are missing = displays error
  if (!dividend || !divider) {
    result.innerText = // changes results text
      "Division not performed. Both values are required in inputs. Try again";
    return; // function terminates and prevents rest of code from executing (such as form from submitting as there's no values)
  }

  // Scenario: Providing anything that is not a number should crash the program
  // if user enters values that aren't a number
  if (isNaN(dividend) || isNaN(divider)) {
    // entire screen is replaced with message (crash program)
    document.body.innerHTML =
      "Something critical went wrong. Please reload the page";
    // AND error is logged to console
    console.error("Non-numeric value provided");
    return; // exits the function & prevents further execution of event lister (such as form submission)
  }

  // CALCULATIONS
  // sum for what the result should display when dividing
  const divisionResult = dividend / divider;

  // NOT WORKING
  // Scenario: An invalid division should log an error in the console
  // if number isn't finite (can't be divided into number)
  if (!isFinite(divisionResult)) {
    result.innerText =
      "Division not performed. Invalid number provided. Try again";
    console.error("Invalid division");
    return; // exits the function & prevents further execution of event lister (such as form submission)
  }

  // Scenario: Dividing numbers result in a decimal number (with no decimals)
  // divisionResult % 1 !== 0 checks if result has fractional part (not a whole number)
  // % refers to remainder
  if (divisionResult % 1 !== 0) {
    // then math.floor
    result.innerText = Math.floor(divisionResult); // Display the whole number part
    return;
  }

  // Scenario: Dividing numbers result in a whole number
  result.innerText = divisionResult;
});
