const liveJournal = function() {
    const buildLiveJournal = function() {
        const calendar = document.getElementsByClassName('calendar')[0];
        const journal = `
            <div class="journal">    
                <h2>my live journal</h2>
                <section class="cover"></section>
            </div>
        `;
        const createJournalPages = function() {
            const journalNode = new DOMParser().parseFromString(journal, 'text/xml').documentElement;
            calendar.appendChild(journalNode)
            console.log(calendar)
        };
        createJournalPages();
    }

    const init = function() {
        buildLiveJournal()
    }

    return {
        init: init
    };
}();

export default liveJournal;