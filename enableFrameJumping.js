// framesPerJump and secondsPerFrame are defined in content.js
function enableFrameJumping() {
    var videoElem = document.querySelector('video');
    var prevTime = 0;

    function setFramesPerJump() {
        var tmp = parseInt(prompt("Frames to jump: "));
        if (tmp) {
            framesPerJump = tmp;
        }
    }

    setFramesPerJump();
    prevTime = videoElem.currentTime;
    $('.ytp-progress-bar').click(function() {
        prevTime = videoElem.currentTime;
        console.log('reset prevtime');
    });
    $(document).keydown(function(e) {
        if (e.which === 190 || e.which === 188) {
            // period or comma was pressed
            if (!secondsPerFrame) {
                var timeSkip = videoElem.currentTime - prevTime;
                secondsPerFrame = Math.abs(timeSkip);
            }
            if (e.which === 190) {
                videoElem.currentTime = prevTime + secondsPerFrame * framesPerJump;
            } else {
                videoElem.currentTime = prevTime - secondsPerFrame * framesPerJump;
            }
            prevTime = videoElem.currentTime;
        } else if (e.which === 70 && e.ctrlKey && e.altKey) {
            // Ctrl+alt+f was pressed
            setFramesPerJump();
        }
    });
    return secondsPerFrame;
}