function addSharedFrees(events, keys, secondaryEvents:Array<object>, LessonTimes) {
    
    for (let CalendarIndex = 0; CalendarIndex < secondaryEvents.length; CalendarIndex++) {
        for (const SecondaryEvent of Object.values(secondaryEvents[CalendarIndex])) {
    
            let name = Object.keys(keys.SecondaryIcsURLs)[CalendarIndex];  
    
            //Check 10th
            if (SecondaryEvent.location === 'Unknown') {
                
                // ----------------------------------
                // Check if main profile has a lesson
                // ----------------------------------
    
                let mainHasLesson: boolean = false;
                for(let i in (events as object)) {
    
                    console.log(events[i].summary)
                    
                    if (events[i].start == SecondaryEvent.Start) {
                        mainHasLesson = true
                    }
    
                }
    
                console.log(mainHasLesson)
    
                // ---------------------------
                // Add shared 10th to calendar
                // ---------------------------
             
                for(let i = 0; i < LessonTimes.length; i++) {
    
                    if (SecondaryEvent.start.toISOString() == LessonTimes[i].toISOString()) {
                        //Pass
                    } else {
    
                        let lessonNameArray:Array<string> = (SecondaryEvent as any).summary.split(" ")
    
                        let lessonNameString: string = lessonNameArray.slice(0, -1).join().replace(",", " ");
    
                        events[SecondaryEvent.uid] = {
                            "summary": `${name} ${lessonNameString} 10th`,
                            "start": (SecondaryEvent as any).start,
                            "end": (SecondaryEvent as any).end,
                            "colorId": 3
                        }
        
                    }
    
                }
    
            } 
    
            //TODO - Check frees
        }
    }
}

export {addSharedFrees};