const liveJournal = function() {
    const createJournalPages = function() {
        const chosenDateEntry = document.getElementsByClassName('dayInMonth chosen')[0];
        let classList = '';
        if (chosenDateEntry) {
            classList = chosenDateEntry.classList.toString();
        };
        return `
            <section class="journal">
                <h2>live journal</h2>
                <div class="activities">
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

    const createMyStory = function(photo) {
        return `
            <h2>my story</h2>
            <div class="photosContainer">
                <img src="../../${photo.imgFile}" alt="${photo.altText}"/>
                <div class="photoDisplayNav">
                    <button class="previousPhoto"><i class="fas fa-chevron-left"></i></button>
                    <button class="nextPhoto"><i class="fas fa-chevron-right"></i></button>
                </div>
            </div>
            <div class="content">
                <h3>my canadian experience</h3>
                <p>Born and raised in Vietnam, I earned my basic degree in Physics in Singapore. One permanent resident application rejection and one acceptance later, I became a brand new resident in Canada.</p>
                <p>I worked odd jobs to keep my dreams alive. Being a part of the Canadian Red Cross response to the COVID-19 pandemic, as well as their support programmes for First Nation communities affected by Covid, has taught me a lot about Canada and the people who live here.</p>
                <p>Now equipped with the knowledge of web development technologies thanks to the wonderful instructors at Juno College of Technology, I am both excited and ready to take on any challenge and begin my career in technology.</p>
            </div>
        `;
    };

    return {
        createJournalPages: createJournalPages,
        createMyStory: createMyStory
    };
}();

export default liveJournal;