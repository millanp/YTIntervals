window.onload = function() {
    chrome.runtime.sendMessage({ action: "getToggleButtonText" }, function(response) {
        document.querySelector('#extensionActiveToggle').innerText = response.text;
    });
    document.getElementById('extensionActiveToggle').onclick = function() {
        chrome.runtime.sendMessage({ action: "toggleActiveState" }, function(response) {
            document.querySelector('#extensionActiveToggle').innerText = response.nextText;
        });
    }
    console.log('loaded');
}