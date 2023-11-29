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
                    if (events[i].start == SecondaryEvent.start) {
                        mainHasLesson = true;
                        if ("10th" in events[i].summary) {
                            // Pass
                        }
                        else {
                            mainHasLesson = true;
                        }
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
                        console.log(mainHasLesson);
                        // if (!mainHasLesson) {
                        //     let lessonNameArray:Array<string> = (SecondaryEvent as any).summary.split(" ")
                        //     let lessonNameString: string = lessonNameArray.slice(0, -1).join().replace(",", " ");
                        //     events[SecondaryEvent.uid] = {
                        //         "summary": `${name} ${lessonNameString} 10th`,
                        //         "start": (SecondaryEvent as any).start,
                        //         "end": (SecondaryEvent as any).end,
                        //         "colorId": 3
                        //     }
                        // }
                    }
                }
            }
            //TODO - Check frees
        }
    }
}
exports.addSharedFrees = addSharedFrees;
//# sourceMappingURL=SharedFrees.js.map