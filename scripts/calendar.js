import apiCall from './apiCall.js';

const calendar = function() {
    const gitHubStartDates = apiCall.gitHubStartDates;
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const calendarSection = document.getElementsByClassName('calendar')[0];
    const today = new Date();
    let chosenDate = today;
    let calendarMonth = today.getMonth();
    let calendarYear = today.getFullYear();
    const fillCalendar = function() {
        const numOfDaysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
        const firstDay = new Date(calendarYear, calendarMonth, 1);
        const weekdayOfFirstDay = firstDay.getDay();
        const maxNumOfDays = getMaxNumOfDays(weekdayOfFirstDay, numOfDaysInMonth);
        let newDay = 1;
        let filledCalendar = [];
        for (let i = 0; i < maxNumOfDays; i++) {
            if (i < weekdayOfFirstDay || i >= weekdayOfFirstDay + numOfDaysInMonth) {
                filledCalendar.push('');
            } else {
                filledCalendar.push(convertDayToString(newDay));
                newDay++;
            };
        };
        return filledCalendar;
    };

    const getMaxNumOfDays = function(weekdayOfFirstDay, numOfDaysInMonth) {
        let maxNumOfDays = 35;
        if (weekdayOfFirstDay + numOfDaysInMonth > 35) {
            maxNumOfDays = 42;
        } else if (weekdayOfFirstDay + numOfDaysInMonth === 28) {
            maxNumOfDays = 28;
        };
        return maxNumOfDays;
    };

    const convertDayToString = function(day) {
        if (day < 10) {
            day = '0' + day;
        } else {
            day = '' + day;
        };
        return day;
    };

    const displayDaysInAWeek = function(weekday) {
        return `<h3>${weekday}</h3>`;
    };

    const isToday = function(date, day) {
        return (
            calendarYear === today.getFullYear() &&
            calendarMonth === today.getMonth() &&
            parseInt(day) === today.getDate()
        );
    };

    const isChosenDay = function(day) {
        if (chosenDate !== today) {
            return parseInt(day) === chosenDate.getDate();
        } else {
            return false;
        }
    }

    const isMarked = function(dates, day) {
        let result = false;
        dates.forEach((date) => {
            result += ( date.getDate() === parseInt(day) && date.getMonth() === calendarMonth && date.getFullYear() === calendarYear );
        });
        return result;
    }

    const createCalendarDateEntry = function(day, className) {
        return `
            <div class="dayEntry">
                ${ day 
                    ?   `<button class="dayInMonth ${className}" value="${day}">
                            <span>${day.charAt(0)}</span>
                            <span>${day.charAt(1)}</span>
                            ${
                                className.includes('gitHub')
                                    ?   `<a><i class="fab fa-github ${className}"></i></a>`
                                    :   ''
                            }
                        </button>` 
                    :   ''
                }
            </div>
        `;
    };

    const createCalendarNav = function(year, month) {
        return `
            <div class="calendarNav">
                <button class="previousMonth"><</button>
                <h3>${monthNames[month]} ${year}</h3>
                <button class="nextMonth">></button>
            </div>
        `;
    };

    const createCalendarDisplay = function(dates, className) {
        const filledCalendar = fillCalendar();
        return `
            <form class="calendarDisplay wrapper">
                ${
                    createCalendarNav(calendarYear, calendarMonth)
                }
                ${
                    weekdays.map( (weekday) => {
                        return displayDaysInAWeek(weekday);
                    }).reduce((acc, cur) => {
                        return acc + cur;
                    })
                }
                ${
                    filledCalendar.map( (day) => {
                        let dateEntry = createCalendarDateEntry(day, '');
                        if (isMarked(dates, day)) {
                            dateEntry = createCalendarDateEntry(day, className);
                            if (isToday(today, day)) {
                                dateEntry = createCalendarDateEntry(day, 'today '.concat(className));
                            } else if (isChosenDay(day)) {
                                dateEntry = createCalendarDateEntry(day, 'chosen '.concat(className));
                            };
                        } else {
                            if (isToday(today, day)) {
                                dateEntry = createCalendarDateEntry(day, 'today');
                            } else if (isChosenDay(day)) {
                                dateEntry = createCalendarDateEntry(day, 'chosen');
                            };
                        }
                        return dateEntry;
                    }).reduce((acc, cur) => {
                        return acc + cur;
                    })
                }
            </form>
        `;
    };

    const getChosenDate = function(day) {
        chosenDate = new Date(calendarYear, calendarMonth, day);
        console.log(chosenDate)
    }

    const handleCalendarNav = function(change) {
        calendarMonth += change;
        if (calendarMonth < 0) {
            calendarMonth = 11;
            calendarYear--;
        } else if (calendarMonth > 11) {
            calendarMonth = 0;
            calendarYear++;
        };
    }

    const handleSubmit = function(event) {
        event.preventDefault();
        init();
    }

    const buildCalendar = function(dates, className) {
        const calendarDisplay = createCalendarDisplay(dates, className);
        calendarSection.innerHTML = calendarDisplay;
        const calendar = document.getElementsByClassName('calendarDisplay')[0];
        calendar.onsubmit = (event) => handleSubmit(event);
        const previousButton = document.getElementsByClassName('previousMonth')[0];
        previousButton.onclick = () => handleCalendarNav(-1);
        const nextButton = document.getElementsByClassName('nextMonth')[0];
        nextButton.onclick = () => handleCalendarNav(1);
        const dateEntryButtons = document.getElementsByClassName('dayInMonth');
        for (let i = 0; i < dateEntryButtons.length; i++) {
            dateEntryButtons[i].onclick = () => getChosenDate(i + 1);
            const height = dateEntryButtons[i].clientWidth;
            dateEntryButtons[i].style.height = `${height}px`;
        };
    };

    const init = function() {
        buildCalendar(gitHubStartDates, 'gitHubStart');
    }

    return {
        init: init
    };
}();

export default calendar;