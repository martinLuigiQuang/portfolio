import calendarInformation from '../calendarModule/calendarInformation.js';

const stories = function() {
    const [,, today] = calendarInformation.exportConstants();

    const gis = {
        milestone: '',
        story: '',
        activity: 'Participating in OpenStreetMap projects as a Canadian Red Cross volunteer',
    };
    
    const coursera = {
        milestone: new Date(2020, 2, 16),
        story: 'When the pandemic forced the city to close down, I devoted myself to studying computer science and programming. I started and finished a course on Algorithms taught in Java by Stanford University on Coursera. My journey to technology, thus, began with Java.',
        activity: 'Learning computational algorithms and their implementations in Java'
    };
    
    const juno = {
        milestone: new Date(2020, 5, 8),
        story: 'Teaching oneself programming is a lonely process, especially for a new resident in Canada like myself. By this time I was looking for career bootcamps, and Juno with a dedicated career success team was easily the best option out there for me. I participated in their accelerated JavaScript course, which inspired me to go further.',
        activity1: 'Attending accelerated JavaScript course at <a href="https://junocollege.com/" target="_blank">Juno College of Technology</a>',
        activity2: 'Attending immersive web development bootcamp at <a href="https://junocollege.com/" target="_blank">Juno College of Technology</a>'
    };
    
    const crc = {
        milestone: new Date(2020, 6, 1),
        story: 'Attending bootcamp was not without financial hurdles. I was very fortunate to be referred and offered a position as an emergency responder at Canadian Red Cross. Not only was I able to save up for bootcamp, being a responder also taught me a lot about Canada and the people who live here.',
        activity: 'Aiding Canadian Red Cross (CRC) response to Covid-19 pandemic as well as natural and personal disasters'
    };
    
    const bootcamp = {
        milestone: new Date(2020, 9, 19),
        story: 'Though I had to delay it, I never regretted my decision to attend the Juno bootcamp. Throughout the 9 weeks of bootcamp, I went from having a vague idea about web accessibility to developing a full-blown React application with multi-lingual user interface, autocompletion of searches, and pagination of results in 7 days.',
    };
    
    const afterBootcamp = {
        milestone: new Date(2020, 11, 18),
        story: 'It was hard juggling a full-time course and a full-time job plus volunteering every Thursday. Looking back now, all those late nights were worth it. The journey forward is long, but not everyone could claim being able to support First Nation communities affected by Covid, while writing an online application for their mother to monitor her heart. Thank you Juno and CRC for making those happen.'
    };

    const now = {
        milestone: new Date(2021, 0, 1),
        story: 'My New Year\'s Eve was split between coding and aiding CRC Covid-19 response. My newest <a href="https://luigi-codes.medium.com/the-many-faces-of-a-calendar-part-2-a7e9143d3cf6" target="_blank">Medium article</a> hit 409 views on LinkedIn after 3 days. On the first Monday January 4, 2021, I will start applying to jobs in tech companies. I still can\'t believe I am saying this. My emotions right now are mixture of pride in what I have achieved, humbleness in what I still have to learn, excitement to start a new journey, and gratefulness for everyone who has helped and been with me throughout my journey to becoming a developer.'
    }

    function getStories() {
        return [gis, coursera, juno, crc, bootcamp, afterBootcamp, now];
    };

    return {
        getStories: getStories
    };
}();

export default stories;