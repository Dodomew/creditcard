function readForm()
{
  var cardNumbersOriginal = document.getElementById("card").value;

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

  // Styling submit button
  var activateButton = document.getElementById("submitButton");

  // remove dashes from input for algorithm check
  var cardNumbers = cardNumbersOriginal.split('-');
  cardNumbers = cardNumbers.join("");

 // add dashes to input for user to see
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

  // Luhn algorithm
  // start at the end of array and skip every other index
  for (var i = cardNumbers.length - 1; i >= 0; i -= 2)
  {
    var numberAtPosition = parseInt(cardNumbers[i], 10);
    var totalNumberAtPosition = totalNumberAtPosition + numberAtPosition;
  }

  // start at the end of the array, but go to secondlast index
  for (var j = cardNumbers.length - 2; j >= 0; j -= 2)
  {
    var multipliedNumber = (parseInt(cardNumbers[j], 10)) * 2;
    // If the result of this doubling operation is greater than 9 (e.g., 8 × 2 = 16),
    // then add the digits of the product (e.g., 16: 1 + 6 = 7, 18: 1 + 8 = 9)

    if (multipliedNumber > 9)
    {
      var baseNumber = Math.floor(multipliedNumber / 10);
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

  movingLightAnimation.className = "";
  activateButton.className = "defaultSubmit";

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
        creditcardIsValid(movingLightAnimation, activateButton);
      }
      else if (cardNumbers.charAt(0) === "5" && cardNumbers.length === 16)
      {
        //this is a Mastercard;
        document.getElementById("errormessage").innerHTML = "Mastercard " + "<span class='checkmark'>" + "&#10004;" + "</span>";
        creditcardIsValid(movingLightAnimation, activateButton);
      }
      else if (cardNumbers.charAt(0) === "3" && cardNumbers.charAt(1) === "4" || cardNumbers.charAt(1) === "7" && cardNumbers.length === 15)
      {
        //this is an american express card;
        document.getElementById("errormessage").innerHTML = "American Express " + "<span class='checkmark'>" + "&#10004;" + "</span>";
        creditcardIsValid(movingLightAnimation, activateButton);
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

  for (var i = 0; i < formInputs.length; i++)
  {
    formInputs[i].className = " defaultCardBGColor" + " inputBorder";
  }

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
  }

  for (var i = 0; i < formInputs.length; i++)
  {
    formInputs[i].className = " americanExpressColor" + " inputBorder";
  }

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
  }

  for (var i = 0; i < formInputs.length; i++)
  {
    formInputs[i].className = " masterCardColor" + " inputBorder";
  }

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
    document.getElementById("ccardImage").src="images/Visa_logo_small.png";
    fadeIn(document.getElementById('ccardImage'), 500);
  }

  for (var i = 0; i < formInputs.length; i++)
  {
    formInputs[i].className = "visaCardColor" + " inputBorder";
  }

  for (var i = 0; i < formSelects.length; i++)
  {
    formSelects[i].className = "visaCardColor" + " inputBorder";
  }
}

function creditcardIsValid(movingLightAnimation, activateButton)
{
  movingLightAnimation.className = "movingLight";
  activateButton.className = " activateButton";
  return true;
}
