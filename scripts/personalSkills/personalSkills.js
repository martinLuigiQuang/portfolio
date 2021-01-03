import generator from './generator.js';

const personalSkills = function() {
    const personalSkillsSection = document.getElementsByClassName('personalSkills')[0];

    function buildPersonalSkillsSection() {
        personalSkillsSection.innerHTML = '';
        personalSkillsSection.appendChild(generator.buildSection().content);
    };

    function init() {
        buildPersonalSkillsSection();
    };
    
    return {
        init: init
    };
}();

export default personalSkills;