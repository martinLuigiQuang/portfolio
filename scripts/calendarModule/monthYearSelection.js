import calendarInformation from './calendarInformation.js';

const monthYearSelection = function() {
    // initial import of months array and today Date object from calendarInformation
    const [months,, today] = calendarInformation.exportConstants();
    // initial import of chosenDate, calendarYear, and calendarMonth from calendarInformation
    let [, chosenDate, calendarYear, calendarMonth] = calendarInformation.setInformation();
    // initial currentDecade based on the current calendarYear;
    let currentDecade = getCurrentDecade(calendarYear);

    // getCurrentDecade function to generate the years in a decaded starting with the 'start' year as the parameter
    function getCurrentDecade(start) {
        // if the starting year is not the start of the decade, set it to the start of the decade
        if (start % 10) {
            start -= start % 10;
        };
        return [start, start + 1, start + 2, start + 3, start + 4, start + 5, start + 6, start + 7, start + 8, start + 9];
    };

    // function to generate the html codes for the monthly selection panel
    function createMonthSelectionPanel() {
        return `
            <div class="selectionPanel--month">
                ${
                    months.map((month, index) => {
                        return `<button class="selection" value="${index}">${month.slice(0, 3)}</button>`
                    }).reduce((acc, cur) => {
                        return acc + cur;
                    })
                }
            </div>
        `;
    };

    // function to generate the html codes for the yearly selection panel
    function createYearSelectionPanel() {
        return `
            <div class="selectionPanel--year">
                <div class="selectionPanel--year--display">
                    ${
                        currentDecade.map((year) => {
                            return `<button class="selection" value="${year}">${year}</button>`
                        }).reduce((acc, cur) => {
                            return acc + cur;
                        })
                    }
                </div>
                <div class="selectionPanel--year--nav">
                    <button class="previousDecade"><i class="fas fa-chevron-left"></i></button>
                    <button class="nextDecade"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
        `;
    };

    // function to navigate the yearly selection panel
    // 'change' parameter dictates the function to go the next or previous decade depending on the which navigation button is clicked
    // 'buildSelectionPanel' parameter is a function to render a new selection panel
    // 'buildCalendar' parameter is a function to render new calendar if a new year is selected
    function handleYearSelectionNav(change, buildSelectionPanel, buildCalendar) {
        currentDecade = currentDecade.map(year => year + change);
        buildSelectionPanel(true, buildCalendar);
    };

    // function to handle selection buttons from the selection panel
    // 'year' parameter is a boolean value: true if the  year selection button is clicked; false in case the month selection is clicked
    // 'buildCalendar' parameter is a function to render new calendar if a selection is made
    function handleSelectionButtons(year, buildCalendar) {
        const selectionPanel = document.getElementsByClassName('selectionPanel')[0];
        // if the innerHTML is blank, render the selection panel; else, collapse it
        if (selectionPanel.innerHTML === '') {
            year ? buildSelectionPanel(true, buildCalendar) : buildSelectionPanel(false, buildCalendar);
        } else {
            selectionPanel.innerHTML = '';
            selectionPanel.style.height = 0;
        };
    };

    // function to handle the selection of a new month from the selection panel
    // 'selection' parameter is the value of the user's choice
    // 'selectionPanel' parameter is the DOM element that renders the selection panel
    // 'monthButton' paramater is the DOM element that renders the monthly selection button
    // 'buildCalendar' parameter is a function to render new calendar when a new month is selected
    function handleMonthSelection(selection, selectionPanel, monthButton, buildCalendar) {
        // import the most updated chosenDate, calendarYear, and calendarMonth from calendarInformation
        [, chosenDate, calendarYear, calendarMonth] = calendarInformation.setInformation();
        // update the calendarMonth with user's selection
        calendarMonth = parseInt(selection.value);
        // Collapse the selection panel after a selection has been made
        selectionPanel.innerHTML = '';
        selectionPanel.style.height = 0;
        // render next month's name to the monthly selection button in the calendarNav bar
        monthButton.innerHTML = months[calendarMonth];
        // update the information in calendarInformation for other modules
        calendarInformation.getInformation('', chosenDate, calendarYear, calendarMonth);
        // render new calendar with the newly selected month
        buildCalendar();
    };

    // function to handle the selection of a new year from the selection panel
    // 'selection' parameter is the value of the user's choice
    // 'selectionPanel' parameter is the DOM element that renders the selection panel
    // 'yearButton' paramater is the DOM element that renders the yearly selection button
    // 'buildCalendar' parameter is a function to render new calendar when a new year is selected
    function handleYearSelection(selection, selectionPanel, yearButton, buildCalendar) {
        // import the most updated chosenDate, calendarYear, and calendarMonth from calendarInformation
        [, chosenDate, calendarYear, calendarMonth] = calendarInformation.setInformation();
        // update the calendarYear with the user's selection
        calendarYear = parseInt(selection.value);
        // Collapse the selection panel after a selection has been made
        selectionPanel.innerHTML = '';
        selectionPanel.style.height = 0;
        // update the yearly selection button with the newly selected year value
        yearButton.innerHTML = calendarYear;
        // update the information in calendarInformation for other modules
        calendarInformation.getInformation('', chosenDate, calendarYear, calendarMonth);
        // render new calendar with the newly selected year
        buildCalendar();
    };

    // function to build the selection panel
    // 'year' parameter is a boolean value: true if the yearly selection button is clicked; false if the monthly selection button is clicked
    function buildSelectionPanel(year, buildCalendar) {
        // DOM element that renders calendarNav bar
        const calendarNav = document.getElementsByClassName('calendarNav')[0];
        // Search for monthButton, yearButton, and selectionPanel as children elements of the calendarNav bar
        const monthButton = calendarNav.getElementsByClassName('monthButton')[0];
        const yearButton = calendarNav.getElementsByClassName('yearButton')[0];
        const selectionPanel = calendarNav.getElementsByClassName('selectionPanel')[0];
        // get the height of the selectionPanel, which the height if the calendarDisplay minus the height of the calendarNav bar
        const heightOfSelectionPanel = document.getElementsByClassName('calendarDisplay')[0].offsetHeight - calendarNav.offsetHeight;
        selectionPanel.style.height = heightOfSelectionPanel + 'px';
        // If yearly selection button is clicked; render the year selection panel and attach event listeners to the button elements that represent the years in the decade and the navigation buttons to go to previous or next decade
        if (year) {
            const selectionPanelHTML = createYearSelectionPanel();
            selectionPanel.innerHTML = selectionPanelHTML;

            const previousDecade = selectionPanel.getElementsByClassName('previousDecade')[0];
            previousDecade.onclick = () => handleYearSelectionNav(-10, () => buildSelectionPanel(true, buildCalendar), buildCalendar);

            const nextDecade = selectionPanel.getElementsByClassName('nextDecade')[0];
            nextDecade.onclick = () => handleYearSelectionNav(10, () => buildSelectionPanel(true, buildCalendar), buildCalendar);

            // attach event listeners to each of the selection buttons
            const selections = [...selectionPanel.getElementsByClassName('selection')];
            if (selections.length) {
                selections.forEach((selection) => {
                    selection.onclick = () => {
                        handleYearSelection(selection, selectionPanel, yearButton, buildCalendar);
                    };
                });
            };
        // if a monthly selection button is selected, render the month selection panel and attach event listeners to each of the 12 monthly selection buttons
        } else {
            const selectionPanelHTML = createMonthSelectionPanel();
            selectionPanel.innerHTML = selectionPanelHTML;

            // attach event listeners to each of the selection buttons
            const selections = [...selectionPanel.getElementsByClassName('selection')];
            if (selections.length) {
                selections.forEach((selection) => {
                    selection.onclick = () => {
                        handleMonthSelection(selection, selectionPanel, monthButton, buildCalendar);
                    };
                });
            };
        };
    };

    return {
        handleSelectionButtons: handleSelectionButtons
    };
}();

export default monthYearSelection;

//MIT License
//Copyright(c) 2020 Martin Nguyen