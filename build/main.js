"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ical = require('ical');
const fs = require('fs');
const getICS_1 = require("./getICS");
const GcalHandler_1 = require("./GcalHandler");
const GcalFunctions_1 = require("./GcalFunctions");
const IcsFormatting_1 = require("./IcsFormatting");
const SharedFrees_1 = require("./SharedFrees");
const { google } = require('googleapis');
// -----------------
// Download ICS file
// -----------------
const keys = JSON.parse(fs.readFileSync('data/private_keys.json', 'utf8'));
(0, getICS_1.getICS)(keys.IcsURL, "Deafult");
const secondaryEvents = [];
for (let key in keys.SecondaryIcsURLs) {
    const name = key.toString();
    const URL = keys.SecondaryIcsURLs[key];
    (0, getICS_1.getICS)(URL, name);
    secondaryEvents.push(ical.parseFile(`data/${name}Calendar.ics`));
}
// --------------
// ICS formatting
// --------------
const [events, LessonTimes] = (0, IcsFormatting_1.IcsFormat)();
// ---------------------------
// Add in shared frees / 10ths
// ---------------------------
(0, SharedFrees_1.addSharedFrees)(events, keys, secondaryEvents, LessonTimes);
// -------------
// Write to GCAL
// -------------
(0, GcalHandler_1.authorize)().then((auth) => __awaiter(void 0, void 0, void 0, function* () {
    const existingData = yield (0, GcalFunctions_1.listEvents)(auth, keys);
    (0, GcalFunctions_1.createCalendarEvent)(auth, events, existingData, keys);
})).catch(console.error);
// console.log(events)
//# sourceMappingURL=main.js.map