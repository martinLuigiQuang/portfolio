import liveJournal from './liveJournal.js';

const calendar = function() {
    const createJournalPages = liveJournal.createJournalPages;
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const calendarSection = document.getElementsByClassName('calendar')[0];
    const today = new Date();
    let chosenDate = today;
    let calendarMonth = today.getMonth();
    let calendarYear = today.getFullYear();
    let markedDates = [];
    let nameClass = '';
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

    const createCalendarDisplay = function(dates) {
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
                                ${
                                    classList.includes('gitHub')
                                        ?   `<div class="symbolContainer--github"></div>`
                                        :   '' 
                                }
                                ${
                                    classList.includes('juno')
                                        ?   `<div class="symbolContainer--juno"></div>`
                                        :   ''
                                }
                                ${
                                    classList.includes('crc')
                                        ?   `<div class="symbolContainer--crc"></div>`
                                        :   ''
                                }
                                ${
                                    classList.includes('coursera')
                                        ?   `<div class="symbolContainer--coursera"></div>`
                                        :   ''
                                }
                                ${
                                    classList.includes('gis')
                                        ?   `<div class="symbolContainer--gis"></div>`
                                        :   ''
                                }
                            </button>`
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
        const isMarked = function(dates, day, className) {
            let marked = false;
            let nameClass = '';
            dates.forEach((date, index) => {
                const matched = ( date.getDate() === parseInt(day) && date.getMonth() === calendarMonth && date.getFullYear() === calendarYear )
                marked += matched;
                if (!nameClass.includes(className[index]) && matched) {
                    nameClass += ' ' + className[index];
                }
            });
            return {
                marked: marked,
                className: nameClass
            };
        }
        const insertDate = function(day, concatClassName) {
            let dateEntry = createCalendarDateEntry(day, ''.concat(concatClassName));
            if (isToday(day) && isChosenDay(day)) {
                dateEntry = createCalendarDateEntry(day, 'today chosen '.concat(concatClassName));
            } else if (isChosenDay(day)) {
                dateEntry = createCalendarDateEntry(day, 'chosen '.concat(concatClassName));
            } else if (isToday(day)) {
                dateEntry = createCalendarDateEntry(day, 'today '.concat(concatClassName));
            };
            return dateEntry;
        }
        return `
            <div class="wrapper">
                <form class="calendarDisplay">
                    ${
                        createCalendarNav(calendarYear, calendarMonth)
                    }
                    ${
                        weekdays.map( (weekday) => {
                            return `<h3>${weekday.slice(0,3)}</h3>`;
                        }).reduce((acc, cur) => {
                            return acc + cur;
                        })
                    }
                    ${
                        filledCalendar.map( (day) => {
                            let dateEntry = '';
                            const { marked, className } = isMarked(dates, day, nameClass);
                            if (marked) {
                                dateEntry = insertDate(day, className);
                            } else {
                                dateEntry = insertDate(day, '');
                            }
                            return dateEntry;
                        }).reduce((acc, cur) => {
                            return acc + cur;
                        })
                    }
                </form>
            </div>
        `;
    };

    const buildCalendar = function(dates, className) {
        markedDates = dates;
        nameClass = className;
        const getChosenDate = function(day) {
            chosenDate = new Date(calendarYear, calendarMonth, day);
        };
        const handleSubmit = function(event) {
            event.preventDefault();
            buildCalendar(markedDates, nameClass);
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
            setMilestone();
        };
        const calendarDisplay = createCalendarDisplay(dates);
        calendarSection.innerHTML = calendarDisplay;
        const calendar = document.getElementsByClassName('calendarDisplay')[0];
        calendar.onsubmit = (event) => handleSubmit(event);
        calendar.insertAdjacentHTML("afterend", createJournalPages(''));
        const previousButton = document.getElementsByClassName('previousMonth')[0];
        previousButton.onclick = () => handleCalendarNav(-1);
        const nextButton = document.getElementsByClassName('nextMonth')[0];
        nextButton.onclick = () => handleCalendarNav(1);
        const dateEntries = [...document.getElementsByClassName('dayInMonth')];
        dateEntries.forEach((entry) => {
            entry.onclick = () => getChosenDate(entry.value);
        });
    };

    const getMilestone = function(milestone) {
        calendarMonth = milestone;
        calendarYear = 2020;
        buildCalendar(markedDates, nameClass);
        return calendarMonth;
    };

    const setMilestone = function() {
        const focusedButton = document.getElementsByClassName('milestone focus')[0];
        if (focusedButton) {
            focusedButton.classList.remove('focus');
        };
        const milestones = [...document.getElementsByClassName('milestone')];
        milestones.forEach((milestone) => {
            if (parseInt(milestone.value) === calendarMonth && calendarYear === 2020) {
               milestone.classList.add('focus');
            }
        });
    };

    return {
        months: monthNames,
        calendarMonth: calendarMonth,
        chosenDate: chosenDate,
        buildCalendar: buildCalendar,
        getMilestone: getMilestone
    };
}();

export default calendar;