const ical = require('ical');
const fs = require('fs');
import { getICS } from "./getICS";
import { authorize } from "./GcalHandler";
import { calendar } from "googleapis/build/src/apis/calendar";
import { auth } from "google-auth-library";
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

async function createCalendarEvent(auth, data, existingData) {

    for (let key in data) {
        
        const startTime: Date = new Date(data[key].start);
        const endTime: Date = new Date(data[key].end);    
        
        var timeMatch: boolean = false
        var matchListPos = 0;

        for (let i = 0; i < existingData[0].length; i++) {

            if (existingData[0][i].slice(0, -1) == startTime.toISOString().slice(0, -5)) {

                timeMatch = true;
                matchListPos = i

            }

        }

        if (timeMatch) {

            if(data[key].summary == existingData[1][matchListPos]) {
                
                console.log("Skipped event")
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
    
        google.calendar({ version: 'v3', auth }).events.insert({
            calendarId: keys.calendarID,
            resource: event,
        });

        console.log(`Created event ${event}`)

        await delay(100) //Avoid rate limiting (10 requests per second)
    }

};

// authorize().then((auth) => createCalendarEvent(auth, events)).catch(console.error);

// Get a list of all the current events in the google calendar
async function listEvents(auth) {

    const calendar = google.calendar({ version: 'v3', auth });

    const eventTimes = []
    const eventNames = []

    const res = await calendar.events.list({
        calendarId: keys.calendarID,
        timeMin: (new Date()).toISOString(),
        maxResults: 50,
        singleEvents: true,
        orderBy: 'startTime',
    });
    
    const events = res.data.items;

    events.forEach((event) => {
        const start:Date = event.start.dateTime || event.start.date;
        eventTimes.push(start)
        eventNames.push(event.summary)
    });
    return [eventTimes, eventNames]
}

authorize().then(async (auth) => {
    const existingData = await listEvents(auth);
    createCalendarEvent(auth, events, existingData);
}).catch(console.error);
