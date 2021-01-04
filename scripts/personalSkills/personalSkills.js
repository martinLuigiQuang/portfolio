import contents from './contents.js';

const personalSkills = function() {
    const personalSkillsSection = document.getElementsByClassName('personalSkills')[0];

    function createSection(contents) {
        const sectionDisplay = `
            <ul>
                ${
                   contents.map((entry) => {
                       return `
                            <li>
                                ${entry.icon}
                                <p>${entry.title}</p>
                            </li>
                       `;
                   }).reduce((acc, cur) => {
                       return acc + cur;
                   }) 
                }
            </ul>
        `;
        const templateFragment = document.createElement('template');
        templateFragment.innerHTML = sectionDisplay;
        return templateFragment;
    };

    function buildPersonalSkillsSection() {
        const personalSkills = createSection(contents);
        personalSkillsSection.innerHTML = '';
        personalSkillsSection.appendChild(personalSkills.content);
    };

    function init() {
        buildPersonalSkillsSection();
    };
    
    return {
        init: init
    };
}();

export default personalSkills;