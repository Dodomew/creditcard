/*

  Implement validation for the credit card number to catch our users mistakes, and provide them helpful feedback.

  It should tell me the credit card type (Mastercard / Visa / American Express) as soon as it knows it.
  It should show a green check mark as soon as the valid.
  If the card type isn't known, show a question mark.

  Visa cards start with 4.
  Mastercard cards start with 5.
  American Express cards start with 3. The 2nd digit is either 4 or 7.

  Visa cards are valid if they have 13 to 16 digits.
  Mastercard cards are valid if it has 16 digits.
  American Express cards are valid if it has 15 digits.

  There's a published algorithm used to check the validity of credit card numbers. Find out what it is and implement it.

  Also, show an ✕ Invalid message for credit card numbers that match the correct length of digits, but fails validation.

*/

/*

  Luhn algorithm

  From the rightmost digit, which is the check digit, and moving left, double the value of every second digit.
  If the result of this doubling operation is greater than 9 (e.g., 8 × 2 = 16), then add the digits of the product (e.g., 16: 1 + 6 = 7, 18: 1 + 8 = 9)
  or alternatively subtract 9 from the product (e.g., 16: 16 - 9 = 7, 18: 18 - 9 = 9).
  Take the sum of all the digits.
  If the total modulo 10 is equal to 0 (if the total ends in zero) then the number is valid according to the Luhn formula; else it is not valid.

  Each of the numbers 79927398710, 79927398711, 79927398712, 79927398713, 79927398714, 79927398715, 79927398716, 79927398717, 79927398718, 79927398719 can be validated as follows.

  Double every second digit, from the rightmost: (1×2) = 2, (8×2) = 16, (3×2) = 6, (2×2) = 4, (9×2) = 18
  Sum all the individual digits (digits in parentheses are the products from Step 1): x (the check digit) + (2) + 7 + (1+6) + 9 + (6) + 7 + (4) + 9 + (1+8) + 7 = x + 67.
  If the sum is a multiple of 10, the account number is possibly valid. Note that 3 is the only valid digit that produces a sum (70) that is a multiple of 10.
  Thus these account numbers are all invalid except possibly 79927398713 which has the correct check digit.

*/

function readForm()
{
  var creditNumContainer = [];
  // Get the form input value;
  var cardNumbers = (document.getElementById("card").value);

/*
  var x = 13;
  var tiental = x / 10;
  var eental = x % 10;
  var samen = tiental + eental;
*/
// Check the characters at the first position of the value string of "card". If it's a certain number AND it matches other criteria, it is a certain card.
// charAt looks at the position in a string. So (0) looks at the first position.
    if (cardNumbers.charAt(0) === "4" && cardNumbers.length >= 13 && cardNumbers.length <= 17)
    {
      //this is a visa card;
      console.log("this is a visa card");
    }
    else if (cardNumbers.charAt(0) === "5" && cardNumbers.length === 16)
    {
      //this is a Mastercard;
      console.log("this is a Mastercard card");
    }
    else if (cardNumbers.charAt(0) === "3" && cardNumbers.charAt(1) === 4 || cardNumbers.charAt(1) === 7 && cardNumbers.length === 15)
    {
      //this is an american express card;
      console.log("this is a american express card");
    }
    else
    {
      document.write("error");
      return false;
    }

}
