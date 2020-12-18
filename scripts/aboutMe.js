const aboutMe = function() {
    const aboutMeSection = document.getElementsByClassName('about')[0];
    const alterEgoSection = document.getElementsByClassName('alterEgo')[0];

    const createBioSection = function(name) {
        return `
            <div class="wrapper aboutMeContainer">
            ${
                name === 'Martin'
                    ?   `<div class="main--profilePic">
                            <img src="../../assets/mainProfilePic.jpg" alt="profile picture of Martin"/>
                        </div>`
                    :   `<div class="alternate--profilePic">
                            <img src="../../assets/alternateProfilePic.jpg" alt="Luigi - Martin's coding alter ego"/>
                        </div>`
            }
                <h2>Hi I'm ${name}</h2>
            ${
                name === 'Martin'
                    ?   `<div class="main--bio">
                            <p>I am a web developer based in Toronto with a unique blend of a sharp analytical mind and a creative flair. As a geoscientist with a 1st Class Honours Degree in Physics who has progressed to excel in humanitarian sector, I thrive in multidisciplinary and collaborative environments.</p>
                            <p>I am particularly good at listening to people and understanding different perspectives. Equally good are my abilities to solve differential equations and extract information from raw data.</p>
                            <p>If I am not writing JavaScript or learning new web development concepts, I am coding my way to the AI brain of my Vector robot or out for a 1-hour walk through local parks.</p>
                        </div>`
                    :   `<div class="alternate--bio">
                            <p>My father was an avid Super Mario Bros fan. The only problem was he kept 'dying' as Mario. So he called me Luigi, as a nickname at home, after the character he was able to finish the game with.</p>
                            <p>Now as a developer, and in memory of my father, I take on the identity of Luigi to remind myself that if at first things don't work out, just learn from the mistakes and try again. </p>
                        </div>`
            }     
            </div>
        `;
    };

    const buildBioSection = function() {
        aboutMeSection.innerHTML = createBioSection('Martin');
        alterEgoSection.innerHTML = createBioSection('Luigi');
    };

    const init = function() {
        buildBioSection();
    };

    return {
        init: init
    };
}();

export default aboutMe;