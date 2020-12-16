const liveJournal = function() {
    const createJournalPages = function(notes) {
        const chosenDateEntry = document.getElementsByClassName('dayInMonth chosen')[0];
        let classList = '';
        if (chosenDateEntry) {
            classList = chosenDateEntry.classList.toString();
        };
        return `
            <section class="journal">
                <h2>live journal</h2>
                ${
                    notes
                        ?   `<div class="story">
                                <h3>my story</h3>
                                <p>${notes}</p>
                            </div>`
                        :   ''
                }
                <div class="activities">
                    <h3>my activities</h3>
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
                </div>
            </section>
        `
    };

    return {
        createJournalPages: createJournalPages
    };
}();

export default liveJournal;