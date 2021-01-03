const defaultCalendarStyling = function() {
    // generate the css for the default calendar styling
    const defaultStyling = function() {
        return `
            <style>
                .datePicker {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    font-size: 20px;
                    position: relative;
                    -webkit-box-align: center;
                        -ms-flex-align: center;
                            align-items: center;
                    -ms-flex-wrap: wrap;
                        flex-wrap: wrap;
                    width: 380px;
                }
                
                .datePicker input#calendar {
                    font-size: 20px;
                    -ms-flex-item-align: start;
                        align-self: flex-start;
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
                    right: 60px;
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
                    position: relative;
                    -webkit-box-align: center;
                        -ms-flex-align: center;
                            align-items: center;
                    -ms-grid-columns: (1fr)[7];
                        grid-template-columns: repeat(7, 1fr);
                }
                
                .calendarDisplay .calendarNav .monthInfo {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    gap: 2px;
                    -webkit-box-pack: center;
                        -ms-flex-pack: center;
                            justify-content: center;
                    -ms-grid-column: 2;
                    -ms-grid-column-span: 4;
                    grid-column: 2 / span 4;
                }

                .monthInfo button {
                    font-size: 16px;
                    background-color: whitesmoke;
                }

                .selectionPanel {
                    display: -ms-grid;
                    display: grid;
                    position: absolute;
                    top: 30px;
                    width: 100%;
                    background-color: white;
                    -webkit-box-align: center;
                        -ms-flex-align: center;
                            align-content: center;
                }

                .selectionPanel--month,
                .selectionPanel--year {
                    width: 100%;
                    height: 100%;
                }

                .selectionPanel--month {
                    display: -ms-grid;
                    display: grid;
                    gap: 2px;
                    -ms-grid-columns: (1fr)[4];
                        grid-template-columns: repeat(4, 1fr);
                    -ms-grid-rows: (1fr)[3];
                        grid-template-rows: repeat(3, 50px);
                }

                .selectionPanel--year,
                .selectionPanel--year--display,
                .selectionPanel--year--nav {
                    display: -ms-grid;
                    display: grid;
                    gap: 2px;
                }

                .selectionPanel--year--display {
                    -webkit-box-align: center;
                        -ms-flex-align: center;
                            align-content: center;
                    -ms-grid-columns: (1fr)[4];
                        grid-template-columns: repeat(4, 1fr);
                    -ms-grid-rows: (1fr)[3];
                        grid-template-rows: repeat(3, 48px);
                }

                .selectionPanel--year--display .selection:nth-child(9) {
                    -ms-grid-column: 2;
                    grid-column: 2;
                }

                .selectionPanel--year--nav {
                    height: 30px;
                    -webkit-box-pack: space-between;
                        -ms-flex-pack: space-between;
                            justify-content: space-between;
                    -ms-grid-columns: (1fr)[2];
                        grid-template-columns: repeat(2, 30px);
                }

                .calendarDisplay .weekdays {
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

//MIT License
//Copyright(c) 2020 Martin Nguyen