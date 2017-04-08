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
  // Get the form input value;
  var cardNumbersOriginal = document.getElementById("card").value;

  // create var to hold sum of these numbers
  var totalNumberAtPosition = 0;
  var totalMultipliedNumber = 0;
  var totalSumOfBaseRemaining = 0;
  // For styling the creditcard visually
  var formBGColor = document.getElementById("creditcardInputForm");
  var formInputs = document.getElementsByTagName("input");
  var formSelects = document.getElementsByTagName("select");
  var cardLogo = document.getElementById("ccardImage").src;
  var movingLightAnimation = document.getElementById("movingLightContainer");
  var greenCheckmark = document.getElementById("card-checkmark");

  // remove - from input for algorithm check
  var cardNumbers = cardNumbersOriginal.split('-');
  cardNumbers = cardNumbers.join("");

 // add - to input for user to see
 if(cardNumbers != "")
 {
   var arrayFromNumbers = cardNumbers.match(/.{1,4}/g);
   var cardNumbersWithDashes = arrayFromNumbers.join('-');
 }
 else
 {
   var arrayFromNumbers = "";
   var cardNumbersWithDashes = "";
 }

  document.getElementById("card").value = cardNumbersWithDashes;

  if(cardNumbers.length > 0)
  {
    if (cardNumbers.charAt(0) === "4")
    {
      visaCreditcard(formBGColor, formInputs, formSelects, cardLogo, movingLightAnimation, greenCheckmark);
    }
    else if (cardNumbers.charAt(0) === "5")
    {
      masterCardCreditcard(formBGColor, formInputs, formSelects, cardLogo, movingLightAnimation, greenCheckmark);
    }
    else if (cardNumbers.charAt(0) === "3" && cardNumbers.charAt(1) === "4" || cardNumbers.charAt(1) === "7")
    {
      americanExpressCreditcard(formBGColor, formInputs, formSelects, cardLogo, movingLightAnimation, greenCheckmark);
    }
    else
    {
      document.getElementById("errormessage").innerHTML = "?";
      defaultCreditcardColor(formBGColor, formInputs, formSelects, cardLogo, movingLightAnimation, greenCheckmark);
    }
  }
  else
  {
    document.getElementById("errormessage").innerHTML = "";
    defaultCreditcardColor(formBGColor, formInputs, formSelects, cardLogo, movingLightAnimation, greenCheckmark);
  }


  // start at the end of array and skip every other index
  for (var i = cardNumbers.length - 1; i >= 0; i -= 2)
  {
    // each index.value string is parsed to an integer
    var numberAtPosition = parseInt(cardNumbers[i], 10);
    var totalNumberAtPosition = totalNumberAtPosition + numberAtPosition;
  }

  // start at the end of the array, but then do -2. -1 = the last index in the array, -2 = secondlast index.
  for (var j = cardNumbers.length - 2; j >= 0; j -= 2)
  {
    var multipliedNumber = (parseInt(cardNumbers[j], 10)) * 2; // the number is multiplied by 2
    // If the result of this doubling operation is greater than 9 (e.g., 8 × 2 = 16),
    // then add the digits of the product (e.g., 16: 1 + 6 = 7, 18: 1 + 8 = 9)

    if (multipliedNumber > 9)
    {
      var baseNumber = Math.floor(multipliedNumber / 10); //round down to nearest integer; it should always be 1
      var remainingNumber = multipliedNumber % 10;
      var sumOfBaseRemaining = baseNumber + remainingNumber;
      var totalSumOfBaseRemaining = totalSumOfBaseRemaining + sumOfBaseRemaining;
    }
    else
    {
      var totalMultipliedNumber = totalMultipliedNumber + multipliedNumber;
      console.log(totalMultipliedNumber);
    }
  }

  var sumOfNumbers = totalMultipliedNumber + totalSumOfBaseRemaining + totalNumberAtPosition;

  //  If the total modulo 10 is equal to 0 then the number is valid according to the Luhn formula;
  var validityCreditCard = sumOfNumbers % 10;

  if(cardNumbers.length > 12)
  {
    if(validityCreditCard == 0)
    {
      console.log("Creditcard is valid");

      if (cardNumbers.charAt(0) === "4" && cardNumbers.length >= 13 && cardNumbers.length <= 16)
      {
        // this is a visa card;
        // 412345678902348
        document.getElementById("errormessage").innerHTML = "Visa " + "<span class='checkmark'>" + "&#10004;" + "</span>";
        return true;
      }
      else if (cardNumbers.charAt(0) === "5" && cardNumbers.length === 16)
      {
        //this is a Mastercard;
        document.getElementById("errormessage").innerHTML = "Mastercard " + "<span class='checkmark'>" + "&#10004;" + "</span>";
        return true;
      }
      else if (cardNumbers.charAt(0) === "3" && cardNumbers.charAt(1) === "4" || cardNumbers.charAt(1) === "7" && cardNumbers.length === 15)
      {
        //this is an american express card;
        document.getElementById("errormessage").innerHTML = "American Express " + "<span class='checkmark'>" + "&#10004;" + "</span>";
        return true;
      }
      else
      {
        return false;
      }
    }
    else if (validityCreditCard != 0)
    {
      if (cardNumbers.charAt(0) === "4" && cardNumbers.length >= 13 && cardNumbers.length <= 16)
      {
        // this is a visa card;
        // 412345678902348
        document.getElementById("errormessage").innerHTML = "Visa " + "<span class='checkmark'> " + "&#10007;" + "<h5> Cardnumber invalid</h5></span>";
        return false;
      }
      else if (cardNumbers.charAt(0) === "5" && cardNumbers.length === 16)
      {
        //this is a Mastercard;
        document.getElementById("errormessage").innerHTML = "Mastercard " + "<span class='checkmark'> " + "&#10007;" + "<h5> Cardnumber invalid</h5></span>";
        return false;
      }
      else if (cardNumbers.charAt(0) === "3" && cardNumbers.charAt(1) === "4" || cardNumbers.charAt(1) === "7" && cardNumbers.length === 15)
      {
        //this is an american express card;
        document.getElementById("errormessage").innerHTML = "American Express " + "<span class='checkmark'> " + "&#10007;" + "<h5> Cardnumber invalid</h5></span>";
        return false;
      }
      else
      {
        return false;
      }
    }
    else
    {
      document.getElementById("errormessage").innerHTML += " " + "<span class='checkmark'> " + "&#10007;" + "<h5> Cardnumber invalid</h5></span>";
      return false;
    }
  }
}

