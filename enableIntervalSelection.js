// requires jQuery
// intervals list defined in content.js
function enableIntervalSelection() {
    var intervalStart;
    var markerUpdateInterval;
    var videoElem = document.querySelector('video');
    var totalScrubLength = $('.ytp-progress-list')[0].getBoundingClientRect().width;

    function startInterval() {
        intervalStart = videoElem.currentTime;
        // set at marker at the current location of ytp-scrubber-container
        var scrubberPos = $('.ytp-scrubber-container')[0].getBoundingClientRect();
        var startMarker = $('<span></span>');
        startMarker.css({
            position: "absolute",
            height: "10px",
            width: "3px",
            top: scrubberPos.top + "px",
            left: scrubberPos.left + "px",
            backgroundColor: "white",
            zIndex: "1000"
        });
        $('body').append(startMarker);
        markerUpdateInterval = setInterval(function() {
            startMarker.css({
                width: ((videoElem.currentTime - intervalStart) / videoElem.duration * totalScrubLength) + "px",
            });
        }, 50);

    }

    function stopInterval() {
        intervals.push(new Interval(intervalStart, videoElem.currentTime));
        clearInterval(markerUpdateInterval);
        intervalStart = null;
    }

    $('.ytp-scrubber-button').css('transform', 'none');

    $(document).keydown(function(e) {
        if (e.shiftKey) {
            // shift key pressed
            if (!intervalStart) {
                startInterval();
            } else {
                stopInterval();
            }
        }
    });
}