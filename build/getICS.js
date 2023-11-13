"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getICS = void 0;
const https = require('https');
const fs = require('fs');
function getICS(URL, Name) {
    https.get(URL, (res) => {
        const fileHandler = fs.createWriteStream(`data/${Name}Calendar.ICS`);
        res.pipe(fileHandler);
        fileHandler.on('finish', () => {
            fileHandler.close();
        });
        // TODO add response code based error handling
    });
}
exports.getICS = getICS;
//# sourceMappingURL=getICS.js.map