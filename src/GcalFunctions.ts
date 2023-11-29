const {google} = require('googleapis');

// Wait function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function createCalendarEvent(auth, data, existingData, keys) {

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
                
                console.log(`Skipped event ${data[key].summary}`)
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

        console.log(`Created event ${event.summary}`)

        await delay(100) //Avoid rate limiting (10 requests per second)
    }

};

// Get a list of all the current events in the google calendar
async function listEvents(auth, keys) {

    const calendar = google.calendar({ version: 'v3', auth });

    const eventTimes = []
    const eventNames = []

    const res = await calendar.events.list({
        calendarId: keys.calendarID,
        timeMin: (new Date()).toISOString(),
        maxResults: 512,
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

export {createCalendarEvent, listEvents};