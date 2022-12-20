let days = document.querySelector(".counter .time .days span");
let hours = document.querySelector(".counter .time .hours span");
let minutes = document.querySelector(".counter .time .minutes span");
let seconds = document.querySelector(".counter .time .seconds span");

let clearButton = document.getElementById("clear");
let startButton = document.getElementById("start");
let dateInput = document.getElementById("date");

let table = document.querySelector(".dates-history table");
let clearDatesButton = document.querySelector(".dates-history h2 button");

clearButton.style.display = "none";

let dateArray;

window.onload = () => {
  if (window.localStorage.dates) {
    dateArray = JSON.parse(window.localStorage.dates);
    createDates(dateArray);
    clearDatesButton.style.display = "inline";
  } else {
    dateArray = [];
    clearDatesButton.style.display = "none";
  }
};
startButton.onclick = () => {
  let startCountDate = new Date(`${dateInput.value}`).getTime();
  if (
    dateInput.value == "" ||
    startCountDate < new Date().getTime() ||
    isNaN(startCountDate) ||
    startCountDate > Math.pow(10, 14)
  ) {
    dateInput.value = "";
    dateInput.placeholder = "Choose a future event";
  } else {
    clearDatesButton.style.display = "inline"; // display the clear dates button
    dateInput.style.boxShadow = "0 0 0px #2196f3"; // removing the box shadow
    clearButton.style.display = "inline"; // display the clear button
    //create Object
    let dateObject = {
      date: dateInput.value,
    };
    dateArray.push(dateObject);
    window.localStorage.dates = JSON.stringify(dateArray);
    createDates(dateArray);
    dateInput.value = "";
    dateInput.placeholder = "Correct";
    clearButton.click(); //reset the date
    clearButton.style.display = "inline"; // display the clear button
    let handler = setInterval(() => {
      //start new date
      let currentDate = new Date().getTime();
      let timeDifference = startCountDate - currentDate;

      days.innerHTML = Math.trunc(timeDifference / 1000 / 60 / 60 / 24);
      hours.innerHTML = Math.trunc((timeDifference / 1000 / 60 / 60) % 24);
      minutes.innerHTML = Math.trunc((timeDifference / 1000 / 60) % 60);
      seconds.innerHTML = Math.trunc((timeDifference / 1000) % 60);

      if (timeDifference < 0) {
        clearButton.click();
      }

      clearButton.onclick = () => {
        clearInterval(handler);
        dateInput.value = "";
        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
        clearButton.style.display = "none";
      };
    }, 1000);
  }
};

dateInput.onfocus = () => {
  dateInput.style.border = "1px solid #2196f3";
};

dateInput.onblur = () => {
  dateInput.style.border = "1px solid transparent";
};

dateInput.onkeyup = () => {
  dateInput.style.boxShadow = "0 0 10px #2196f3";
  if (dateInput.value == "") {
    dateInput.style.boxShadow = "0 0 0px #2196f3";
  }
};

function createDates(array) {
  table.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td1Text = document.createTextNode(i + 1);
    td1.appendChild(td1Text);
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    let td2Text = document.createTextNode(array[i].date);
    td2.appendChild(td2Text);
    tr.appendChild(td2);

    table.appendChild(tr);
  }
}

clearDatesButton.addEventListener("click", () => {
  localStorage.clear();
  table.innerHTML = "";
  clearDatesButton.style.display = "none";
});
