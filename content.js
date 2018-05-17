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
        } else if (request.action == "newClass") {
            setClass(sharedData);
        } else if (request.action == "setMasterIntervals") {
            var fileChooser = document.createElement('input');
            fileChooser.type = 'file';
            fileChooser.onchange = function() {
                var file = fileChooser.files[0];
                // process file
                var fileReader = new FileReader();
                fileReader.onload = function(event) {
                    var masterIntervals = JSON.parse(event.target.result);
                    chrome.runtime.sendMessage({ action: "setMasterIntervalsJSON", JSONData: masterIntervals }, function(response) {
                        if (request.isActive)
                            setClass(sharedData);
                    });
                }
                fileReader.readAsText(file);
            }
            console.log('hi');
            fileChooser.click();
            console.log('hoo');
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