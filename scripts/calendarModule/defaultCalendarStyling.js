const defaultCalendarStyling = function() {
    // generate the css for the default calendar styling
    const defaultStyling = function() {
        return `
            <style>
                .datePicker {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    font-size: 25px;
                    position: relative;
                    -webkit-box-align: center;
                        -ms-flex-align: center;
                            align-items: center;
                    -ms-flex-wrap: wrap;
                        flex-wrap: wrap;
                }
                
                .datePicker input#calendar {
                    font-size: 25px;
                    -ms-flex-item-align: start;
                        align-self: flex-start;
                    width: 100%;
                    max-width: 220px;
                    min-width: 160px;
                }
                
                .calendar {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                }
                
                .calendar button {
                    border: none;
                    border-radius: 5px;
                    padding: 5px;
                }
                
                .calendar button:not(.calendarIcon):hover, .calendar button:not(.calendarIcon):focus {
                    background-color: cyan;
                }
                
                .calendar button.calendarIcon {
                    background: none;
                    font-size: 25px;
                    width: 30px;
                    padding: 0;
                    transform: translateX(-30px)
                }
                
                .calendarDisplay {
                    background-color: white;
                    border: 1px solid black;
                    border-radius: 5px;
                    display: -ms-grid;
                    display: grid;
                    font-size: 18px;
                    width: 200px;
                    gap: 2px;
                    padding: 10px;
                    position: absolute;
                    top: 35px;
                    right: 30px;
                    z-index: 10;
                    -ms-grid-columns: (calc((100% - 12px)/7))[7];
                        grid-template-columns: repeat(7, calc((100% - 12px)/7));
                }
                
                .calendarDisplay h3 {
                    text-align: center;
                    margin: 0;
                }
                
                .calendarDisplay .calendarNav {
                    -ms-grid-column: 1;
                    -ms-grid-column-span: 7;
                    grid-column: 1 / span 7;
                    display: -ms-grid;
                    display: grid;
                    gap: 2px;
                    -webkit-box-align: center;
                        -ms-flex-align: center;
                            align-items: center;
                    -ms-grid-columns: (1fr)[7];
                        grid-template-columns: repeat(7, 1fr);
                }
                
                .calendarDisplay .calendarNav h3 {
                    font-size: 16px;
                    -ms-grid-column: 2;
                    -ms-grid-column-span: 4;
                    grid-column: 2 / span 4;
                }
                
                .calendarDisplay .previousMonth, .calendarDisplay .nextMonth, .calendarDisplay .collapseButton {
                    font-size: 16px;
                    -ms-flex-item-align: center;
                        -ms-grid-row-align: center;
                        align-self: center;
                    background-color: rgba(245, 245, 245, 0.6);
                }
                
                .calendarDisplay .submitButton {
                    -ms-grid-column: 6;
                    -ms-grid-column-span: 2;
                    grid-column: 6 / span 2;
                }
                
                button.day {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    font-size: 16px;
                    -webkit-box-pack: center;
                        -ms-flex-pack: center;
                            justify-content: center;
                    width: 100%;
                    background-color: whitesmoke;
                }
                
                button.day.chosen {
                    background-color: gold;
                }
                
                button.day.today {
                    background-color: #b63000;
                    color: whitesmoke;
                }

                @media (max-width: 400px) {
                    .calendarDisplay {
                        left: 0px;
                    }
                }
            </style>
        `;
    };

    // bind the generated css for the calendar to a <style> tag within the document head
    const addStyling = function() {
        const styling = defaultStyling();
        document.head.insertAdjacentHTML('beforeend', styling);
    };

    // wrap the local method in an init function to be exported
    const init = function() {
        addStyling();
    };
    
    return {
        init: init
    };
}();

export default defaultCalendarStyling;