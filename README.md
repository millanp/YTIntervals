# YTFrames
A tool to quickly select and save out (the start and end times of) segments
of a YouTube video as a json file. You can mark several segment types
in a single session.

For example, in video https://www.youtube.com/watch?v=IcDI1iWmIp8,
segment "smile" may be associated with time intervals 33.2-41.2 and
51.3-53.5, and segment "frown" may be associated with intervals
30.0-35.0, 70.0-71.9 and  82.1-84.7. Using YTIntervals, you can name these
segments, mark the intervals in each segment and save the results into a
``intervals.json`` file in your downloads folder. In this example, the
file will contain the following:
```json
{"url": "https://www.youtube.com/watch?v=IcDI1iWmIp8",
 "smile":
	[{"startTime":33.2,"endTime":41.2,"active":false},
	 {"startTime":51.3,"endTime":53.5,"active":false}],
 "frown":
	[{"startTime":30.0,"endTime":35.0,"active":false},
	 {"startTime":70.0,"endTime":71.9,"active":false},
	 {"startTime":82.1,"endTime":84.7,"active":false}]}
```

## Installation
  * Clone this repository to your local computer.
  * Enable developer mode in Chrome, then load as an unpacked extension.
	* Go to ``chrome://extensions``
	* Toggle the button on the top right-hand corner to enable developer mode.
	* Click on "Load Unpacked" (top middle of the page) and select the
      directory you cloned the repo into. You should get an extension
      button with a "scraper"icon (<img src="NScrape.png" width="12">) at the
      top right hand that says "YTIntervals" when you hover over it. 
  
## Use
  1. Go to any YouTube video and pause it. The tool works whether the
     video is paused or running. However, it is usually much easier to
     precisely label a paused video by moving the scrubber/slider around.
  2. For each new named segment you want to add, click the extension
     button <img src="NScrape.png" width="12">. Enter the name of the
     new segment at the prompt.
  		* Now mark the intervals corresponding to the segment. For each interval: 
  			* Move the scrubber to where you want your interval to
	  	start. Press ``shift``
  			* Move the scrubber to the end of the interval. Press ```Shift```
	  	again. YTIntervals will show you the interval you just marked
	  	using a white rectangle along the scrubber.
  		* Just click on the white rectangle for any interval to delete it.
  5. When you are done labeling, use ``Ctrl-Shift-s`` to save an
     ``intervals.json`` file to your ``Downloads`` folder.
