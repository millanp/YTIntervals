/*
WORKFLOW: 
1. User clicks the extension icon to activate the listeners
2. User enters Ctrl-Q, then types in the class name
3. User clicks to a frame, hits tilde to download, continues on until entire pass is done
4. Repeat steps 2-3
*/
var framesPerJump;
var secondsPerFrame;

var videoElem;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "start") {
            console.log("start me up");
            enableFrameJumping();
            enableClassTracking()
            enableIntervalSelection();
        } else if (request.action == "stop") {

        }
    }
);