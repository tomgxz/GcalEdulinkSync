const ical = require('node-ical');
const fs = require('fs');

// -----------------
// Download ICS file
// -----------------
const keys: Object = JSON.parse(fs.readFileSync('../data/private_keys.json', 'utf8'));

// getICS(keys.IcsURL)

// --------------
// ICS formatting
// --------------

const nameLookup: Object = JSON.parse(fs.readFileSync('../data/lesson_alias.json', 'utf8'));

const events = ical.sync.parseFile('../data/Download.ICS');

for (const event of Object.values(events)) {
    var lessonName: string = (event as { summary: string }).summary
    var lessonLocation: string = (event as { location: string }).location

    var newName: string = "";

    if (lessonName in nameLookup) {
        newName = nameLookup[lessonName]
    } else {
        newName = lessonName
    }

    if (lessonLocation == "Unknown") {
        newName += " 10th"
    }

    console.log(newName)
};