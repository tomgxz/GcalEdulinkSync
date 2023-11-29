const ical = require('ical');
const fs = require('fs');

function IcsFormat() {
    const nameLookup = JSON.parse(fs.readFileSync('data/lesson_alias.json', 'utf8'));

    const events = ical.parseFile('data/DeafultCalendar.ics');
    const LessonTimes = [];

    for (const event of Object.values(events)) {
        const lessonName: string = (event as any).summary;
        const lessonLocation: string = (event as any).location || 'Unknown';
        const lessonTime: string = (event as any).start;

        let newName: string = '';

        newName = nameLookup[lessonName].name || lessonName;

        if (lessonLocation === 'Unknown') {
            newName += ' 10th';
        };

        LessonTimes.push(lessonTime);

        (event as any).summary = newName;
    }

    return [events, LessonTimes]
}

export {IcsFormat};