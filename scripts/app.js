import apiCall from './apiCall.js';
import journey from './journey.js';

const app = {
    buildCalendar: apiCall.init,
    buildTimeline: journey.init,
    init: function() {
        this.buildCalendar();
        this.buildTimeline();
    }
};

if (document.readyState === 'complete') {
    app.init();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        app.init();
    });
};