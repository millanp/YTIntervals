/*
WORKFLOW: 
1. User clicks the extension icon to activate the listeners
2. User enters Ctrl-Q, then types in the class name
3. User clicks to a frame, hits tilde to download, continues on until entire pass is done
4. Repeat steps 2-3
*/

var sharedData = {
    videoElem: document.querySelector('video'),
    framesPerJump: 1,
    secondsPerFrame: null,
    intervals: [] // a list of objects in the form {startTime: int, endTime: int}
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "start") {
            console.log("start me up");
            // enableFrameJumping(sharedData);
            enableClassTracking(sharedData, function(responseFromClassChange) {
                console.log(responseFromClassChange.intervals);
                sharedData.intervals = responseFromClassChange.intervals;
                newIntervalClass(sharedData);
            });
            enableIntervalSelection(sharedData, Colors);
            enableDownloadHotkey(sharedData, function() {
                if (sharedData.intervals.length > 0)
                    sharedData.intervals[sharedData.intervals.length - 1].active = false;
            });
        } else if (request.action == "stop") {
            window.location.reload();
        }
    }
);

class Interval {
    constructor(startTime, endTime, active = false) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.active = active;
    }
}