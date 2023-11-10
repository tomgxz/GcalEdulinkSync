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
const GcalHandler_1 = require("./GcalHandler");
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
    newName = nameLookup[lessonName].name || lessonName;
    if (lessonLocation === 'Unknown') {
        newName += ' 10th';
    }
    event.summary = newName;
}
// -------------
// Write to GCAL
// -------------
// Wait function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function createCalendarEvent(auth, data, existingData) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let key in data) {
            const startTime = new Date(data[key].start);
            const endTime = new Date(data[key].end);
            var timeMatch = false;
            var matchListPos = 0;
            for (let i = 0; i < existingData[0].length; i++) {
                if (existingData[0][i].slice(0, -1) == startTime.toISOString().slice(0, -5)) {
                    timeMatch = true;
                    matchListPos = i;
                }
            }
            if (timeMatch) {
                if (data[key].summary == existingData[1][matchListPos]) {
                    console.log("Skipped event");
                    continue;
                }
            }
            const event = {
                summary: data[key].summary,
                location: data[key].location,
                start: {
                    dateTime: startTime.toISOString(),
                    timeZone: 'GMT', // Set your desired time zone
                },
                end: {
                    dateTime: endTime.toISOString(),
                    timeZone: 'GMT',
                },
            };
            // google.calendar({ version: 'v3', auth }).events.insert({
            //     calendarId: keys.calendarID,
            //     resource: event,
            // });
            console.log(`Created event ${event}`);
            yield delay(100); //Avoid rate limiting (10 requests per second)
        }
    });
}
;
// authorize().then((auth) => createCalendarEvent(auth, events)).catch(console.error);
// Get a list of all the current events in the google calendar
function listEvents(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        const calendar = google.calendar({ version: 'v3', auth });
        const eventTimes = [];
        const eventNames = [];
        const res = yield calendar.events.list({
            calendarId: keys.calendarID,
            timeMin: (new Date()).toISOString(),
            maxResults: 50,
            singleEvents: true,
            orderBy: 'startTime',
        });
        const events = res.data.items;
        events.forEach((event) => {
            const start = event.start.dateTime || event.start.date;
            eventTimes.push(start);
            eventNames.push(event.summary);
        });
        return [eventTimes, eventNames];
    });
}
(0, GcalHandler_1.authorize)().then((auth) => __awaiter(void 0, void 0, void 0, function* () {
    const existingData = yield listEvents(auth);
    createCalendarEvent(auth, events, existingData);
})).catch(console.error);
//# sourceMappingURL=main.js.map