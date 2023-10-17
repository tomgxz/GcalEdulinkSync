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
