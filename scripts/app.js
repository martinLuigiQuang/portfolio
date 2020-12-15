import apiCall from './apiCall.js';

const app = {
    buildCalendar: apiCall.init,
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