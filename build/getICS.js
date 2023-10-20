"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getICS = void 0;
const https = require('https');
const fs = require('fs');
const path = require('path');
function getICS(URL) {
    https.get(URL, (res) => {
        const fileHandler = fs.createWriteStream("data/Download.ICS");
        res.pipe(fileHandler);
        fileHandler.on('finish', () => {
            fileHandler.close();
        });
        // TODO add response code based error handling
    });
}
exports.getICS = getICS;
//# sourceMappingURL=getICS.js.map