import calendarInformation from '../calendarModule/calendarInformation.js';
import stories from './stories.js';

const liveJournal = function() {
    const [months] = calendarInformation.exportConstants();
    const [gis, coursera, juno, crc] = stories.getStories();
    
    function getEntry(chosenDate) {
        const entry = stories.getStories().filter((story, index) => {
            const { milestone } = story;
            if (milestone) {
                if (index < stories.getStories().length - 1) {
                    return (milestone - chosenDate <= 0) && (chosenDate - stories.getStories()[index + 1].milestone < 0);
                } else {
                    return (milestone - chosenDate <= 0);
                };
            };
        })[0];
        return entry;
    };

    function getCardinalNumber(num) {
        if (num % 10 === 1 && num !== 11) {
            return num + 'st';
        } else if (num % 10 === 2 && num !== 12) {
            return num + 'nd';
        } else if (num % 10 === 3 && num !== 13) {
            return num + 'rd';
        } else {
            return num + 'th';
        };
    };

    function createJournalPage() {
        const [, chosenDate] = calendarInformation.setInformation();
        const entry = getEntry(chosenDate);
        const chosenDateEntry = document.getElementsByClassName('day chosen')[0];
        let classList = '';
        if (chosenDateEntry) {
            classList = chosenDateEntry.classList.toString();
        };
        const story = `
            <h3>my story</h3>
            ${
                entry
                ?   `<p>${entry.story}</p>`
                :   `<p>Before coming to Canada, I used to work as a geoscientist in Singapore. One permanent resident application rejection and one acceptance later, I found myself in a new country half the world away, anxious and excited to start a new life.</p>`
            }
        `;
        const activities = `
            <h3>my activities</h3>
            ${
                classList.includes('juno')
                ?   chosenDate.getMonth() === 5
                    ?   `<div class="symbolContainer">
                            <div class="symbolContainer--juno"></div>
                            <p>${juno.activity1}</p>
                        </div>`
                    :   chosenDate.getMonth() >= 9 && chosenDate.getMonth() <= 11  
                        ?   `<div class="symbolContainer">
                                <div class="symbolContainer--juno"></div>
                                <p>${juno.activity2}</p>
                            </div>`
                        :   ''
                :   ''
            }
            ${
                classList.includes('gis')
                ?   `<div class="symbolContainer">
                    <div class="symbolContainer--gis"></div>
                        <p>${gis.activity}</p>
                    </div>`
                :   ''
            }
            ${
                classList.includes('crc')
                ?   `<div class="symbolContainer">
                        <div class="symbolContainer--crc"></div>
                        <p>${crc.activity}</p>
                    </div>`
                :   ''
            }
            ${
                classList.includes('coursera')
                ?   `<div class="symbolContainer">
                        <div class="symbolContainer--coursera"></div>
                        <p>${coursera.activity}</p>
                    </div>`
                :   ''
            }
        `;
        const journalSection = `
            <h2>
                ${months[chosenDate.getMonth()]} ${getCardinalNumber(chosenDate.getDate())}, ${chosenDate.getFullYear()}
                
            </h2>
            ${
                !classList.includes('juno') && !classList.includes('crc') && !classList.includes('coursera') && !classList.includes('gis')
                ?   `<div class="storyContainer">${story}</div> <!-- closing storyContainer -->`
                :   `<div class="storyContainer">${story}</div> <!-- closing storyContainer -->` + 
                    `<div class="activitiesContainer">${activities}</div> <!-- closing activitiesContainer -->`
            }
        `;
        const templateFragment = document.createElement('template');
        templateFragment.innerHTML = journalSection;
        return templateFragment;
    };

    function buildJournal() {
        const journalPage = createJournalPage();
        const journalSection = document.getElementsByClassName('journal')[0];
        journalSection.innerHTML = '';
        journalSection.appendChild(journalPage.content);
    };

    return {
        buildJournal: buildJournal
    };
}();

export default liveJournal;