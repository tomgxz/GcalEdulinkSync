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
exports.listEvents = exports.createCalendarEvent = void 0;
const { google } = require('googleapis');
// Wait function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function createCalendarEvent(auth, data, existingData, keys) {
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
                    console.log(`Skipped event ${data[key].summary}`);
                    continue;
                }
            }
            const event = {
                summary: data[key].summary,
                location: data[key].location,
                start: {
                    dateTime: startTime.toISOString(),
                    timeZone: 'GMT',
                },
                end: {
                    dateTime: endTime.toISOString(),
                    timeZone: 'GMT',
                },
            };
            google.calendar({ version: 'v3', auth }).events.insert({
                calendarId: keys.calendarID,
                resource: event,
            });
            console.log(`Created event ${event.summary}`);
            yield delay(100); //Avoid rate limiting (10 requests per second)
        }
    });
}
exports.createCalendarEvent = createCalendarEvent;
;
// Get a list of all the current events in the google calendar
function listEvents(auth, keys, oldestEvent) {
    return __awaiter(this, void 0, void 0, function* () {
        const calendar = google.calendar({ version: 'v3', auth });
        const eventTimes = [];
        const eventNames = [];
        const res = yield calendar.events.list({
            calendarId: keys.calendarID,
            timeMin: oldestEvent,
            maxResults: 512,
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
exports.listEvents = listEvents;
//# sourceMappingURL=GcalFunctions.js.map