const aboutMe = function() {
    const aboutMeSection = document.getElementsByClassName('about')[0];

    const createAboutMeSection = function(name) {
        return `
            <div class="wrapper aboutMeContainer">
                <div class="main--profilePic">
                    <img src="../../assets/mainProfilePic.jpg" alt="profile picture of Martin"/>
                    <div class="alternate--profilePic">
                        <img src="../../assets/alternateProfilePic.jpg" alt="Luigi - Martin's coding alter ego"/>
                    </div>
                </div>
                <h2>Hi I'm ${name}</h2>
                <div class="main--bio">
                    <p>I am a web developer based in Toronto with a unique blend of a sharp analytical mind and a creative flair. As a geoscientist with a 1st Class Honours Degree in Physics who has progressed to excel in humanitarian sector, I thrive in multidisciplinary and collaborative environments.</p>
                    <p>I am particularly good at listening to people and understanding different perspectives. Equally good are my abilities to solve differential equations and extract information from raw data.</p>
                    <p>If I am not writing JavaScript or learning new web development concepts, I am coding my way to the AI brain of my Vector robot or out for a 1-hour walk through local parks.</p>
                </div>
                <div class="alternate--bio">
                    <p>My father was an avid Super Mario Bros fan. The only problem was he kept 'dying' as Mario. So he called me Luigi, as a nickname at home, after the character he was able to finish the game with.</p>
                    <p>Now as a developer, and in memory of my father, I take on the identity of Luigi to remind myself that if at first things don't work out, just learn from the mistakes and try again. </p>
                </div>
            </div>
        `;
    };

    const buildAboutMeSection = function() {
        let stickySum = 0;
        let newOpacity = 0;
        const handleScroll = function(event) {
            console.log(stickySum)
            stickySum += event.deltaY;
            if (stickySum < 0) {
                stickySum = 0;
            } else if (stickySum > window.innerHeight && stickySum < 4 * window.innerHeight) {
                window.scrollTo(0, window.innerHeight);
                if (stickySum > 2*innerHeight) {
                    newOpacity = 0.8*(stickySum - 2 * window.innerHeight) / window.innerHeight; 
                    if(newOpacity > 1) {
                        newOpacity = 1;
                    } else if (newOpacity < 0) {
                        newOpacity = 0;
                    };
                    alternateProfilePic.style.opacity = `${newOpacity}`;
                    alternateBio.style.display = 'flex';
                    mainBio.style.display = 'none';
                }
            } else if (stickySum > document.body.offsetHeight) {
                stickySum = document.body.offsetHeight
            }
        };
        aboutMeSection.innerHTML = createAboutMeSection('Martin');
        const alternateProfilePic = aboutMeSection.getElementsByClassName('alternate--profilePic')[0];
        const alternateBio = aboutMeSection.getElementsByClassName('alternate--bio')[0];
        const mainBio = aboutMeSection.getElementsByClassName('main--bio')[0];
        document.body.onwheel = (event) => handleScroll(event);
    };

    const init = function() {
        buildAboutMeSection();
    };

    return {
        init: init
    };
}();

export default aboutMe;