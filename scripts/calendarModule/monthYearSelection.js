import calendarInformation from './calendarInformation.js';

const monthYearSelection = function() {
    const [months,, today] = calendarInformation.exportConstants();
    let [, chosenDate, calendarYear, calendarMonth] = calendarInformation.setInformation();
    let currentDecade = getCurrentDecade(calendarYear);

    function getCurrentDecade(start) {
        return [start, start + 1, start + 2, start + 3, start + 4, start + 5, start + 6, start + 7, start + 8, start + 9];
    };

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

    function handleYearSelectionNav(change, buildSelectionPanel, buildCalendar) {
        currentDecade = currentDecade.map(year => year + change);
        buildSelectionPanel(true, buildCalendar);
    };

    function handleSelectionButtons(year, buildCalendar) {
        const selectionPanel = document.getElementsByClassName('selectionPanel')[0];
        if (selectionPanel.innerHTML === '') {
            year ? buildSelectionPanel(true, buildCalendar) : buildSelectionPanel(false, buildCalendar);
        } else {
            selectionPanel.innerHTML = '';
            selectionPanel.style.height = 0;
        };
    };

    function handleMonthSelection(selection, selectionPanel, monthButton, buildCalendar) {
        [, chosenDate, calendarYear, calendarMonth] = calendarInformation.setInformation();
        calendarMonth = parseInt(selection.value);
        selectionPanel.innerHTML = '';
        selectionPanel.style.height = 0;
        monthButton.innerHTML = months[calendarMonth];
        chosenDate = new Date(calendarYear, calendarMonth, 1);
        if (chosenDate - today > 0) {
            chosenDate = today;
        };
        calendarInformation.getInformation('', chosenDate, calendarYear, calendarMonth);
        buildCalendar();
    };

    function handleYearSelection(selection, selectionPanel, yearButton, buildCalendar) {
        [, chosenDate, calendarYear, calendarMonth] = calendarInformation.setInformation();
        calendarYear = parseInt(selection.value);
        selectionPanel.innerHTML = '';
        selectionPanel.style.height = 0;
        yearButton.innerHTML = calendarYear;
        chosenDate = new Date(calendarYear, calendarMonth, 1);
        if (chosenDate - today > 0) {
            chosenDate = today;
        };
        calendarInformation.getInformation('', chosenDate, calendarYear, calendarMonth);
        buildCalendar();
    };

    function buildSelectionPanel(year, buildCalendar) {
        const calendarNav = document.getElementsByClassName('calendarNav')[0];
        const monthButton = calendarNav.getElementsByClassName('monthButton')[0];
        const yearButton = calendarNav.getElementsByClassName('yearButton')[0];
        const selectionPanel = calendarNav.getElementsByClassName('selectionPanel')[0];
        const heightOfSelectionPanel = document.getElementsByClassName('calendarDisplay')[0].offsetHeight - 50;
        selectionPanel.style.height = heightOfSelectionPanel + 'px';
        if (year) {
            const selectionPanelHTML = createYearSelectionPanel();
            selectionPanel.innerHTML = selectionPanelHTML;

            const previousDecade = selectionPanel.getElementsByClassName('previousDecade')[0];
            previousDecade.onclick = () => handleYearSelectionNav(-10, () => buildSelectionPanel(true, buildCalendar), buildCalendar);

            const nextDecade = selectionPanel.getElementsByClassName('nextDecade')[0];
            nextDecade.onclick = () => handleYearSelectionNav(10, () => buildSelectionPanel(true, buildCalendar), buildCalendar);

            const selections = [...selectionPanel.getElementsByClassName('selection')];
            if (selections.length) {
                selections.forEach((selection) => {
                    selection.onclick = () => {
                        handleYearSelection(selection, selectionPanel, yearButton, buildCalendar);
                    };
                });
            };
        } else {
            const selectionPanelHTML = createMonthSelectionPanel();
            selectionPanel.innerHTML = selectionPanelHTML;
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