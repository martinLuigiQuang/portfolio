import calendarInformation from '../calendarModule/calendarInformation.js';
import stories from './stories.js';

const markedDates = function() {
    const redCrossStartDate = new Date(2020, 5, 27); // June 27th, 2020: started working as an emergency responder at Canadian Red Cross (CRC)
    const currentDate = new Date(); // currently working at CRC
    const junoJSCourseStartDate = new Date(2020, 5, 8); // June 8th, 2020: started JavaScript accelerated course with Juno College of Technology
    const junoJSCourseEndDate =  new Date(2020, 5, 19); // June 19th, 2020: ended JavaScript course
    const junoBootcampStartDate = new Date(2020, 9, 19); // October 19th, 2020: started immersive web development bootcamp with Juno
    const junoBootcampEndDate = new Date(2020, 11, 18); // December 18th, 2020: ended immersive web development bootcamp with Juno
    const gisStartDate = new Date(2019, 9, 3); // October 1st, 2019: started volunteering as a mapper at Canadian Red Cross
    const courseraAlgoIStartDate = new Date(2020, 2, 16); // March 16th, 2020: started Algorithms Part I course on Coursera
    const courseraAlgoIEndDate = new Date(2020, 3, 20); // April 20th, 2020: ended Algorithms Part I course on Coursera
    const courseraAlgoIIStartDate = new Date(2020, 3, 27); // April 27th, 2020: started Algorithms Part II course on Coursera
    const courseraAlgoIIEndDate = new Date(2020, 4, 11); // May 11th, 2020: paused Algorothms Part II course on Coursera
    
    function getDateList(start, end, frequency, exceptions) {
        let duration = Math.floor((end - start)/(24*3600*1000)) + 1;
        let dateList = [];
        for (let i = 0; i < duration; i += frequency) {
            const nextDay = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
            if (!exceptions.includes(nextDay.getDay())) {
                dateList.push(nextDay);
            }
        }
        return dateList;
    }

    const crcResponderDates = getDateList(redCrossStartDate, currentDate, 1, [4, 5]); // [4, 5] exceptions for days off on Thursday and Friday
    const gisVolunteerDates = getDateList(gisStartDate, currentDate, 7, []); // frequency 7 for once a week; [] for no exceptions
    const junoJSCourseDates = getDateList(junoJSCourseStartDate, junoJSCourseEndDate, 1, [0, 6]); // [0, 6] exceptions for the weekends off
    const junoBootcampDates = getDateList(junoBootcampStartDate, junoBootcampEndDate, 1, [0, 6]);
    const courseraAlgoIDates = getDateList(courseraAlgoIStartDate, courseraAlgoIEndDate, 1, []);
    const courseraAlgoIIDates = getDateList(courseraAlgoIIStartDate, courseraAlgoIIEndDate, 1, []);

    const markedDates = crcResponderDates
                    .concat(gisVolunteerDates)
                    .concat(junoJSCourseDates)
                    .concat(junoBootcampDates)
                    .concat(courseraAlgoIDates)
                    .concat(courseraAlgoIIDates);

    const classNames = crcResponderDates.map(() => 'crc')
                        .concat(gisVolunteerDates.map(() => 'gis'))
                        .concat(junoJSCourseDates.map(() => 'juno'))
                        .concat(junoBootcampDates.map(() => 'juno'))
                        .concat(courseraAlgoIDates.map(() => 'coursera'))
                        .concat(courseraAlgoIIDates.map(() => 'coursera'));

    function markDates(dayDisplay) {
        const [,, calendarYear, calendarMonth] = calendarInformation.setInformation();
        markedDates.forEach((date, index) => {
            let matched = date.getFullYear() === calendarYear && date.getMonth() === calendarMonth;
            if (dayDisplay.value) {
                matched = matched && date.getDate() === parseInt(dayDisplay.value);
                if (matched) {
                    dayDisplay.classList.add(classNames[index]);
                    const symbol = document.createElement('div');
                    symbol.classList.add(`symbolContainer--${classNames[index]}`);
                    dayDisplay.appendChild(symbol);
                };
            };
        });
    };

    return{
        markDates: markDates
    };

}();

export default markedDates;
