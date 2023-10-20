const ical = require('ical');
const fs = require('fs');
import { getICS } from "./getICS";

// -----------------
// Download ICS file
// -----------------

const keys: { IcsURL: string } = JSON.parse(fs.readFileSync('data/private_keys.json', 'utf8'));

getICS(keys.IcsURL)

// --------------
// ICS formatting
// --------------

const nameLookup: Record<string, string> = JSON.parse(fs.readFileSync('data/lesson_alias.json', 'utf8'));

const events = ical.parseFile('data/Download.ICS');

for (const event of Object.values(events)) {
    const lessonName: string = (event as any).summary;
    const lessonLocation: string = (event as any).location || 'Unknown';

    let newName: string = '';

    newName = nameLookup[lessonName] || lessonName;

    if (lessonLocation === 'Unknown') {
        newName += ' 10th';
    }

    (event as any).summary = newName;
}

// ------------
// Save to file
// ------------

console.log(events)

// Update file with new names


