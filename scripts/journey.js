import calendar from './calendar.js';
import { crc } from './story.js';

const journey = function() {
    const months = calendar.months;
    let calendarMonth = calendar.calendarMonth;
    const getMilestone = calendar.getMilestone;
    const timelineSection = document.getElementsByClassName('timeline')[0];

    const buildTimeline = function() {
        const createTimeline = function() {
            const java = new Date(2020, 2, 16);
            const juno = new Date(2020, 5, 8);
            const crc = new Date(2020, 6, 1);
            const bootcamp = new Date(2020, 9, 19);
            const afterBootcamp = new Date(2020, 11, 18);
            const year = 2020;
            const milestones = [java, juno, crc, bootcamp, afterBootcamp]; // milestones in terms of month indices for built-in Date object; corresponding to Mar, Jun, Jul, and Oct; the year is 2020
            return `
                <h2>my story</h2>
                ${
                    milestones.map((milestone) => {
                        return (
                            milestone.getMonth() === calendarMonth
                                ?   `<button class="milestone focus" value="${milestone}"><h3>${months[milestone.getMonth()].slice(0,3)} ${year}</h3></button>`
                                :   `<button class="milestone" value="${milestone}"><h3>${months[milestone.getMonth()].slice(0,3)} ${year}</h3></button>`
                        )
                    }).reduce((acc, cur) => {
                        return acc + cur;
                    })
                }
            `;
        };
        const handleClickOnMilestones = function(event) {
            if (event.target.children.length) {
                calendarMonth = getMilestone(new Date(event.target.value));
            } else {
                calendarMonth = getMilestone(new Date(event.target.parentNode.value));
            };
            buildTimeline();
        };
        const timeline = createTimeline();
        timelineSection.innerHTML = timeline;
        const milestones = [...document.getElementsByClassName('milestone')];
        milestones.forEach( (milestone) => {
            milestone.onclick = handleClickOnMilestones;
        });
    };

    const init = function() {
        buildTimeline();
    }
    
    return {
        init: init
    };
}();

export default journey;