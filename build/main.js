"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ical = require('ical');
const fs = require('fs');
const getICS_1 = require("./getICS");
const IcsFormatting_1 = require("./IcsFormatting");
const SharedFrees_1 = require("./SharedFrees");
const { google } = require('googleapis');
// -----------------
// Download ICS file
// -----------------
const keys = JSON.parse(fs.readFileSync('data/private_keys.json', 'utf8'));
(0, getICS_1.getICS)(keys.IcsURL, "Deafult");
const secondaryEvents = [];
for (let key in keys.SecondaryIcsURLs) {
    const name = key.toString();
    const URL = keys.SecondaryIcsURLs[key];
    (0, getICS_1.getICS)(URL, name);
    secondaryEvents.push(ical.parseFile(`data/${name}Calendar.ics`));
}
// --------------
// ICS formatting
// --------------
const [events, LessonTimes] = (0, IcsFormatting_1.IcsFormat)();
// ---------------------------
// Add in shared frees / 10ths
// ---------------------------
(0, SharedFrees_1.addSharedFrees)(events, keys, secondaryEvents, LessonTimes);
// -------------
// Write to GCAL
// -------------
// authorize().then(async (auth) => {
//     const existingData = await listEvents(auth, keys);
//     createCalendarEvent(auth, events, existingData, keys);
// }).catch(console.error);
// console.log(events)
//# sourceMappingURL=main.js.map