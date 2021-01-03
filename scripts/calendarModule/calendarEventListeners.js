import calendarInformation from './calendarInformation.js';

const calendarEventListeners = function() {
    // Initial imports from calendarGenerator module; updated values will be exported back to calendarGenerator by the calendarGenerator.importFromCalendar() method
    let [minimized, chosenDate, calendarYear, calendarMonth] = calendarInformation.setInformation();

    // getChosenDate function to bind the user's chosen date to the global chosenDate variable and also pass it to calendarGenerator.js module via getChosenDate method
    function handleChosenDate(day, buildCalendar) {
        [minimized, chosenDate, calendarYear, calendarMonth] = calendarInformation.setInformation();
        chosenDate = new Date(calendarYear, calendarMonth, day);
        // export the user's chosen date (if any), current calendar year and month, and whether or not the calendar is minimized to the calendarGenerator module to generate new calendar
        calendarInformation.getInformation(minimized, chosenDate, calendarYear, calendarMonth);
        // build new calendar with the new imports from calendarGenerator module
        buildCalendar();
    };

    // handleCalendarNav function to change the month (and year) according to the user's interaction
    // change param refers to how many months to add to the current displayed month; change is +1 if the next month button is clicked and -1 if previous month is clicked
    function handleCalendarNav(change, buildCalendar) {
        [minimized, chosenDate, calendarYear, calendarMonth] = calendarInformation.setInformation();
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
        chosenDate = new Date(calendarYear, calendarMonth, 1);
        // export the user's chosen date (if any), current calendar year and month, and whether or not the calendar is minimized to the calendarGenerator module to generate new calendar
        calendarInformation.getInformation(minimized, chosenDate, calendarYear, calendarMonth);
        // build new calendar with the new imports from calendarGenerator module
        buildCalendar();
    };

    // handleCollapse function to toggle the global variable minimized
    // inputField param is a boolean to check if the user clicks on the input field
    function handleCollapse(buildCalendar) {
        [minimized, chosenDate, calendarYear, calendarMonth] = calendarInformation.setInformation();
        if (!minimized) {
            minimized = 'minimized';
        } else {
            minimized = '';
        };
        // export the user's chosen date (if any), current calendar year and month, and whether or not the calendar is minimized to the calendarGenerator module to generate new calendar
        calendarInformation.getInformation(minimized, chosenDate, calendarYear, calendarMonth);
        // build new calendar with the new imports from calendarGenerator module
        buildCalendar();
    };

    return {
        handleChosenDate: handleChosenDate,
        handleCalendarNav: handleCalendarNav,
        handleCollapse: handleCollapse
    };
}();

export default calendarEventListeners;

//MIT License
//Copyright(c) 2020 Martin Nguyen