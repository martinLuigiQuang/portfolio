import calendarInformation from '../calendarModule/calendarInformation.js';
import liveJournal from './liveJournal.js';
import stories from './stories.js';

const journey = function() {
    const timelineSection = document.getElementsByClassName('timeline')[0];

    function createTimeline() {
        // import universal calendar information
        let [,, calendarYear, calendarMonth] = calendarInformation.setInformation();
        // filter out non-milestone stories then map out each of the milestone dates
        const milestones = stories.getStories().filter((story) => {
            return story.milestone;
        }).map((story) => {
            return story.milestone;
        });
        const timeline = `
            <h2>Live Journal <span>created by Martin Nguyen</span></h2>
            ${
                milestones.map((milestone, index) => {
                    return (
                        index < milestones.length - 1
                        ?   milestone.getFullYear() === calendarYear && milestone.getMonth() <= calendarMonth && 
                            (milestones[index + 1].getMonth() > calendarMonth || milestones[index + 1].getFullYear() > milestone.getFullYear())
                            ?   `<button class="milestone focus" value="${milestone}"></button>`
                            :   `<button class="milestone" value="${milestone}"></button>`
                        :   milestone.getFullYear() === calendarYear && milestone.getMonth() - calendarMonth <= 0
                            ?   `<button class="milestone focus" value="${milestone}"></button>`
                            :   `<button class="milestone" value="${milestone}"></button>`
                    )
                }).reduce((acc, cur) => {
                    return acc + cur;
                })
            }
        `;
        const templateFragment = document.createElement('template');
        templateFragment.innerHTML = timeline;
        return templateFragment;
    };

    function handleClickOnMilestones(event, buildCalendar) {
        const chosenDate = new Date(event.target.value);
        // update the universal calendar information
        calendarInformation.getInformation('minimized', chosenDate, chosenDate.getFullYear(), chosenDate.getMonth());
        // build new calendar and timeline
        buildCalendar();
    };

    function buildTimeline(buildCalendar) {
        // append the timeline html codes to a DOM element
        const timeline = createTimeline();
        timelineSection.innerHTML = '';
        timelineSection.appendChild(timeline.content);

        // attach event listeners to each of the milestones
        const milestones = [...document.getElementsByClassName('milestone')];
        milestones.forEach( (milestone) => {
            milestone.onclick = (event) => handleClickOnMilestones(event, buildCalendar);
        });
        liveJournal.buildJournal();
    };
    
    return {
        buildTimeline: buildTimeline
    };
}();

export default journey;