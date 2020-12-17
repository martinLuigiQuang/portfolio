import aboutMe from './aboutMe.js';
import apiCall from './apiCall.js';
import journey from './journey.js';
import projectDisplay from './projectDisplay.js';

const app = {
    buildAboutMeSection: aboutMe.init,
    buildCalendar: apiCall.init,
    buildTimeline: journey.init,
    buildProjectDisplay: projectDisplay.init,
    init: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        this.buildAboutMeSection();
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