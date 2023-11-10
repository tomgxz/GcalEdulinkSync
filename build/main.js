"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ical = require('ical');
const fs = require('fs');
const getICS_1 = require("./getICS");
const { google } = require('googleapis');
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
// -------------
// Write to GCAL
// -------------
function createCalendarEvent(auth, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = {
            summary: data.summary,
            start: data.start,
            end: data.end
        };
        const response = yield google.calendar({ version: 'v3', auth }).events.insert({
            calendarId: 'primary',
            resource: event,
        });
    });
}
for (let key in events) {
    console.log("NEW");
    console.log(events[key]);
    // const auth = authorize()
    // createCalendarEvent(auth, events)
}
//# sourceMappingURL=main.js.map