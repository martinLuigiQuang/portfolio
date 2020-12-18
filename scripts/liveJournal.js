const liveJournal = function() {
    const createJournalPages = function(entry, date, projects) {
        const { story } = entry;
        const gitProjects = projects; 
        const chosenDateEntry = document.getElementsByClassName('dayInMonth chosen')[0];
        let classList = '';
        if (chosenDateEntry) {
            classList = chosenDateEntry.classList.toString();
        };
        return `
            <section class="journal">
                <div class="activities">
                    <h2>live journal</h2>
                    ${ story }
                    <h3>my activities</h3>
                    ${
                        classList.includes('gitHub')
                            ?   `<div class="symbolContainer--github"></div>`
                            :   '' 
                    }
                    ${
                        classList.includes('juno')
                            ?   date.getMonth() === 5
                                ?   `<div class="symbolContainer">
                                        <div class="symbolContainer--juno"></div>
                                        <p>Attending accelerated JavaScript course at Juno College of Technology</p>
                                    </div> <!== closing juno -->`
                                :   date.getMonth() >= 9 && date.getMonth() <= 11  
                                ?   `<div class="symbolContainer">
                                        <div class="symbolContainer--juno"></div>
                                        <p>Attending immersive web development bootcamp at Juno College of Technology</p>
                                    </div> <!-- closing juno -->`
                                :   ''
                            :   ''
                    }
                    ${
                        classList.includes('crc')
                            ?   `<div class="symbolContainer">
                                    <div class="symbolContainer--crc"></div>
                                    <p>Aiding Canadian Red Cross response to COVID-19 pandemic and natural and personal disasters</p>
                                </div> <!-- closing crc -->`
                            :   ''
                    }
                    ${
                        classList.includes('coursera')
                            ?   `<div class="symbolContainer">
                                    <div class="symbolContainer--coursera"></div>
                                    <p>Learning computational algorithms and their implemenations in Java</p>
                                </div> <!-- closing coursera -->`
                            :   ''
                    }
                    ${
                        classList.includes('gis')
                            ?   `<div class="symbolContainer">
                                <div class="symbolContainer--gis"></div>
                                    <p>Participating in OpenStreetMap projects around the world as a Canadian Red Cross volunteer</p>
                                </div> <!-- closing gis -->`
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