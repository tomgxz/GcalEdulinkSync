"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcsFormat = void 0;
const ical = require('ical');
const fs = require('fs');
function IcsFormat() {
    const nameLookup = JSON.parse(fs.readFileSync('data/lesson_alias.json', 'utf8'));
    const events = ical.parseFile('data/DeafultCalendar.ics');
    const LessonTimes = [];
    for (const event of Object.values(events)) {
        const lessonName = event.summary;
        const lessonLocation = event.location || 'Unknown';
        const lessonTime = event.start;
        let newName = '';
        newName = nameLookup[lessonName].name || lessonName;
        if (lessonLocation === 'Unknown') {
            newName += ' 10th';
        }
        ;
        LessonTimes.push(lessonTime);
        event.summary = newName;
    }
    return [events, LessonTimes];
}
exports.IcsFormat = IcsFormat;
//# sourceMappingURL=IcsFormatting.js.map