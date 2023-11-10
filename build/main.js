"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ical = require('ical');
const fs = require('fs');
const getICS_1 = require("./getICS");
// -----------------
// Download ICS file
// -----------------
const keys = JSON.parse(fs.readFileSync('data/private_keys.json', 'utf8'));
(0, getICS_1.getICS)(keys.IcsURL);
// --------------
// ICS formatting
// --------------
const nameLookup = JSON.parse(fs.readFileSync('data/lesson_alias.json', 'utf8'));
const events = ical.parseFile('data/Download.ICS');
for (const event of Object.values(events)) {
    const lessonName = event.summary;
    const lessonLocation = event.location || 'Unknown';
    let newName = '';
    newName = nameLookup[lessonName] || lessonName;
    if (lessonLocation === 'Unknown') {
        newName += ' 10th';
    }
    event.summary = newName;
}
// ------------
// Save to file
// ------------
console.log(events);
// authorize().then().catch(console.error);
//# sourceMappingURL=main.js.map