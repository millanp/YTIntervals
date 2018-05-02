var extensionActive = false;
var className;
var masterIntervals = {};

// Supposed to Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function() {
    extensionActive = true; // quick bug fix to two-click problem
    if (extensionActive) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            masterIntervals["url"] = tabs[0].url;
            chrome.tabs.sendMessage(tabs[0].id, { action: "start" }, function(response) {

            });
        });
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "stop" }, function(response) {

            });
        });
    }
});



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "setClass") {
            console.log(request.class);
            if (className)
                masterIntervals[className] = request.prevIntervals;
            className = request.class;
            sendResponse({
                intervals: (masterIntervals[className] ? masterIntervals[className] : [])
            });
        } else if (request.action == "download") {
            if (className)
                masterIntervals[className] = request.prevIntervals;
            chrome.downloads.download({
                url: "data:," + encodeURIComponent(JSON.stringify(pruneIntervals(masterIntervals))),
                filename: "intervals" + ".json" // maybe make the filename the vid id
            });
        }
    }
);

function pruneIntervals() { // TODO implement this
    return masterIntervals;
}