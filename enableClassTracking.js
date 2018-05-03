function enableClassTracking(sharedData, onClassChanged) {

    setClass(sharedData, onClassChanged);
    $(document).keydown(function(e) {
        if (e.which === 81 && e.ctrlKey) {
            // Ctrl+q was pressed
            setClass();
        }
    });
}

function setClass(sharedData, onClassChanged = function() {}) {
    var nextClass = prompt("Next segment name:");
    if (nextClass) {
        chrome.runtime.sendMessage({ action: "setClass", class: nextClass, prevIntervals: sharedData.intervals }, onClassChanged);
    }
}