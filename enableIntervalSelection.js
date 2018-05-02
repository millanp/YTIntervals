// requires jQuery, Colors.js
// intervals list defined in content.js
var sharedData;
var Colors;
var intervalColor;

var intervalStart;
var markerUpdateInterval;
var resizeTimeout;
var videoElem;
var totalScrubLength;
var scrubberPos;

function drawIntervals() {
    scrubberPos = $('.ytp-progress-bar')[0].getBoundingClientRect();
    totalScrubLength = $('.ytp-progress-list')[0].getBoundingClientRect().width;
    var i = 0;
    for (var interval of sharedData.intervals) {
        drawInterval(interval, i);
        i++;
    }
}

function drawInterval(interval, idx) {
    var leftPx = scrubberPos.left + (interval.startTime / videoElem.duration * totalScrubLength);
    var startMarker = $('<div class="interval"></div>');
    startMarker.css({
        position: "absolute",
        height: "10px",
        width: (interval.endTime - interval.startTime) / videoElem.duration * totalScrubLength + "px",
        top: scrubberPos.top - 12 + "px",
        left: leftPx + "px",
        backgroundColor: "white", // TODO use interval colors
        zIndex: "1000" // cannot click to delete yet
    });
    startMarker.click(function() {
        if (interval.active) {
            stopInterval();
        }
        sharedData.intervals.splice(sharedData.intervals.indexOf(interval), 1);
        $(this).remove();
    });
    $('body').append(startMarker);
    if (interval.active) {
        markerUpdateInterval = setInterval(function() {
            startMarker.css({
                width: ((videoElem.currentTime - intervalStart) / videoElem.duration * totalScrubLength) + "px",
            });
        }, 50);
    }
}

function startInterval() {
    intervalStart = videoElem.currentTime;
    var newInterval = new Interval(intervalStart, intervalStart, true);
    sharedData.intervals.push(newInterval);
    drawInterval(newInterval, sharedData.intervals.length - 1);
    // set at marker at the current location of ytp-scrubber-container
    // var scrubberPos = $('.ytp-progress-bar')[0].getBoundingClientRect();
    // var leftPx = scrubberPos.left + (intervalStart / videoElem.duration * totalScrubLength);
    // console.log(leftPx);
    // console.log("heeee");
    // var startMarker = $('<div class="interval"></div>');
    // startMarker.css({
    //     position: "absolute",
    //     height: "10px",
    //     width: "0px",
    //     top: scrubberPos.top - 12 + "px",
    //     left: leftPx + "px",
    //     backgroundColor: "white",
    //     border: "1px black",
    //     zIndex: "1000"
    // });
    // $('body').append(startMarker);
    // markerUpdateInterval = setInterval(function() {
    //     startMarker.css({
    //         width: ((videoElem.currentTime - intervalStart) / videoElem.duration * totalScrubLength) + "px",
    //     });
    // }, 50);

}

function stopInterval() {
    sharedData.intervals[sharedData.intervals.length - 1].endTime = videoElem.currentTime;
    sharedData.intervals[sharedData.intervals.length - 1].active = false;
    clearInterval(markerUpdateInterval);
    intervalStart = null;
}


function enableIntervalSelection(sharedData, Colors) {
    sharedData = sharedData;
    Colors = Colors;
    intervalColor = nextColor();
    videoElem = document.querySelector('video');
    totalScrubLength = $('.ytp-progress-list')[0].getBoundingClientRect().width
    scrubberPos = $('.ytp-progress-bar')[0].getBoundingClientRect()

    $(document).keydown(function(e) {
        if (e.shiftKey && !e.ctrlKey) {
            // shift key pressed
            if (!intervalStart) {
                startInterval();
            } else {
                stopInterval();
            }
        }
    });

    $(window).resize(function() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(function() {
            $('.interval').remove();
            drawIntervals();
        }, 300);

    });
}

function newIntervalClass(sharedData) {
    sharedData = sharedData;
    intervalColor = nextColor();
    $('.interval').remove();
    drawIntervals();
}