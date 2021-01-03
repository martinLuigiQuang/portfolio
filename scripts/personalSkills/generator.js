import contents from './contents.js';

const generator = function() {
    function createSection(contents) {
        const sectionDisplay = `
            <ul>
                ${
                   contents.map((entry) => {
                       return `
                            <li>
                                <div class="icon">
                                    ${entry.icon}
                                    <h3>${entry.title}</h3>
                                </div>    
                                <div class="text">
                                    <p>${entry.text}</p>
                                </div>
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

    function buildSection() {
        return createSection(contents);
    }
    
    return {
        buildSection: buildSection
    };
}();

export default generator;