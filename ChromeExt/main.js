
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
    }
};


function start_track() {
    webgazer.setRegression('ridge') [> currently must set regression and tracker <]
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
        .showPredictionPoints(true); [> shows a square every 100 milliseconds where current prediction is <]
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



// content.js
var pwd="test";   //get password from vb.net app
var usr="test";   //get username from vb.net app
var inputs=document.querySelectorAll('input:-webkit-autofill');   //look for all inputs

var htmldata = '<div id="myModal" class="modal"> <span id="close">&times;</span> <div id="eyetracking-grid"> <div class="row"> <div class="col-xs-4">a</div> <div class="col-xs-4">b</div> <div class="col-xs-4">c</div> </div> <div class="row"> <div class="col-xs-4">d</div> <div class="col-xs-4">e</div> <div class="col-xs-4">f</div> </div> <div class="row"> <div class="col-xs-4">g</div> <div class="col-xs-4">h</div> <div class="col-xs-4">i</div> </div> </div> </div>';

function closeGrid() {
  document.getElementById('myModal').style.display='none';

  for(var i=0;i<inputs.length;i++){
  {    //for each input on document

        var input=inputs[i];     //look at whatever input

        if (input.type=="password"&&(input.name.toLowerCase().indexOf("auth")==-1)) {
          input.value = "";
        }
   }
};
}

for(var i=0;i<inputs.length;i++){
  {    //for each input on document

        var input=inputs[i];     //look at whatever input

        if (input.type=="password"&&(input.name.toLowerCase().indexOf("auth")==-1)) {
          // alert("Triggered");
          var element = document.body;
          var e = document.createElement('div');
          e.innerHTML = htmldata;

          while(e.firstChild) {
              element.appendChild(e.firstChild);
          }

          document.getElementById('close').addEventListener('click', closeGrid);
            


          var modal = document.getElementById('myModal');
          modal.style.display = "block";
          
          start_track(); 
        }
        // if(input.type=="text"&&(input.name.toLowerCase().indexOf("login")!=-1||input.name.toLowerCase().indexOf("email")!=-1||input.name.toLowerCase().indexOf("user")!=-1||input.name=="AgentAccount")){
        //         { 
        //           input.value=usr}
        // }
   }
};
