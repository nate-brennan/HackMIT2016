var num_data_points = 60;
var threshold = 0.85 * num_data_points;

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
var currentPword = "";
var verifyPword = "";

// drawing circle grid

var c = document.getElementById("myCanvas");

function setCanvasSize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

setCanvasSize();

var x_int = c.width / 3;
var y_int = c.height / 3;

for (var i = 1; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.arc(Math.round(i * x_int - (x_int / 2)), Math.round(j * y_int - (y_int / 2)), 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

function getBox(x, y) {
	var row = Math.floor(y/h * num_rows);
    if (row > num_rows - 1) {
        row = num_rows - 1;
    }
    if (row < 0) {
        row = 0;
    }
    if (row > num_cols - 1) {
        col = num_cols - 1;
    }
    if (row < 0) {
        col = 0;
    }
	var col = Math.floor(x/w * num_cols);
	return row*num_cols + col;
}

var recording = false;
var count = 0;
var start;
var end;

var index = 0;
var texts = ["Please create a password.  Press <space> to toggle password recording and press <enter> to submit password", "Please verify your password"];

var texts2 = ["Password verified", "Password verification failed"];


$( "#done-button" ).click(function() {
    $('#container').text = texts[index++];
});

window.onkeypress = function(evt) {
    if (evt.keyCode == 32) {
        if (recording) {
            end = (new Date()).getTime();
            console.log("rate: " + count/((end-start)/1000) + " Hz");
            console.log(pword);
            pword=[];
        } else {
            start = (new Date()).getTime();
        }
        recording = !recording;
    } else if (evt.keyCode == 13) {
        if (currentPword == "") {
            currentPword = "".join(pword);
        } else {
            verifyPword = "".join(pword);
            if (verifyPword != currentPword) {
                currentPword = "";
                verifyPword = "";
                $('#container').text = texts2[1];
            } else {
                $('#container').text = texts2[0];
            }
        }
    }
};

window.onload = function() {
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if (recording) {
                if (data == null) {
                    return;
                }
                count += 1;
                var box = getBox(data.x, data.y);
                queue.push(box);
                counts[queue.shift()] -= 1;
                counts[box] += 1;
                for (var i = 0; i < num_boxes; i++) {
                    if (counts[i] > threshold) {
                        if ((pword.length == 0) || (pword[pword.length - 1] != i)) {
                            console.log("added to pword " + i);
                            console.log(counts/num_data_points);
                            pword.push(i);
                        }
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
