var num_data_points = 100;
var threshold = 90;

var h = screen.availHeight;
var w = screen.availWidth;
var num_rows = 3;
var num_cols = 3;
var num_boxes = num_rows * num_cols;

queue = [];
for (var i =0; i < num_data_points; i++) {
	queue.push(i % num_boxes);
}
var counts = [];
// initialize counts
for (var i = 0; i < num_boxes; i++) {
	counts.push(Math.round(num_data_points/num_boxes));
}

var pword = [];

funciton getBox(x, y) {
	var row = Math.floor(y/h * num_rows);
	var col = Math.floor(x/w * num_cols);
	return row*num_cols + col;
}

window.onload = function() {
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
        	var box = getBox(data.x, data.y);
        	queue.push(box);
        	counts[queue.shift()] -= 1;
        	counts[box] += 1;
        	for (var i = 0; i < num_boxes; i++) {
        		if (counts[i] > threshold) {
        			if ((pword.length == 0) || (pword[pword.length - 1] != i)) {
        				console.log("added to pword " + i);
        				pword.push(i);
        			}
        		}
        	}
         })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
    var width = 320;
    var height = 240;
    var topDist = '0px';
    var leftDist = '0px';
    
    var setup = function() {
        var video = document.getElementById('webgazerVideoFeed');
        video.style.display = 'block';
        video.style.position = 'absolute';
        video.style.top = topDist;
        video.style.left = leftDist;
        video.width = width;
        video.height = height;
        video.style.margin = '0px';
        webgazer.params.imgWidth = width;
        webgazer.params.imgHeight = height;
        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';
        overlay.style.position = 'absolute';
        overlay.width = width;
        overlay.height = height;
        overlay.style.top = topDist;
        overlay.style.left = leftDist;
        overlay.style.margin = '0px';
        document.body.appendChild(overlay);
        var cl = webgazer.getTracker().clm;
        function drawLoop() {
            requestAnimFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,width,height);
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
            }
        }
        drawLoop();
    };
    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);
};
window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions 
}