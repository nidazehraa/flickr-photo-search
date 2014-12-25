//including jquery file
require.config({
    paths: {
        'jQuery': 'jquery-1.9.1.min'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});

//loading
require(["pic","jQuery"], function(util) {
   
var u=new util();

function updateStatus(){
    $('#status').text('Total '+totalPictures+' Pictures Found');
 }
 
function getDocHeight() {
	
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

var currentPage=1;
var flag=true;//to clear on new search

//----------function to get photos starts from here-------------------------//
function ajaxProcess() {
    u.setPage(currentPage);
    u.getPics();
}

$(document).ready(function() {
	
	  $("#gallery").empty();
	  $("#term").focus(function() {
	  $('#status').empty();
	  flag=false;
	});
	
	$("#submit").click(function (event) {

	   if(flag==false){
		flag=true;
		$("#gallery").empty();
	}
	
	if($("#term").val() !="" ){//search keyword provided
		ajaxProcess();
	}else {
		alert("Please enter a keyword to search");
	 }
   });
	 
   //to clear the gallery
	$("#clear").click(function(){
	   $("#gallery").empty();
	});
	$(window).scroll(function(){//loading new pages when scroller reached to the end
	  
	   if($(window).scrollTop() + $(window).height() == getDocHeight()) {
			  currentPage++;//loading next page
			  $("#submit").click();
		  }
	  });
  });
});