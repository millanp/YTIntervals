// requires jQuery
function enableDownloadHotkey(sharedData, doBeforeDownload) {
    $(document).keydown(function(e) {
        if (e.which === 83 && e.shiftKey && e.ctrlKey) {
            // ctrl-shift-s pressed
            doBeforeDownload();
            chrome.runtime.sendMessage({ action: "download", prevIntervals: sharedData.intervals });
        }
    });
}