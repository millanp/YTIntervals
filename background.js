var extensionActive = false;
var className;
var masterIntervals = {};

// Supposed to Called when the user clicks on the browser action icon.
// chrome.browserAction.onClicked.addListener(function() {
//     extensionActive = !extensionActive; // TODO allow enabling and disabling of extension, or remove the feature
//     if (extensionActive) {
//         console.log('active');
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             masterIntervals["url"] = tabs[0].url;
//             chrome.tabs.sendMessage(tabs[0].id, { action: "start" }, function(response) {

//             });
//         });
//     } else {
//         console.log('inactive');
//         masterIntervals = {};
//         className = null;
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, { action: "stop" }, function(response) {

//             });
//         });
//     }
// });



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.action);
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
        } else if (request.action == "toggleActiveState") {
            extensionActive = !extensionActive; // TODO allow enabling and disabling of extension, or remove the feature
            if (extensionActive) {
                console.log('active');
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    masterIntervals["url"] = tabs[0].url;
                    chrome.tabs.sendMessage(tabs[0].id, { action: "start" }, function(response) {

                    });
                });
                sendResponse({ nextText: "Disable extension" });
            } else {
                console.log('inactive');
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "stop" }, function(response) {

                    });
                });
                sendResponse({ nextText: "Activate extension" });
            }
        } else if (request.action == "getToggleButtonText") {
            sendResponse({ text: getToggleButtonText() });
        } else if (request.action == "setMasterIntervals") {
            masterIntervals = JSON.parse(request.jsonString);
            className = null; // This will prevent the following call to newClass from saving any data
            if (extensionActive) {
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "newClass" });
                    // The above will prompt content.js to go through the usual class change procedure
                    // WITHOUT saving the already-drawn intervals
                    // thus effectively performing a "reset"
                });
            }
        }
    }
);

function getToggleButtonText() {
    return extensionActive ? "Disable extension" : "Activate extension";
}

function pruneIntervals() { // TODO implement this
    return masterIntervals;
}