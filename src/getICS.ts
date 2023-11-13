const https = require('https');
const fs = require('fs');

function getICS(URL: string, Name:String): void {
    
    https.get(URL, (res) => {

        const fileHandler = fs.createWriteStream(`data/${Name}Calendar.ICS`);
        res.pipe(fileHandler);

        fileHandler.on('finish', () => {
            fileHandler.close();
        }); 

        // TODO add response code based error handling

    })
}

export{getICS};