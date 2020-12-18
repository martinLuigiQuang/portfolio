import apiCall from './apiCall.js';
import journey from './journey.js';
import projectDisplay from './projectDisplay.js';

const app = {
    buildCalendar: apiCall.init,
    buildTimeline: journey.init,
    buildProjectDisplay: projectDisplay.init,
    init: function() {
        this.buildCalendar();
        this.buildTimeline();
        this.buildProjectDisplay();
    }
};

if (document.readyState === 'complete') {
    app.init();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        app.init();
    });
};