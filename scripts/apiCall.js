import calendar from './calendar.js';
import markedDates from './markedDates.js';

const apiCall = function() {
    const buildCalendar = calendar.buildCalendar;
    const getGitProjects = calendar.getGitProjectNames;
    const dates = markedDates.dates;
    const classNames = markedDates.classNames;
    const url = 'https://api.github.com/users/martinLuigiQuang/repos';
    const gitHubApiCall = async function() {
        try {
            const promise = await fetch(url);
            const response = await promise.json();
            const projects = response.map((project) => {
                return ([
                    project.fullname.slice(17, -1).concat(project.fullname.slice(-1)),
                    new Date(project.created_at),
                    new Date(project.pushed_at)
                ]);
            });
            const startDates = response.map((project) => new Date(project.created_at));
            const pushedDates = response.map((project) => new Date(project.pushed_at));
            const markedDates = startDates.concat(pushedDates).concat(dates);
            const markedClasses = (startDates.map(() => 'gitHubStart')).concat(pushedDates.map(() => 'gitHubEnd')).concat(classNames);
            getGitProjects(projects);
            buildCalendar(markedDates, markedClasses);
        }
        catch (err) {
            console.log(err)
        }
    };

    const init = function() {
        gitHubApiCall();
    }
    
    return {
        init: init
    }
}();

export default apiCall;