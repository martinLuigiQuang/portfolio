import defaultCalendarStyling from './calendarModule/defaultCalendarStyling.js'; // OPTIONAL MODULE THAT ADDS DEFAULT STYLING FOR THE DATE PICKER. REMOVE WHERE CUSTOMIZED STYLING IS PREFERRED.
import calendar from './calendarModule/calendar.js';
import holidaySongs from './holidaySongs.js';

const app = {
    calendarStyling: defaultCalendarStyling.init, // OPTIONAL - CAN BE REPLACED BY CUSTOMIZED STYLING
    buildCalendar: calendar.init,
    getHolidaySong: holidaySongs.init,
    init: function() {
        this.calendarStyling(); // OPTIONAL - CAN BE REPLACED BY CUSTOMIZED STYLING
        this.buildCalendar();
        this.getHolidaySong();
    }
};

if (document.readyState === 'complete') {
    app.init();
} else {
    const contentLoaded = document.addEventListener('DOMContentLoaded', function() {
        app.init();
    });
    document.removeEventListener('DOMContentLoaded', contentLoaded);
};