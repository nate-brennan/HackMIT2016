$( "body" ).append('<div id="container"> <div class="row"> <div class="col-xs-4">a</div> <div class="col-xs-4">b</div> <div class="col-xs-4">c</div> </div> <div class="row"> <div class="col-xs-4">d</div> <div class="col-xs-4">e</div> <div class="col-xs-4">f</div> </div> <div class="row"> <div class="col-xs-4">g</div> <div class="col-xs-4">h</div> <div class="col-xs-4">i</div> </div> </div>');

var grid = document.getElementById('container');

function displayGrid() {
	grid.style.display = "block";
}

displayGrid();