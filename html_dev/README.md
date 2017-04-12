Assignment: https://github.com/rstacruz/frontend-exercises/tree/master/order-form
Goal: Become better at JavaScript and learn to work with a form

A creditcard validation form made with Vanilla JS.

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

The form consists of the Luhn algorithm to check the creditcard number for validation and a check to see which creditcard it is. Each creditcard has a set of rules, such as Visa always starts with the number 4.
The hardest part for me was getting the dashes into the input and removing them for the algorithm check. This is not a part of the assignment, but something I found useful myself.
I also added visual difference between each creditcard so that the user can instantly see whether they are entering the correct numbers. When you enter a 4, the card will turn blue (generic Visa color) and the Visa logo will appear as well.
When the user inputted 13 or more numbers in the creditcard number field, it will start validation. It will stop if there are more than 17 numbers.
