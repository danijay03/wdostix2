function calculateTotalAmount() {
  let chosenDate = document.getElementById("datePicker").value;
  document.getElementById("chosenDate").innerText = "Chosen date: " + chosenDate;

  const timeSlotSelect = document.getElementById("timeSlots");
  let selectedTimeSlots = [];
  for (let option of timeSlotSelect.options) {
      if (option.selected) {
          selectedTimeSlots.push(option.value);
      }
  }

const numlocalAdultTickets = parseInt(document.getElementById('sl-adult').value);
const numlocalChildTickets = parseInt(document.getElementById('sl-child').value);
const numfAdultTickets = parseInt(document.getElementById('f-adult').value);
const numfChildTickets = parseInt(document.getElementById('f-child').value);
const numinfantTickets = parseInt(document.getElementById('infant').value);

const normalHours = [7,8, 9, 1, 2];
const peakHours = [10, 11, 12, 3, 4, 5];

let normalCount = 0;
let peakCount = 0;
let selectedHours = [];

//the loop below counts and seperates and divides the timing inputs (extracted using parseInt() and split(-) which seperates 7-8 into=> 7)
for (let slot of selectedTimeSlots) {
  const hour = parseInt(slot.split("-")[0]);
  selectedHours.push(hour);
  if (normalHours.includes(hour)) {
    normalCount++;
  } else if (peakHours.includes(hour)) {
    peakCount++;
  }
}
selectedHours.sort((a, b) => a - b);
let startHour = selectedHours[0];
let endHour = selectedHours[0]+selectedHours[selectedHours.length-1]-(selectedHours[0]-1);
let totalHrs = normalCount+peakCount;

// Storing the values
localStorage.setItem('startHour', JSON.stringify(startHour));
localStorage.setItem('endHour', JSON.stringify(endHour));




// Define the normal and peak prices for each category
const normalPriceLocalAdult = 4;
const peakPriceLocalAdult = 6;
const normalPriceLocalChild = 2;
const peakPriceLocalChild = 3;
const normalPriceFAdult = 10; 
const peakPriceFAdult = 13;
const normalPriceFChild = 5;
const peakPriceFChild = 8;

// Calculate the total cost for each category based on normal and peak hours
const totalCostLocalAdult = (normalCount * normalPriceLocalAdult + peakCount * peakPriceLocalAdult)*numlocalAdultTickets;
const totalCostLocalChild = (normalCount * normalPriceLocalChild + peakCount * peakPriceLocalChild)*numlocalChildTickets;
const totalCostFAdult = (normalCount * normalPriceFAdult + peakCount * peakPriceFAdult)*numfAdultTickets;
const totalCostFChild = (normalCount * normalPriceFChild + peakCount * peakPriceFChild)*numfChildTickets;
const totalCostinfant = 0;


if(numlocalAdultTickets > 0) {
    document.getElementById('slAdultRow').style.display = 'table-row';
    document.getElementById('slAdultSummary').innerHTML = numlocalAdultTickets+" Sl adult";
    document.getElementById('slAdultSummaryPrice').innerHTML = "$"+totalCostLocalAdult;
} else {
    document.getElementById('slAdultRow').style.display = 'none';
    document.getElementById('slAdultSummary').innerHTML = "";
    document.getElementById('slAdultSummaryPrice').innerHTML = "";
}

if(numlocalChildTickets > 0) {
  document.getElementById('slChildRow').style.display = 'table-row';
  document.getElementById('slChildSummary').innerHTML = numlocalChildTickets+" Sl child";
  document.getElementById('slChildSummaryPrice').innerHTML = "$"+totalCostLocalChild;
} else {
  document.getElementById('slChildRow').style.display = 'none';
  document.getElementById('slChildSummary').innerHTML = "";
  document.getElementById('slChildSummaryPrice').innerHTML = "";
}

if(numfAdultTickets > 0) {
  document.getElementById('fAdultRow').style.display = 'table-row';
  document.getElementById('fAdultSummary').innerHTML = numfAdultTickets+" foreign adult";
  document.getElementById('fAdultSummaryPrice').innerHTML = "$"+totalCostFAdult;
} else {
  document.getElementById('fAdultRow').style.display = 'none';
  document.getElementById('fAdultSummary').innerHTML = "";
  document.getElementById('fAdultSummaryPrice').innerHTML = "";
}

if(numfChildTickets > 0) {
  document.getElementById('fChildRow').style.display = 'table-row';
  document.getElementById('fChildSummary').innerHTML = numfChildTickets+" foreign child";
  document.getElementById('fChildSummaryPrice').innerHTML = "$"+totalCostFChild;
} else {
  document.getElementById('fChildRow').style.display = 'none';
  document.getElementById('fChildSummary').innerHTML = "";
  document.getElementById('fChildSummaryPrice').innerHTML = "";
}

if(numinfantTickets > 0) {
  document.getElementById('infantRow').style.display = 'table-row';
  document.getElementById('infantSummary').innerHTML = numinfantTickets+" infant";
  document.getElementById('infantSummaryPrice').innerHTML = "$"+ totalCostinfant;
} else {
  document.getElementById('infantRow').style.display = 'none';
  document.getElementById('infantSummary').innerHTML = "";
  document.getElementById('infantSummaryPrice').innerHTML = "";
}

// Calculate and update the total amount payable
const totalAmountPayable = totalCostLocalAdult + totalCostLocalChild + totalCostFAdult + totalCostFChild; 
document.getElementById("totalPayableSummary").textContent = "$"+totalAmountPayable ;
// Store 'totalPayableSummary'
localStorage.setItem('totalPayableSummary', document.getElementById('totalPayableSummary').textContent);

//local data storage :)
const summaryTable = {
  chosenDateTable: chosenDate,
  selectedTimeSlot: selectedTimeSlots.join(", "),
  totalnumhrs: totalHrs + " hour/s",
  durationfull: normalCount + " normal hour/s, " + peakCount + " peak hour/s",
  slAdultSummary: numlocalAdultTickets + " Sl adult",
  slChildSummary: numlocalChildTickets + " Sl child",
  fAdultSummary: numfAdultTickets + " foreigner adult",
  fChildSummary: numfChildTickets + " foreigner child",
  infantSummary: numinfantTickets + " infant",
  slAdultSummaryPrice: "$" + totalCostLocalAdult,
  slChildSummaryPrice: "$" + totalCostLocalChild,
  fAdultSummaryPrice: "$" + totalCostFAdult,
  fChildSummaryPrice: "$" + totalCostFChild,
  infantSummaryPrice: "$" + totalCostinfant,
  totalPayableSummary: "$" + totalAmountPayable
};
// Convert the summaryTable object into a JSON string and store it
localStorage.setItem('summaryTable', JSON.stringify(summaryTable));


//add the values into the table
document.getElementById('chosenDateTable').innerHTML = chosenDate; 
document.getElementById('selectedTimeSlot').innerHTML = selectedTimeSlots.join(", "); //  array elements into a string
document.getElementById('totalnumhrs').innerHTML = startHour + " to " + endHour ;
document.getElementById('durationfull').innerHTML = totalHrs+" hour/s("+normalCount + " normal hour/s, " + peakCount + " peak hour/s)";

//this add how many guests are coming
document.getElementById('slAdultSummary').innerHTML = numlocalAdultTickets+" Sl adult";
document.getElementById('slChildSummary').innerHTML = numlocalChildTickets +" Sl child";
document.getElementById('fAdultSummary').innerHTML = numfAdultTickets+" foreigner adult";
document.getElementById('fChildSummary').innerHTML = numfChildTickets+" foreigner child";
document.getElementById('infantSummary').innerHTML = numinfantTickets+" infant";
//this add how much it is for each category 
document.getElementById('slAdultSummaryPrice').innerHTML = "$"+totalCostLocalAdult;
document.getElementById('slChildSummaryPrice').innerHTML = "$"+totalCostLocalChild ;
document.getElementById('fAdultSummaryPrice').innerHTML = "$"+totalCostFAdult;
document.getElementById('fChildSummaryPrice').innerHTML = "$"+totalCostFChild;
document.getElementById('infantSummaryPrice').innerHTML = "$"+totalCostinfant;

//to show the button after all the of the summary table has been correctly filled:
if (numlocalAdultTickets > 0 || numlocalChildTickets > 0 || numfAdultTickets > 0 || numfChildTickets > 0 || numinfantTickets > 0) {
  document.querySelector('.nextbutton').style.display = 'block';
}
}
//add an event listener to everything please
document.getElementById("ticketsForm").addEventListener("submit", function(event) {
  event.preventDefault();
  calculateTotalAmount();
});