function fadeIn(el, time)
{
  el.style.opacity = 0;
  el.style.display = "block";

  var last = +new Date();
  var tick = function()
  {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1)
    {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
  };

  tick();
}

function defaultCreditcardColor(formBGColor, formInputs, formSelects, cardLogo, movingLightAnimation, greenCheckmark)
{
  formBGColor.className = " defaultCardBGColor";

  if(cardLogo.indexOf("images/creditcard_icon_small.png") == -1)
  {
    movingLightAnimation.className = "";
    document.getElementById("ccardImage").src="images/creditcard_icon_small.png";
    fadeIn(document.getElementById('ccardImage'), 500);
  }

  // Go through each <input> and add CSS class to it
  for (var i = 0; i < formInputs.length; i++)
  {
    formInputs[i].className = " defaultCardBGColor" + " inputBorder";
  }

  // Go through each <select> and add CSS class to it
  for (var i = 0; i < formSelects.length; i++)
  {
    formSelects[i].className = " defaultCardBGColor" + " inputBorder";
  }
}

function americanExpressCreditcard(formBGColor, formInputs, formSelects, cardLogo, movingLightAnimation, greenCheckmark)
{
  //this is an american express card;
  document.getElementById("errormessage").innerHTML = "American Express";
  formBGColor.className = " americanExpressColor";

  if(cardLogo.indexOf("images/American-Express-icon-portrait-small.png") == -1)
  {
    document.getElementById("ccardImage").src="images/American-Express-icon-portrait-small.png";
    fadeIn(document.getElementById('ccardImage'), 500);
    movingLightAnimation.className = "movingLight";
  }

  // Go through each <input> and add CSS class to it
  for (var i = 0; i < formInputs.length; i++)
  {
    formInputs[i].className = " americanExpressColor" + " inputBorder";
  }

  // Go through each <select> and add CSS class to it
  for (var i = 0; i < formSelects.length; i++)
  {
    formSelects[i].className = " americanExpressColor" + " inputBorder";
  }
}

function masterCardCreditcard(formBGColor, formInputs, formSelects, cardLogo, movingLightAnimation, greenCheckmark)
{
  //this is a Mastercard;
  document.getElementById("errormessage").innerHTML = "Mastercard";
  formBGColor.className = " masterCardColor";

  if(cardLogo.indexOf("images/MasterCard_Logo_small.png") == -1)
  {
    document.getElementById("ccardImage").src="images/MasterCard_Logo_small.png";
    fadeIn(document.getElementById('ccardImage'), 500);
    movingLightAnimation.className = "movingLight";
  }

  // Go through each <input> and add CSS class to it
  for (var i = 0; i < formInputs.length; i++)
  {
    formInputs[i].className = " masterCardColor" + " inputBorder";
  }

  // Go through each <select> and add CSS class to it
  for (var i = 0; i < formSelects.length; i++)
  {
    formSelects[i].className = " masterCardColor" + " inputBorder";
  }
}

function visaCreditcard(formBGColor, formInputs, formSelects, cardLogo, movingLightAnimation, greenCheckmark)
{
  // this is a visa card;
  // 412345678902348
  document.getElementById("errormessage").innerHTML = "Visa";
  formBGColor.className = " visaCardColor";

  if(cardLogo.indexOf("images/Visa_logo_small.png") == -1)
  {
    // Change the src of this element and fade it in
    document.getElementById("ccardImage").src="images/Visa_logo_small.png";
    fadeIn(document.getElementById('ccardImage'), 500);
    movingLightAnimation.className = "movingLight";
  }

  // Go through each <input> and add CSS class to it
  for (var i = 0; i < formInputs.length; i++)
  {
    formInputs[i].className = "visaCardColor" + " inputBorder";
  }

  // Go through each <select> and add CSS class to it
  for (var i = 0; i < formSelects.length; i++)
  {
    formSelects[i].className = "visaCardColor" + " inputBorder";
  }
}
