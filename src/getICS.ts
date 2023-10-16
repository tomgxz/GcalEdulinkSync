const https = require('https');
const fs = require('fs');
const path = require('path');

function getICS(URL: string): void {
    
    https.get(URL, (res) => {

        const fileHandler = fs.createWriteStream("../data/Download.ICS");
        res.pipe(fileHandler);

        fileHandler.on('finish', () => {
            fileHandler.close();
        }); 

        // TODO add response code based error handling

    })
}

getICS("https://www.edulinkone.com/api/iCalendar/?type=timetable&identifier=W-noS9GOiKuSjDKV8wTeq00AbqTp6VT0S04wRbt7EpmluvlloSWR7Jo7X5eSXHetsFcfJBRaRefb45u6r_9C7PGuBR9OGuvffCztXVAUnD-ugQroP0ZNrwG9mN8KOLpT5nuTGg")