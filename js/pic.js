define(['jQuery'], function ($) {
    var returnedModule = function () {

        var searchTerm = "";
        var perpage=50;//photos per page
        var currentPage=1;
        var URL2='https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bbb375cca8820c5296288e6c3ab26a57&';
        var tags="";
        var tagmode="&tagmode=any";
        var jsonFormat = "&format=json";
        var ajaxURL="";
        var data="";
        this.setPage=function(agrs){
            currentPage=agrs;
        }
        this.getPics = function () {

             searchTerm=$("#term").val();
            tags="&tags="+ searchTerm;
            ajaxURL= URL2+"per_page="+perpage+"&page="+currentPage+tags+tagmode+jsonFormat;
           $.ajax({
             url:ajaxURL,
             dataType:"jsonp",
             jsonp:"jsoncallback",
             success: function(dataa) {
                 if(data.stat!="fail") {
                     data= dataa;
					 renderData(data);
                 }

                 else {
                 $("#gallery").empty();
                 console.log("Error code "+data.stat);
                 photoHTML="Error !! Error !! "+data.stat;
                 $("#gallery").append(photoHTML).fadeIn(200);

                }
             }
           });
        }
				
		function renderData(data){
			
			 var totalPictures=0;
			 totalPictures=data.photos.total;
              $('#status').text('Total '+totalPictures+' Pictures Found');
              $.each(data.photos.photo, function(i,photo) {
			  var photoHTML="";//-----------appending photos into the gallery
			  photoHTML+= "<div><figure> <img src='";
			  photoHTML+="https://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m_d.jpg'";
			  photoHTML+=" title='"+photo.title+"'" ;
			  photoHTML+="></figure></div>";
			  $("#gallery").append(photoHTML).fadeIn(200);
	   
		   });
		}
		
    };

    return returnedModule;

});