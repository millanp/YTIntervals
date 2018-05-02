function enableClassTracking(sharedData, onClassChanged) {
    function setClass() {
        var nextClass = prompt("Next segment-group name:");
        if (nextClass) {
            chrome.runtime.sendMessage({ action: "setClass", class: nextClass, prevIntervals: sharedData.intervals }, onClassChanged);
        }
    }
    setClass();
    $(document).keydown(function(e) {
        if (e.which === 81 && e.ctrlKey) {
            // Ctrl+q was pressed
            setClass();
        }
    });
}
