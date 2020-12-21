const calendarGenerator = function() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // names of the months
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // names of the weekdays
    const today = new Date(); // the current date when the calendar is loaded
    let chosenDate = ''; // the first time the calendar is loaded the default chosen date is the current date
    let calendarMonth = today.getMonth(); // the index of the month to display on calendar navigation bar; January = 0, February = 1, etc...
    let calendarYear = today.getFullYear(); // the year to display on calendar navigation bar
    let minimized = 'minimized';

    // fillCalendar function to generate the days in a particular month
    // The function returns a filledCalendar array with the days in their correct indexed positions
    const fillCalendar = function() {
        // getMaxNumOfDays function to determine the maximum number of weeks to be displayed
        // weekdayOfFirstDay param refers to the weekday the 1st day in a month happens to be on
        // numOfDaysInMonth param refers to the number of days in a particular month
        const getMaxNumOfDays = function(weekdayOfFirstDay, numOfDaysInMonth) {
            let maxNumOfDays = 7 * 5; // default is a 5-week display - common for most of the months
            if (weekdayOfFirstDay + numOfDaysInMonth > 35) {
                maxNumOfDays = 7 * 6; // 6-week display in case the 1st day of the month happens on a Friday for a 31-day month or a Saturday for a 30-day month
            } else if (weekdayOfFirstDay + numOfDaysInMonth === 28) {
                maxNumOfDays = 7 * 4; // 4-week display specifically for non-leap year February with Feb 1st on Sunday 
            };
            return maxNumOfDays;
        };
        // convertDayToString function to convert day values into strings; single-digit values are also converted into double-digit values
        const convertDayToString = function(day) {
            if (day < 10) {
                day = '0' + day;
            } else {
                day = '' + day;
            };
            return day;
        };
        // numOfDaysInMonth variable to hold value of the number of days of the month index recorded in calendarMonth
        // new Date(year, month index + 1, 0).getDate() is JavaScript built-in method to get the number of days of a particular month
        const numOfDaysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
        // firstDay variable to hold the JS Date object of the first day of the indexed month
        const firstDay = new Date(calendarYear, calendarMonth, 1);
        // weekdatOfFirstDay variable to hold the value of the indexed weekday of the first day of the indexed month 
        const weekdayOfFirstDay = firstDay.getDay();
        // maxNumOfDays variable to hold the value returned by getMaxNumOfDays function
        const maxNumOfDays = getMaxNumOfDays(weekdayOfFirstDay, numOfDaysInMonth);
        // newDay variable with default value 1 as the first day to be displayed on the calendar
        let newDay = 1;
        // filledCalendar array to hold the values of the days in the month to be displayed on the calendar
        let filledCalendar = [];
        // for-loop to populate the filledCalendar array
        for (let i = 0; i < maxNumOfDays; i++) {
            // if-else statement to check for blank entries at the beginning and end of the calendar; if blank, push an empty string to filledCalendar array; else, push the new day that has been converted to string
            if (i < weekdayOfFirstDay || i >= weekdayOfFirstDay + numOfDaysInMonth) {
                filledCalendar.push('');
            } else {
                filledCalendar.push(convertDayToString(newDay));
                newDay++;
            };
        };
        return filledCalendar;
    };

    // createCalendarDate function to generate the HTML for each of the calendar dates in a particular month
    // day param refers to the value at an indexed position in the filledCalendar array; if the value of 'day' is blank, the HTML value is set to be an empty string
    // classList param refers to the to list of class names to be added to that particular calendar date in case that day needs to be marked for a specific reason, for examples, the current date and the user's chosen date
    // Day buttons are disabled if that day is in the past
    const createCalendarDate = function(day, classList) {
        return `
            ${ !day 
                ?   `<div></div>`
                :   `<button class="day ${classList}" value="${day}" ${isPast(day)? 'disabled' : ''}>
                        <span>${day.charAt(0)}</span>
                        <span>${day.charAt(1)}</span>
                    </button>`
            }
        `;
    };

    // createCalendarNav function to generate the HTML to display the calendar navigation bar on the screen
    // year param refers to the year to be displayed
    // month param refers to the index of the month to be displayed; the name of the month is gotten from looking up the months array
    const createCalendarNav = function(year, month) {
        return `
            <div class="calendarNav">
                <button class="previousMonth"><i class="fas fa-chevron-left"></i></button>
                <h3>${months[month]} ${year}</h3>
                <button class="nextMonth"><i class="fas fa-chevron-right"></i></button>
                <button class="collapseButton"><i class="far fa-minus-square"></i></button>
            </div>
        `;
    };

    // createCalendarWeek function to generate the HTML to display the weekdays
    const createCalendarWeek = function() {
        return `
            <div class="weekdays">
                ${
                    weekdays.map( (weekday) => {
                        return `<h3>${weekday.slice(0,1)}</h3>`
                    }).reduce((acc, cur) => {
                        return acc + cur;
                    })
                }
            </div>    
        `;
    };

    // getChosenDate function to carry the user's chosen date from calendar.js module and bind it to the chosenDate variable of this module
    // usersChosenDate param refers to the user's chosen date information from calendar.js module
    const importFromCalendar = function(usersChosenDate, year, month, isMinimized) {
        chosenDate = usersChosenDate;
        calendarYear = year;
        calendarMonth = month;
        minimized = isMinimized;
    };

    // isPast function to check if a particular day has gone by
    // day param refers to the value of a particular calendar date in the filledCalendar array
    const isPast = function(day) {
        return (
            (calendarYear <= today.getFullYear() && calendarMonth < today.getMonth()) ||
            (calendarYear === today.getFullYear() && calendarMonth === today.getMonth() && day < today.getDate())
        );
    }

    // isToday function to check if a particular date is the current date
    // day param refers to the value of a particular calendar date in the filledCalendar array
    const isToday = function(day) {
        return (
            calendarYear === today.getFullYear() &&
            calendarMonth === today.getMonth() &&
            parseInt(day) === today.getDate()
        );
    };
    // isChosenDay function to check if a particular date is the user's chosen date
    // day param refers to the value of a particular calendar date in the filledCalendar array 
    const isChosenDay = function(day) {
        // if there is chosenDate, return the value of the boolean check; else, return false for no chosen dates
        if (chosenDate) {
            return parseInt(day) === chosenDate.getDate();
        } else {
            return false;
        }
    };
    // insertDate function to insert the generated calendar date HTML into the DOM element that holds the calendar display
    const insertDate = function(day) {
        // By default a calendar date is not marked so the classList is an empty string
        let calendarDate = createCalendarDate(day, '');
        // If a calendar date is today and also chosen by the user or by default, the classList is 'today chosen' for 2 classes of 'today' and 'chosen'
        if (isToday(day) && isChosenDay(day)) {
            calendarDate = createCalendarDate(day, 'today chosen');
        } else if (isChosenDay(day)) {
            calendarDate = createCalendarDate(day, 'chosen');
        } else if (isToday(day)) {
            calendarDate = createCalendarDate(day, 'today');
        };
        return calendarDate;
    };
    // createCalendarDisplay function to generate the HTML to display the calendar on the screen
    // filledCalendar param refers to an array that is returned by the fillCalendar function
    const createCalendarDisplay = function() {
        // filledCalendar local variable to hold the value returned from the function call to fillCalendar function
        const filledCalendar = fillCalendar();
        // Create <form> element to hold the calendar display
        // If minimized; only generate the button with fontawesome calendar icon
        // Else generate the calendar navigation bar, weekdays, and the monthly calendar itself
        return `
            <label for="calendar">Pick a date:</label>
            <input type="text" name="calendar" id="calendar" ${chosenDate ? `value=${chosenDate.toLocaleDateString()}` : `placeholder="mm/dd/yyyy"`} readonly>
            <section class="calendar">
                ${
                    minimized
                        ?   `<button class="calendarIcon"><i class="far fa-calendar-alt"></i></button>`
                        :   `<button class="calendarIcon"><i class="far fa-calendar-alt"></i></button>
                            <div class="calendarDisplay">
                                ${
                                    createCalendarNav(calendarYear, calendarMonth)
                                }
                                ${
                                    createCalendarWeek()
                                }
                                ${
                                    filledCalendar.map( (day) => {
                                        return insertDate(day);
                                    }).reduce((acc, cur) => {
                                        return acc + cur;
                                    })
                                }
                            </div>
                        `
                }
            </section>
        `;
    };
    return {
        createCalendarDisplay: createCalendarDisplay,
        importFromCalendar: importFromCalendar
    };
}();

export default calendarGenerator;