document.getElementById("timeSlots").addEventListener("change", function() {
  document.getElementById("ticketsForm").dispatchEvent(new Event('submit'));
});

["timeSlots", "sl-adult", "sl-child", "f-adult", "f-child", "infant"].forEach(function(id) {
  document.getElementById(id).addEventListener("change", function() {
      document.getElementById("ticketsForm").dispatchEvent(new Event('submit'));
  });
});


//1 Store 'chosenDateTable'
localStorage.setItem('chosenDateTable', document.getElementById('chosenDateTable').innerHTML);
//2 Store 'selectedTimeSlot'
localStorage.setItem('selectedTimeSlot', document.getElementById('selectedTimeSlot').innerHTML);
//3 Store 'totalnumhrs'
localStorage.setItem('totalnumhrs', document.getElementById('totalnumhrs').innerHTML);
//4 Store 'durationfull'
localStorage.setItem('durationfull', document.getElementById('durationfull').innerHTML);
//5 Store 'slAdultSummary'
localStorage.setItem('slAdultSummary', document.getElementById('slAdultSummary').innerHTML);
//6 Store 'slChildSummary'
localStorage.setItem('slChildSummary', document.getElementById('slChildSummary').innerHTML);
//7 Store 'fAdultSummary'
localStorage.setItem('fAdultSummary', document.getElementById('fAdultSummary').innerHTML);
//8 Store 'fChildSummary'
localStorage.setItem('fChildSummary', document.getElementById('fChildSummary').innerHTML);
//9 Store 'infantSummary'
localStorage.setItem('infantSummary', document.getElementById('infantSummary').innerHTML);
//10 Store 'slAdultSummaryPrice'
localStorage.setItem('slAdultSummaryPrice', document.getElementById('slAdultSummaryPrice').innerHTML);
//11 Store 'slChildSummaryPrice'
localStorage.setItem('slChildSummaryPrice', document.getElementById('slChildSummaryPrice').innerHTML);
//12 Store 'fAdultSummaryPrice'
localStorage.setItem('fAdultSummaryPrice', document.getElementById('fAdultSummaryPrice').innerHTML);
//13 Store 'fChildSummaryPrice'
localStorage.setItem('fChildSummaryPrice', document.getElementById('fChildSummaryPrice').innerHTML);
//14 Store 'infantSummaryPrice'
localStorage.setItem('infantSummaryPrice', document.getElementById('infantSummaryPrice').innerHTML);





window.onload = function() {
  const turtle = document.getElementById('turtle');
  let pos = 0;
  const frameRate = 1000 / 60; 
  const speed = 0.5; // Pixels per frame

  setInterval(() => {
    if (pos > window.innerWidth) {
        pos = -10;
    }
    turtle.style.left = pos + 'px';
    pos += speed;
  }, frameRate);

  const now = new Date();
  // Get current date
  const date = now.toDateString();

  // Hide the guest deets rows initially until they have values
  document.getElementById('chosenDateTable').innerHTML=date;
  document.getElementById('totalnumhrs').innerHTML="7 to 8";
  document.getElementById('durationfull').innerHTML=" 1 hour/s(1 normal hour/s, 0 peak hour/s)";
  document.getElementById('slAdultRow').style.display = 'none';
  document.getElementById('slChildRow').style.display = 'none';
  document.getElementById('fAdultSummary').innerHTML = "1 foreigner adult";
  document.getElementById('fAdultSummaryPrice').innerHTML = "$10";
  document.getElementById('fChildRow').style.display = 'none';
  document.getElementById('infantRow').style.display = 'none';
};
