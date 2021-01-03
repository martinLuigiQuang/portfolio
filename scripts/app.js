import personalSkills from './personalSkills/personalSkills.js';
import projectDisplay from './projectDisplay/projectDisplay.js';
import calendar from './calendarModule/calendar.js';

const app = {
    buildPersonalSkillsSection: personalSkills.init,
    buildProjectDisplay: projectDisplay.init,
    buildCalendar: calendar.init,
    init: function() {
        this.buildPersonalSkillsSection();
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