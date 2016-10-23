console.log('loaded');

class Calendar {
  constructor() {
    this.dateToday = new Date();
    this.monthCounter = this.dateToday.getMonth();
    this.calendarDate = new Date(this.dateToday.getFullYear(), this.monthCounter, 1);
    this.previousMonth();
    this.nextMonth();
    this.calendarTable = document.querySelector('#calendar');

  }
  changeMonth(change) {
    this.monthCounter = this.monthCounter + change;
    this.calendarDate = new Date(this.dateToday.getFullYear(), this.monthCounter, 1);
  };
  removePreviousRows() {
    let rowsClass = document.getElementsByClassName('calendarRows');
      for (let i = rowsClass.length -1; i >= 0; i--) {
        this.calendarTable.removeChild(rowsClass[i]);
      }
    };
  previousMonth() {
    let previousMonthBtn = document.querySelector('#previousMonth');
    let subtractMonth = () => {
      this.changeMonth(-1);
      this.removePreviousRows();
      this.createTable();
    };
    let subtractMonthKeys = (e) => {
      if(e.keyCode === 37) {
        //37 is keycode for left arrow
        subtractMonth();
      }
    };
    previousMonthBtn.addEventListener("click", subtractMonth.bind(this));
    document.body.addEventListener("keydown", subtractMonthKeys.bind(this));
  }
  nextMonth() {
    let nextMonthBtn = document.querySelector('#nextMonth');
    let addMonth = () => {
      this.changeMonth(+1);
      this.removePreviousRows();
      this.createTable();
    };
    let addMonthKeys = (e) => {
      if(e.keyCode === 39) {
        //39 is keycode for right arrow
        addMonth();
      }
    };
    nextMonthBtn.addEventListener("click", addMonth.bind(this));
    document.body.addEventListener("keydown", addMonthKeys.bind(this));
  }
  createTable() {
    let tableRow;
    let tableDataItem;
    let firstDayOfMonth = this.calendarDate.getDay();
    let numberOfDaysInMonth = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth()+1, 0).getDate();
    let counter = 1;
    let monthDisplayDiv = document.querySelector('#currentMonthDisplay');
    let monthArray = ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"];

    for(let i = 0; i < 6; i++) {
      tableRow = document.createElement("tr");
      tableRow.className = "calendarRows";
      for(let j=0; j < 7; j++) {
        tableDataItem = document.createElement("td");
        if (j < firstDayOfMonth && i === 0) {
          tableDataItem.innerHTML = '';
        } else if (counter <= numberOfDaysInMonth) {
          tableDataItem.innerHTML = counter;
          counter++
        }
        tableRow.appendChild(tableDataItem);
      }
      this.calendarTable.appendChild(tableRow);
    }
      monthDisplayDiv.innerHTML = `${monthArray[this.calendarDate.getMonth()]} ${this.calendarDate.getFullYear()}`;
  }

}

let a = new Calendar();
a.createTable();

