import projectDisplay from './projectDisplay/projectDisplay.js';
import calendar from './calendarModule/calendar.js';

const app = {
    buildProjectDisplay: projectDisplay.init,
    buildCalendar: calendar.init,
    init: function() {
        this.buildProjectDisplay();
        this.buildCalendar();
    }
};

if (document.readyState === 'complete') {
    app.init();
} else {
    document.addEventListener('DOMContentLoaded', () => app.init());
    document.removeEventListener('DOMContentLoaded', () => app.init());
};