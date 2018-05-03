window.onload = function() {
    chrome.runtime.sendMessage({ action: "getToggleButtonText" }, function(response) {
        document.querySelector('#extensionActiveToggle').innerText = response.text;
    });
    document.getElementById('extensionActiveToggle').onclick = function() {
        chrome.runtime.sendMessage({ action: "toggleActiveState" }, function(response) {
            document.querySelector('#extensionActiveToggle').innerText = response.nextText;
        });
    }
    document.getElementById('fileInput').onchange = function() {
        var file = document.getElementById('fileInput').files[0];
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
            chrome.runtime.sendMessage({ action: "setMasterIntervals", jsonString: event.target.result });
            // The above will also send a message to content.js to draw in the intervals for the current class
            // if it already exists in the provided JSON file
        }
        fileReader.readAsText(file);
    }
    console.log('loaded');
}