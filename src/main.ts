const ical = require('ical');
const fs = require('fs');
import { getICS } from "./getICS";
import { authorize } from "./GcalHandler";
const {google} = require('googleapis');

// -----------------
// Download ICS file
// -----------------

const keys: { IcsURL: string, calendarID: string } = JSON.parse(fs.readFileSync('data/private_keys.json', 'utf8'));

getICS(keys.IcsURL)

// --------------
// ICS formatting
// --------------

const nameLookup = JSON.parse(fs.readFileSync('data/lesson_alias.json', 'utf8'));

const events = ical.parseFile('data/Download.ICS');

for (const event of Object.values(events)) {
    const lessonName: string = (event as any).summary;
    const lessonLocation: string = (event as any).location || 'Unknown';

    let newName: string = '';

    newName = nameLookup[lessonName].name || lessonName;

    if (lessonLocation === 'Unknown') {
        newName += ' 10th';
    } 

    (event as any).summary = newName;
}

// -------------
// Write to GCAL
// -------------

// Wait function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function createCalendarEvent(auth, data) {

    for (let key in data) {
      
        const startTime = new Date(data[key].start);
        const endTime = new Date(data[key].end);
    
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
    
        google.calendar({ version: 'v3', auth }).events.insert({
            calendarId: keys.calendarID,
            resource: event,
        });

        await delay(100) //Avoid rate limiting (10 requests per second)
    }

};

authorize().then((auth) => createCalendarEvent(auth, events)).catch(console.error);