import calendar from './calendarModule/calendar.js'; // OPTIONAL import from calendar.js module for the current date information - can be replaced by declaring a new local variable to hold the result of new Date()

const holidaySongs = function() {
    // cache the reference to the DOM element with the class name of 'holidaySong'
    const holidaySongSection = document.getElementsByClassName('holidaySong')[0];

    // songs collection
    const songs = [
        {youtubeCode: 'Z0ajuTaHBtM', title: 'jingle bell rock'},
        {youtubeCode: 'QJ5DOWPGxwg', title: 'it\'s beginning to look a lot like christmas'},
        {youtubeCode: 'ku7ohU1IGls', title: 'rest ye merry gentlemen'},
        {youtubeCode: 'aAkMkVFwAoo', title: 'all I want for christmas is you'},
        {youtubeCode: 'sme8N2pzRx8', title: 'silent night'},
        {youtubeCode: '3PgNPc-iFW8', title: 'jingle bells'},
        {youtubeCode: '30TkClWvT5k', title: 'white christmas'},
        {youtubeCode: 'AN_R4pR1hck', title: 'it\'s the most wonderful time of the year'},
        {youtubeCode: 'hwacxSnc4tI', title: 'the christmas song'},
        {youtubeCode: 'R8CBoVc_OMI', title: 'santa claus is comin\'-to town'},
        {youtubeCode: 'pvA7-EjaSPI', title: 'have yourself a merry little christmas'},
        {youtubeCode: '3Uo0JAUWijM', title: 'happy new year'}
    ];

    // function to handle form submission
    const handleFormSubmit = function(event) {
        event.preventDefault();
        // get the value of the date picker by getting the value of input#calendar
        const chosenDate = document.getElementById('calendar').value;
        const song = getSong(chosenDate);
        holidaySongSection.innerHTML = song;
    }
    
    // function to get the song from the collection depending on the choice of dates; if the date chosen is in the new year, display customized message
    const getSong = function(chosenDate) {
        if (chosenDate) {
            const chosenDateObj = new Date(chosenDate);
            const songIndex = chosenDateObj.getDate() - calendar.today.getDate();
            return `
                ${
                    songIndex >= 0 && songIndex < 12 && chosenDateObj.getFullYear() === 2020
                        ?   `<h3>
                                Your song for ${chosenDate} is: 
                                <a href="https://www.youtube.com/watch?v=${songs[songIndex].youtubeCode}" target="_blank">${songs[songIndex].title}</a>
                            </h3>`
                        :   `<h3>
                                Covid be gone by ${chosenDate}!
                            </h3>`
                }
            `;
        }else {
            return '';
        };
    };

    // function to bind the form element to a local variable and onsubmit method to it
    const appendSongToDOM = function() {
        const form = document.getElementsByTagName('form')[0];
        form.onsubmit = (event) => handleFormSubmit(event);
    };

    // Wrap the local method in an init function to be exported
    const init = function() {
        appendSongToDOM();
    }

    return {
        init: init
    };
}();

export default holidaySongs;