import calendarGenerator from './calendarGenerator.js';

const calendar = function() {
    const calendarContainer = document.getElementsByClassName('datePicker')[0]; // bind the calendar to the DOM element with class name 'calendar'
    const form = calendarContainer.parentElement; // the form element that should be the parent of the calendarContainer; will log an error if the parent element is not a <form>
    const today = new Date(); // the current date when the calendar is loaded
    let chosenDate = today; // the first time the calendar is loaded the default chosen date is the current date
    let calendarMonth = today.getMonth(); // the index of the month to display on calendar navigation bar; January = 0, February = 1, etc...
    let calendarYear = today.getFullYear(); // the year to display on calendar navigation bar
    let minimized = 'minimized'; // class name to toggle calendar between normal and minimized; default is normal; if minimized, the value is set to 'minimized'

    // calendarEventListeners object to hold all of the event listeners for the user's interactions with the calendar
    const calendarEventListeners = {
        // getChosenDate function to bind the user's chosen date to the global chosenDate variable and also pass it to calendarGenerator.js module via getChosenDate method
        handleChosenDate: function(day) {
            chosenDate = new Date(calendarYear, calendarMonth, day);
            console.log(chosenDate)
            // export the user's chosen date (if any), current calendar year and month, and whether or not the calendar is minimized to the calendarGenerator module to generate new calendar
            calendarGenerator.importFromCalendar(chosenDate, calendarYear, calendarMonth, minimized);
            // build new calendar with the new imports from calendarGenerator module
            buildCalendar();
        },
        // handleCalendarNav function to change the month (and year) according to the user's interaction
        // change param refers to how many months to add to the current displayed month; change is +1 if the next month button is clicked and -1 if previous month is clicked
        handleCalendarNav: function(change) {
            // reset chosenDate to an empty string whenever a new month is displayed
            chosenDate = '';
            // add the change to the current calendar month to navigate to a different month
            calendarMonth += change;
            // if the new month is less than 0, loop the month index back to 11 and decrease the year by 1
            if (calendarMonth < 0) {
                calendarMonth = 11;
                calendarYear--;
            // if the new month is more than 11, loop the month index back to 0 and increase the year by 1
            } else if (calendarMonth > 11) {
                calendarMonth = 0;
                calendarYear++;
            };
            // export the user's chosen date (if any), current calendar year and month, and whether or not the calendar is minimized to the calendarGenerator module to generate new calendar
            calendarGenerator.importFromCalendar(chosenDate, calendarYear, calendarMonth, minimized);
            // build new calendar with the new imports from calendarGenerator module
            buildCalendar();
        },
        // handleCollapse function to toggle the global variable minimized
        // inputField param is a boolean to check if the user clicks on the input field
        handleCollapse: function() {
            if (!minimized) {
                minimized = 'minimized';
            } else {
                minimized = '';
            };
            // export the user's chosen date (if any), current calendar year and month, and whether or not the calendar is minimized to the calendarGenerator module to generate new calendar
            calendarGenerator.importFromCalendar(chosenDate, calendarYear, calendarMonth, minimized);
            // build new calendar with the new imports from calendarGenerator module
            buildCalendar();
        }
    };

    // buildCalendar function to bind the calendar display HTML to the DOM element that holds it, and to attach event listeners to enable interactions with the calendar
    const buildCalendar = function() {
        // calendarDisplay local variable to hold the value returned from the function call t0 createCalendarDisplay function
        const calendarDisplay = calendarGenerator.createCalendarDisplay();

        // Insert the calendarDisplay, which is the HTML for the calendar display, into the DOM element held by the global variable calendarContainer
        calendarContainer.innerHTML = calendarDisplay;

        // Bind the input#calendar to a local variable
        const dateInput = document.getElementById('calendar');

        // Bind the handleCollapse and handleInputValue methods to onclick event
        dateInput.onclick = () => calendarEventListeners.handleCollapse(true);

        const calendarIcon = calendarContainer.getElementsByClassName('calendarIcon')[0];
        calendarIcon.onclick = () => calendarEventListeners.handleCollapse();

        // If the calendar is NOT minimized, bind the previous month button, next month button, collapse button, and calendar date buttons to local variables and attach corresponding event listeners to them
        // Else, bind the fontawesome calendar icon button to a local variable and attach onclick event listener to toggle the calendar display
        if (!minimized) {
            // calendar local variable to hold the DOM element with class name 'calendarDisplay', i.e. the <form class='calendarDisplay'> that was created by createCalendarDisplay function
            const calendar = calendarContainer.getElementsByClassName('calendarDisplay')[0];

            // bind previousMonth button to a local variable and add an event listener to it
            const previousButton = calendar.getElementsByClassName('previousMonth')[0];
            previousButton.onclick = () => calendarEventListeners.handleCalendarNav(-1);
            
            // bind nextMonth button to a local variable and add an event listener to it
            const nextButton = calendar.getElementsByClassName('nextMonth')[0];
            nextButton.onclick = () => calendarEventListeners.handleCalendarNav(1);
            
            // bind collapse button to a local variable and add an event listener to it
            const collapseButton = calendar.getElementsByClassName('collapseButton')[0];
            collapseButton.onclick = () => calendarEventListeners.handleCollapse();
            
            // bind calendar date buttons to a local array and add an event listener to each of them
            const calendarDates = [...calendar.getElementsByClassName('day')];
            calendarDates.forEach((date) => {
                date.onclick = () => {
                    calendarEventListeners.handleChosenDate(date.value);
                    calendarEventListeners.handleCollapse();
                };
            });
        };
    };

    // checkForm function to check if the calendar is placed within a <form> element; if not, do not build the calendar and log an error message
    const checkForm = function() {
        if (form.nodeName === 'FORM') {
            buildCalendar();
        } else {
            console.log('Calendar must be placed in a <form> element');
        };
    };

    // Wrap buildCalendar function in an init function to be exported to other modules
    const init = function() {
        checkForm();
    };

    // Return init function to be exported to app.js; today is an optional export to whichever module that requires the current date
    return {
        init: init,
        today: today
    };
}();

export default calendar;