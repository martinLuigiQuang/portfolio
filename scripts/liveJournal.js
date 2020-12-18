const liveJournal = function() {
    const createJournalPages = function() {
        const chosenDateEntry = document.getElementsByClassName('dayInMonth chosen')[0];
        let classList = '';
        if (chosenDateEntry) {
            classList = chosenDateEntry.classList.toString();
        };
        return `
            <section class="journal">
                <div class="activities">
                    <h2>live journal</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    ${
                        classList.includes('gitHub')
                            ?   `<div class="symbolContainer--github"></div>`
                            :   '' 
                    }
                    ${
                        classList.includes('juno')
                            ?   `<div class="symbolContainer--juno"></div>`
                            :   ''
                    }
                    ${
                        classList.includes('crc')
                            ?   `<div class="symbolContainer--crc"></div>`
                            :   ''
                    }
                    ${
                        classList.includes('coursera')
                            ?   `<div class="symbolContainer--coursera"></div>`
                            :   ''
                    }
                    ${
                        classList.includes('gis')
                            ?   `<div class="symbolContainer--gis"></div>`
                            :   ''
                    }
                </div> <!-- closing activities -->
                <div class="skills">
                    <h2>my tech journey</h2>
                    <ul>
                        <li><i class="fab fa-html5"></i><span>html5</span></li>
                        <li><i class="fas fa-universal-access"></i><span>accessibility</span></li>
                        <li><i class="fab fa-css3-alt"></i><span>css3</span></li>
                        <li><i class="fab fa-sass"></i><span>sass</span></li>
                        <li><i class="fas fa-mobile-alt"></i><span>responsive</span></li>
                        <li><i class="fab fa-java"></i><span>java</span></li>
                        <li><i class="fab fa-js-square"><div></div></i><span>javascript</span></li>
                        <li><i class="devicon-jquery-plain"></i><span>jquery</span></li>
                        <li><i class="fab fa-react"></i><span>react</span></li>
                        <li><i class="devicon-git-plain"></i><span>git</span></li>
                        <li><i class="fab fa-github"></i><span>github</span></li>
                        <li><img src="https://img.icons8.com/color/96/000000/firebase.png"/><span>firebase</span></li>
                    </ul>
                </div> <!-- closing skills -->
            </section>
        `
    };

    return {
        createJournalPages: createJournalPages
    };
}();

export default liveJournal;