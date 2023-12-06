const ical = require('ical');
const fs = require('fs');
import { getICS, getOldICALtimestamp } from "./getICS";
import { authorize } from "./GcalHandler";
import { createCalendarEvent, listEvents } from "./GcalFunctions";
import { IcsFormat } from "./IcsFormatting";
import { addSharedFrees } from "./SharedFrees";
const {google} = require('googleapis');

// -----------------
// Download ICS file
// -----------------

const keys: { IcsURL: string, calendarID: string, SecondaryIcsURLs: object } = JSON.parse(fs.readFileSync('data/private_keys.json', 'utf8'));

getICS(keys.IcsURL, "Deafult")
const secondaryEvents:Array<object> = [];

for (let key in keys.SecondaryIcsURLs) {
    const name:string = key.toString();
    const URL: string = keys.SecondaryIcsURLs[key];
    getICS(URL, name)

    secondaryEvents.push(ical.parseFile(`data/${name}Calendar.ics`));

}

// --------------
// ICS formatting
// --------------

const [events, LessonTimes] = IcsFormat()

// ---------------------------
// Add in shared frees / 10ths
// ---------------------------

addSharedFrees(events, keys, secondaryEvents, LessonTimes);

// ---------------------
// Get oldest ICAL event
// ---------------------

let oldestEvent:string = getOldICALtimestamp(events)

// -------------
// Write to GCAL
// -------------

authorize().then(async (auth) => {
    const existingData = await listEvents(auth, keys, oldestEvent);
    createCalendarEvent(auth, events, existingData, keys);
}).catch(console.error);

// console.log(events);