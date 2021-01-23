import calendarInformation from './calendarInformation.js';
import calendarGenerator from './calendarGenerator.js';
import calendarEventListeners from './calendarEventListeners.js';
import monthYearSelection from './monthYearSelection.js';
import markedDates from '../journey/markedDates.js';
import journey from '../journey/journey.js';

const calendar = function() {
    const calendarContainer = document.getElementsByClassName('datePicker')[0]; // bind the calendar to the DOM element with class name 'calendar'
    const form = calendarContainer.parentElement; // the form element that should be the parent of the calendarContainer; will log an error if the parent element is not a <form>

    // Initial imports from calendarGenerator module; updated values will be exported back to calendarGenerator by the calendarGenerator.importFromCalendar() method
    let [minimized,, calendarYear, calendarMonth] = calendarInformation.setInformation(); // variable to toggle calendar between normal and minimized; default is normal; if minimized, the value is set to 'minimized', else it is an empty string
    
    // buildCalendar function to bind the calendar display HTML to the DOM element that holds it, and to attach event listeners to enable interactions with the calendar
    function buildCalendar() {
        // import the 'minimized' value from calendarGenerator module
        [minimized,, calendarYear, calendarMonth] = calendarInformation.setInformation();
        // calendarDisplay local variable to hold the value returned from the function call to generateCalendar function
        const calendarDisplay = calendarGenerator.generateCalendar();
        // Clear inner HTML of the calendarContainer then append the new content of calendarDisplay to it in order to update the calendar
        calendarContainer.innerHTML = '';
        calendarContainer.appendChild(calendarDisplay.content);
        
        // Bind the input#calendar to a local variable
        const dateInput = document.getElementById('calendar');

        // Bind the handleCollapse and handleInputValue methods to onclick event
        dateInput.onclick = () => calendarEventListeners.handleCollapse(() =>buildCalendar());

        const calendarIcon = calendarContainer.getElementsByClassName('calendarIcon')[0];
        calendarIcon.onclick = () => calendarEventListeners.handleCollapse(() => buildCalendar());

        // If the calendar is NOT minimized, bind the previous month button, next month button, collapse button, and calendar date buttons to local variables and attach corresponding event listeners to them
        // Else, bind the fontawesome calendar icon button to a local variable and attach onclick event listener to toggle the calendar display
        if (!minimized) {
            // calendar local variable to hold the DOM element with class name 'calendarDisplay', i.e. the <form class='calendarDisplay'> that was created by createCalendarDisplay function
            const calendar = calendarContainer.getElementsByClassName('calendarDisplay')[0];
            
            // bind calendar date buttons to a local array and mark each one according to the markedDates module
            const calendarDates = [...calendar.getElementsByClassName('day')];
            calendarDates.forEach((date) => {
                // to mark the dates according to the information from markedDates module
                markedDates.markDates(date);
            });

            // build timeline
            journey.buildTimeline(() => buildCalendar());

            calendar.onclick = (event) => {
                // bind event listeners to each of the date entries
                if (event.target.classList.value.includes('day') || event.target.parentNode.classList.value.includes('day')) {
                    let day = event.target.children.length ? event.target.value : event.target.parentNode.value;
                    calendarEventListeners.handleChosenDate(day, () => buildCalendar());
                    calendarEventListeners.handleCollapse(() => buildCalendar());
                }
                // bind event listener to the previous month button
                else if (event.target.classList.value.includes('previousMonth') || event.target.parentNode.classList.value.includes('previousMonth')) {
                    calendarEventListeners.handleCalendarNav(-1, () => {
                        buildCalendar();
                        journey.buildTimeline(() => buildCalendar());
                    });
                } 
                // bind event listener to the next month button
                else if (event.target.classList.value.includes('nextMonth') || event.target.parentNode.classList.value.includes('nextMonth')) {
                    calendarEventListeners.handleCalendarNav(1, () => {
                        buildCalendar();
                        journey.buildTimeline(() => buildCalendar());
                    });
                } 
                // bind event listener to the collapse calendar button
                else if (event.target.classList.value.includes('collapseButton') || event.target.parentNode.classList.value.includes('collapseButton')) {
                    calendarEventListeners.handleCollapse(() => buildCalendar());
                } 
                // bind event listener to the month selection button
                else if (event.target.classList.value.includes('monthButton')) {
                    monthYearSelection.handleSelectionButtons(false, () => buildCalendar());
                } 
                // bind event listener to the year selection button
                else if (event.target.classList.value.includes('yearButton')) {
                    monthYearSelection.handleSelectionButtons(true, () => buildCalendar());
                };
            };
        };
    };

    // checkForm function to check if the calendar is placed within a <form> element; if not, do not build the calendar and log an error message
    function checkForm() {
        if (form.nodeName === 'FORM') {
            buildCalendar();
            form.onsubmit = (event) => event.preventDefault();
        } else {
            console.log('Calendar must be placed in a <form> element');
        };
    };

    // Wrap buildCalendar function in an init function to be exported to other modules
    function init() {
        checkForm();
    };

    // Return init function to be exported to app.js
    return {
        init: init
    };
}();

export default calendar;

//MIT License
//Copyright(c) 2020 Martin Nguyen