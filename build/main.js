const https = require('https');
const fs = require('fs');
const path = require('path');
function getICS(URL) {
    https.get(URL, (res) => {
        const fileHandler = fs.createWriteStream("../data/Download.ICS");
        res.pipe(fileHandler);
        fileHandler.on('finish', () => {
            fileHandler.close();
        });
        // TODO add response code based error handling
    });
}
// -----------------
// Download ICS file
// -----------------
const keys = fs.readFile('../private_keys.json', 'utf8', (err, data) => {
    const keys = JSON.parse(data);
    return keys;
});
getICS(keys.IcsURL);
//# sourceMappingURL=main.js.map