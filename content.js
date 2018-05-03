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
        } else if (request.action == "newClassNoSave") {
            setClass(sharedData);
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