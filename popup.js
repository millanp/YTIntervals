window.onload = function() {
    chrome.runtime.sendMessage({ action: "getToggleButtonText" }, function(response) {
        document.querySelector('#extensionActiveToggle').innerText = response.text;
    });
    document.getElementById('extensionActiveToggle').onclick = function() {
        chrome.runtime.sendMessage({ action: "toggleActiveState" }, function(response) {
            document.querySelector('#extensionActiveToggle').innerText = response.nextText;
        });
    }
    document.getElementById('fileInput').onclick = function() {
        console.log('hi');
        chrome.runtime.sendMessage({ action: "setMasterIntervals" });
    }
    console.log('loaded');
}