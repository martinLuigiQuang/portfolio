import calendar from './calendar.js';

const journey = function() {
    const months = calendar.months;
    let calendarMonth = calendar.calendarMonth;
    const getMilestone = calendar.getMilestone;
    const journeySection = document.getElementsByClassName('journey')[0];

    const buildTimeline = function() {
        const createTimeline = function() {
            const milestones = [2, 5, 6, 9, 11]; // milestones in terms of month indices for built-in Date object; corresponding to Mar, Jun, Jul, and Oct; the year is 2020
            const year = 2020;
            return `
                <div class="timeline wrapper">
                    <h2>my tech story</h2>
                    ${
                        milestones.map((milestone) => {
                            return (
                                milestone === calendarMonth
                                ?   `<button class="milestone focus" value="${milestone}"><h3>${months[milestone].slice(0,3)} ${year}</h3></button>`
                                :   `<button class="milestone" value="${milestone}"><h3>${months[milestone].slice(0,3)} ${year}</h3></button>`
                            )
                        }).reduce((acc, cur) => {
                            return acc + cur;
                        })
                    }
                </div>
            `;
        };
        const handleClickOnMilestones = function(event) {
            if (event.target.children.length) {
                calendarMonth = getMilestone(parseInt(event.target.value));
            } else {
                getMilestone(parseInt(event.target.parentNode.value));
                calendarMonth = getMilestone(parseInt(event.target.value));
            };
            buildTimeline();
        };
        const timeline = createTimeline();
        journeySection.innerHTML = timeline;
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