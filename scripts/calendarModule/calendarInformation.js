const calendarInformation = function() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // names of the months
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // names of the weekdays
    const today = new Date(); // the current date when the calendar is loaded
    let minimized = ''; // variable to toggle calendar between normal and minimized; default is normal; if minimized, the value is set to 'minimized', else it is an empty string
    let chosenDate = new Date(2020, 2, 16); // the first time the calendar is loaded the default chosen date is the current date
    let calendarMonth = chosenDate.getMonth(); // the index of the month to display on calendar navigation bar; January = 0, February = 1, etc...
    let calendarYear = chosenDate.getFullYear(); // the year to display on calendar navigation bar

    function getInformation(min, date, year, month) {
        minimized = '';
        chosenDate = date;
        calendarYear = year;
        calendarMonth = month;
    };

    function setInformation() {
        return [minimized, chosenDate, calendarYear, calendarMonth];
    };

    function exportConstants() {
        return [months, weekdays, today];
    };

    return {
        getInformation: getInformation,
        setInformation: setInformation,
        exportConstants: exportConstants
    };
}();

export default calendarInformation;

//MIT License
//Copyright(c) 2020 Martin Nguyen