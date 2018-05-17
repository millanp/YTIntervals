var defaultOnClassChanged = function(responseFromClassChange) {
    console.log(responseFromClassChange.intervals);
    sharedData.intervals = responseFromClassChange.intervals;
    newIntervalClass(sharedData);
}

function enableClassTracking(sharedData, onClassChanged) {

    setClass(sharedData, onClassChanged);
    $(document).keydown(function(e) {
        if (e.which === 81 && e.ctrlKey) {
            // Ctrl+q was pressed
            setClass(sharedData, onClassChanged);
        }
    });
}

function setClass(sharedData, onClassChanged = defaultOnClassChanged) {
    var nextClass = prompt("Next segment name:");
    if (nextClass) {
        chrome.runtime.sendMessage({ action: "setClass", class: nextClass, prevIntervals: sharedData.intervals }, onClassChanged);
    }
}