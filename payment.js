window.onload = function() {

    const turtle = document.getElementById('turtle');
    let pos = 0;
    const frameRate = 1000 / 60; 
    const speed = 0.5; // Pixels per frame
  
    setInterval(() => {
        if (pos > window.innerWidth) {
            pos = -100;
        }
        turtle.style.left = pos + 'px';
        pos += speed;
    }, frameRate);



    // Retrieve the new summary table from localStorage
    let retrievedSummaryTable = JSON.parse(localStorage.getItem('newSummaryTable'));

  
    // Check if there is a retrieved summary table and assign them to the table in HTML
    if (retrievedSummaryTable) {
        document.getElementById('fnameSummary').innerHTML = retrievedSummaryTable.fnameSummary;
        document.getElementById('chosenDateTableU').innerHTML = retrievedSummaryTable.chosenDateTableU;
        document.getElementById('totalnumhrsU').innerHTML = retrievedSummaryTable.selectedTimeSlotU;
        document.getElementById('durationfullU').innerHTML = retrievedSummaryTable.totalnumhrsU+" ("+retrievedSummaryTable.durationfullU+")";
        document.getElementById('phoneSummary').innerHTML = retrievedSummaryTable.phoneSummary;
        document.getElementById('emailSummary').innerHTML = retrievedSummaryTable.emailSummary;
        document.getElementById('genderSummary').innerHTML = retrievedSummaryTable.genderSummary;
        document.getElementById('slAdultSummaryU').innerHTML = retrievedSummaryTable.slAdultSummaryU;
        document.getElementById('slChildSummaryU').innerHTML = retrievedSummaryTable.slChildSummaryU;
        document.getElementById('fAdultSummaryU').innerHTML = retrievedSummaryTable.fAdultSummaryU;
        document.getElementById('fChildSummaryU').innerHTML = retrievedSummaryTable.fChildSummaryU;
        document.getElementById('infantSummaryU').innerHTML = retrievedSummaryTable.infantSummaryU;
        document.getElementById('slAdultSummaryPriceU').innerHTML = retrievedSummaryTable.slAdultSummaryPriceU;
        document.getElementById('slChildSummaryPriceU').innerHTML = retrievedSummaryTable.slChildSummaryPriceU;
        document.getElementById('fAdultSummaryPriceU').innerHTML = retrievedSummaryTable.fAdultSummaryPriceU;
        document.getElementById('fChildSummaryPriceU').innerHTML = retrievedSummaryTable.fChildSummaryPriceU;
        document.getElementById('infantSummaryPriceU').innerHTML = retrievedSummaryTable.infantSummaryPriceU;
        document.getElementById('totalPayableSummaryU').innerHTML = retrievedSummaryTable.totalPayableSummaryU;
    }

    /*var cardName = document.getElementById("cardName");
    var cardNumber = document.getElementById("cardNumber");
    var expiryDate = document.getElementById("expiryDate");
    var cvv = document.getElementById("cvv");
  
    var fields = [cardName, cardNumber, expiryDate, cvv];
  
    fields.forEach(function(field) {
        field.addEventListener('input', function() {
            validateNotEmpty(cardName, document.getElementById("nameError"), "Please enter the card holder's name.");
            validateCardNumber(cardNumber, document.getElementById("numberError"), "Please enter a valid card number.");
            validateExpiryDate(expiryDate, document.getElementById("expiryError"), "Please enter the expiry date.", "Your card has expired.");
            validateCVV(cvv, document.getElementById("cvvError"), "Please enter a valid CVV.");
  
            if (isNameValid && isNumberValid && isExpiryValid && isCvvValid) {
                // Show the "Continue with the purchase" button
                document.querySelector('.nextbutton').style.display = 'block';
            } 
        });
    });*/    var fields = [cardName, cardNumber, expiryDate, cvv];

    var errorElements = [
        document.getElementById("nameError"), 
        document.getElementById("numberError"), 
        document.getElementById("expiryError"), 
        document.getElementById("cvvError")
    ];
  
    fields.forEach(function(field, index) {
        field.addEventListener('input', function() {
            validateNotEmpty(cardName, errorElements[0], "Please enter the card holder's name.");
            validateCardNumber(cardNumber, errorElements[1], "Please enter a valid card number.");
            validateExpiryDate(expiryDate, errorElements[2], "Please enter the expiry date.", "Your card has expired.");
            validateCVV(cvv, errorElements[3], "Please enter a valid CVV.");
  
            var areAllFieldsValid = errorElements.every(function(errorElement) {
                // If there is no error message, the field is valid
                return errorElement.textContent === "";
            });
  
            if (areAllFieldsValid) {
                // Show the "Continue with the purchase" button
                var nextButton = document.querySelector('.nextbutton');
                nextButton.style.display = 'block';
                
                // Retrieve the totalPayableSummary from localStorage
                let totalPayableSummary = localStorage.getItem('totalPayableSummary');
      
                // Check if there is a stored totalPayableSummary and use it
                if (totalPayableSummary) {
                    nextButton.textContent = "Pay " + totalPayableSummary;
                } else {
                    // Handle case where totalPayableSummary is not found in local storage
                    console.error('Total payable summary not found in local storage');
                }
            } else {
                // Hide the "Continue with the purchase" button
                document.querySelector('.nextbutton').style.display = 'none';
            }
        });
    });

  };


    
    function validateNotEmpty(input, errorElement, errorMessage) { //looks for null inputs 
        if(input.value.trim() === "") {
            input.className = "invalid";
            errorElement.textContent = errorMessage;
        } else {
            input.className = "valid";
            errorElement.textContent = "";
        }
    }
    
    function validateCardNumber(input, errorElement, errorMessage) { //looks for anything but 16 numbers
        var cardNum = input.value.trim();
        if(isNaN(cardNum) || cardNum.length !== 16) {
            input.className = "invalid";
            errorElement.textContent = errorMessage;
        } else {
            input.className = "valid";
            errorElement.textContent = "";
        }
    }

    function validateExpiryDate(input, errorElement, errorMessage, expiredMessage) {
        var expiry = input.value.trim().split('/');
        if(expiry.length !== 2 || isNaN(expiry[0]) || isNaN(expiry[1]) || expiry[0].length !== 2 || expiry[1].length !== 2) {
            input.className = "invalid";
            errorElement.textContent = errorMessage;
        } else {
            var currentYear = new Date().getFullYear() % 100; // get last two digits of current year
            var currentMonth = new Date().getMonth() + 1; // current month (in Js, January is 0)
            var expiryMonth = parseInt(expiry[0]);
            var expiryYear = parseInt(expiry[1]);
    
            if(expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                input.className = "invalid";
                errorElement.textContent = expiredMessage;
            } else {
                input.className = "valid";
                errorElement.textContent = "";
            }
        }
    }
    
    function validateCVV(input, errorElement, errorMessage) { //again looking for anything but 3 numbers
        var cvvNum = input.value.trim();
        if(isNaN(cvvNum) || cvvNum.length !== 3) {
            input.className = "invalid";
            errorElement.textContent = errorMessage;
        } else {
            input.className = "valid";
            errorElement.textContent = "";
        }
    }

