const calendar = function() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    let calendarSection = document.getElementsByClassName('calendar')[0];
    let minimized = 'minimized'; // class name to toggle calendar between normal and minimized
    let chosenDate = today;
    let calendarMonth = chosenDate.getMonth();
    let calendarYear = chosenDate.getFullYear();
    const fillCalendar = function() {
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

    const createCalendarDisplay = function() {
        const filledCalendar = fillCalendar();
        const createCalendarDateEntry = function(day, classList) {
            return `
                <div class="dayEntry">
                    ${ !day 
                        ?   ''
                        :   `<button class="dayInMonth ${classList}" value="${day}">
                                <div class="dayContainer">
                                    <span>${day.charAt(0)}</span>
                                    <span>${day.charAt(1)}</span>
                                </div>
                            </button>`
                    }
                </div>
            `;
        };
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
        const isToday = function(day) {
            return (
                calendarYear === today.getFullYear() &&
                calendarMonth === today.getMonth() &&
                parseInt(day) === today.getDate()
            );
        };
        const isChosenDay = function(day) {
            return parseInt(day) === chosenDate.getDate();
        }
        
        const insertDate = function(day) {
            let dateEntry = createCalendarDateEntry(day, '');
            if (isToday(day) && isChosenDay(day)) {
                dateEntry = createCalendarDateEntry(day, 'today chosen');
            } else if (isChosenDay(day)) {
                dateEntry = createCalendarDateEntry(day, 'chosen');
            } else if (isToday(day)) {
                dateEntry = createCalendarDateEntry(day, 'today');
            };
            return dateEntry;
        }
        return `
            <form class="calendarDisplay">
                ${
                    createCalendarNav(calendarYear, calendarMonth)
                }
                ${
                    weekdays.map( (weekday) => {
                        return (
                            minimized
                                ?   `<h3 class="weekdays">${weekday.slice(0,1)}</h3>`
                                :   `<h3 class="weekdays">${weekday.slice(0,3)}</h3>`
                        );
                    }).reduce((acc, cur) => {
                        return acc + cur;
                    })
                }
                ${
                    filledCalendar.map( (day) => {
                        return insertDate(day);
                    }).reduce((acc, cur) => {
                        return acc + cur;
                    })
                }
            </form>
        `;
    };

    const buildCalendar = function() {
        const getChosenDate = function(day) {
            chosenDate = new Date(calendarYear, calendarMonth, day);
        };
        const handleSubmit = function(event) {
            event.preventDefault();
            buildCalendar();
        };
        const handleCalendarNav = function(change) {
            calendarMonth += change;
            if (calendarMonth < 0) {
                calendarMonth = 11;
                calendarYear--;
            } else if (calendarMonth > 11) {
                calendarMonth = 0;
                calendarYear++;
            };
        };
        const handleCollapseButton = function() {
            if (minimized) {
                minimized = '';
            } else {
                minimized = 'minimized';
            };
        };
        const calendarDisplay = createCalendarDisplay();
        calendarSection.innerHTML = calendarDisplay;
        
        if (minimized) {
            calendarSection.classList.add(minimized);
        } else {
            calendarSection.classList.remove('minimized');
        };

        const calendar = calendarSection.getElementsByClassName('calendarDisplay')[0];
        calendar.onsubmit = (event) => handleSubmit(event);

        const previousButton = calendar.getElementsByClassName('previousMonth')[0];
        previousButton.onclick = () => handleCalendarNav(-1);
        
        const nextButton = calendar.getElementsByClassName('nextMonth')[0];
        nextButton.onclick = () => handleCalendarNav(1);
        
        const collapseButton = calendar.getElementsByClassName('collapseButton')[0];
        collapseButton.onclick = () => handleCollapseButton();
        
        const dateEntries = [...calendar.getElementsByClassName('dayInMonth')];
        dateEntries.forEach((entry) => {
            entry.onclick = () => getChosenDate(entry.value);
        });
    };

    const init = function() {
        buildCalendar();
    };

    return init;
}();

if (document.readyState === 'complete') {
    calendar();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        calendar();
    });
};