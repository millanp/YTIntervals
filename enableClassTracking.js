function enableClassTracking() {
    function setClass() {
        var nextClass = prompt("Next class:");
        if (nextClass) {
            chrome.runtime.sendMessage({ action: "setClass", class: nextClass });
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