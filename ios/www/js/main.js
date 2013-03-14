//Brandon McGhee
//ASD 1302


var getTweets = function() {
	$.getJSON("http://search.twitter.com/search.json?q=st%20patricks%20day&rpp=5&include_entities=true&result_type=mixed&callback=?",
              function(data) {
              console.log(data);
              for (i=0, j=data.results.length; i<j; i++) {
              $("#tweets")
              .append("<li>" +
                      "<img src='" + data.results[i].profile_image_url + "' />" + "<h1>" + data.results[i].from_user_name + "<br />" + "<br />" + "<p>" + data.results[i].text
                      );
              }
              $("#tweets").listview("refresh");
              });
    
};

var getInstagram = function() {
	$.getJSON("https://api.instagram.com/v1/tags/stpatricksday/media/recent?access_token=36600076.9ef9f59.9f461e68e9984b2b9eb99473f436f3dc&callback=?",
              function(data) {
              console.log(data);
              for (i=0, j=data.data.length; i<j; i++) {
              $("#Feed")
              .append("<li>" +
                      "<img src='" + data.data[i].images.standard_resolution.url + "' />" + "<b>" + data.data[i].user.username + "<br />" + "<br />" + "<p>" + data.data[i].caption.text
                      );
              }
              $("#Feed").listview("refresh");
              });
    
};

$('#getTweets').on('click', function() {
                   getTweets();
                   });

$('#getInstagram').on('click', function() {
                      getInstagram();
                      });



/////PAGE LISTENERS/////

//Home Page Listener
$('#home').on('pageinit', function(){
              
              
              
              });





//////END PAGE LISTENERS//////
