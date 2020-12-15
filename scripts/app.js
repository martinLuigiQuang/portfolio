import calendar from './calendar.js';

const app = {
    buildCalendar: calendar.init,
    init: function() {
        this.buildCalendar();
    }
};

if (document.readyState === 'complete') {
    app.init();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        app.init();
    });
};