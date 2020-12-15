import calendar from './calendar.js';

const app = {
    buildCalendar: calendar.buildCalendar,
    gitHubApiCall: calendar.gitHubApiCall,
    init: function() {
        this.gitHubApiCall();
    }
};

if (document.readyState === 'complete') {
    app.init();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        app.init();
    });
};