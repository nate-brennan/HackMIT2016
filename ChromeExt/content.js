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

          var url = "http://localhost";
          window.open(url);
        }
        // if(input.type=="text"&&(input.name.toLowerCase().indexOf("login")!=-1||input.name.toLowerCase().indexOf("email")!=-1||input.name.toLowerCase().indexOf("user")!=-1||input.name=="AgentAccount")){
        //         { 
        //           input.value=usr}
        // }
   }
};
