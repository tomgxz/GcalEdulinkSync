"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSharedFrees = void 0;
function addSharedFrees(events, keys, secondaryEvents, LessonTimes) {
    for (let CalendarIndex = 0; CalendarIndex < secondaryEvents.length; CalendarIndex++) {
        for (const SecondaryEvent of Object.values(secondaryEvents[CalendarIndex])) {
            let name = Object.keys(keys.SecondaryIcsURLs)[CalendarIndex];
            //Check 10th
            if (SecondaryEvent.location === 'Unknown') {
                // ----------------------------------
                // Check if main profile has a lesson
                // ----------------------------------
                let mainHasLesson = false;
                for (let i in events) {
                    console.log(events[i].summary);
                    if (events[i].start == SecondaryEvent.Start) {
                        mainHasLesson = true;
                    }
                }
                console.log(mainHasLesson);
                // ---------------------------
                // Add shared 10th to calendar
                // ---------------------------
                for (let i = 0; i < LessonTimes.length; i++) {
                    if (SecondaryEvent.start.toISOString() == LessonTimes[i].toISOString()) {
                        //Pass
                    }
                    else {
                        let lessonNameArray = SecondaryEvent.summary.split(" ");
                        let lessonNameString = lessonNameArray.slice(0, -1).join().replace(",", " ");
                        events[SecondaryEvent.uid] = {
                            "summary": `${name} ${lessonNameString} 10th`,
                            "start": SecondaryEvent.start,
                            "end": SecondaryEvent.end,
                            "colorId": 3
                        };
                    }
                }
            }
            //TODO - Check frees
        }
    }
}
exports.addSharedFrees = addSharedFrees;
//# sourceMappingURL=SharedFrees.js.map