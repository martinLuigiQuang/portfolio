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

            // bind previousMonth button to a local variable and add an event listener to it
            const previousButton = calendar.getElementsByClassName('previousMonth')[0];
            previousButton.onclick = () => calendarEventListeners.handleCalendarNav(-1, () => {
                buildCalendar();
                journey.buildTimeline(() => buildCalendar());
            });
            
            // bind nextMonth button to a local variable and add an event listener to it
            const nextButton = calendar.getElementsByClassName('nextMonth')[0];
            nextButton.onclick = () => calendarEventListeners.handleCalendarNav(1, () => {
                buildCalendar();
                journey.buildTimeline(() => buildCalendar());
            });
            
            // bind collapse button to a local variable and add an event listener to it
            const collapseButton = calendar.getElementsByClassName('collapseButton')[0];
            collapseButton.onclick = () => calendarEventListeners.handleCollapse(() => buildCalendar());
            
            // bind calendar date buttons to a local array and add an event listener to each of them
            const calendarDates = [...calendar.getElementsByClassName('day')];
            calendarDates.forEach((date) => {
                // to mark the dates according to the information from markedDates module
                markedDates.markDates(date);
                date.onclick = () => {
                    calendarEventListeners.handleChosenDate(date.value, () => buildCalendar());
                    calendarEventListeners.handleCollapse(() => buildCalendar());
                };
            });

            // bind the month and year selection buttons to local variables and attach event listeners to them
            const monthSelectionButton = calendar.getElementsByClassName('monthButton')[0];
            monthSelectionButton.onclick = () => monthYearSelection.handleSelectionButtons(false, () => buildCalendar()); // false boolean value to build month selectio panel; true boolean value to build year selection panel
            const yearSelectionButton = calendar.getElementsByClassName('yearButton')[0];
            yearSelectionButton.onclick = () => monthYearSelection.handleSelectionButtons(true, () => buildCalendar());
        };

        // build timeline
        journey.buildTimeline(() => buildCalendar());
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