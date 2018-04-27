var extensionActive = false;
var className;

// Supposed to Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function() {
    extensionActive = !extensionActive;
    if (extensionActive) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "start" }, function(response) {

            });
        });
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "stop" }, function(response) {

            });
        });
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "setClass") {
            className = request.class;
        } else if (request.action == "download") {
            chrome.downloads.download({
                url: request.dataURL,
                filename: className + "-" + request.frameNumber + ".png"
            });
        }
    }
);