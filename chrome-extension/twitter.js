var data;
//Gets the url of the article opened in browser tab and calls startup method
var tablink;
chrome.tabs.getSelected(null,function(tab) {
   tablink = tab.url;
   startup();
});


function startup()
{

console.log(tablink);
urlJSON={url:tablink}
      //Ajax request is sent to the RESTful method of node.js server and on success displays the expert tweets
      
      $.ajax({
          //url: 'http://pure-anchorage-2860.herokuapp.com:3000/tweetResult',
          url: 'http://localhost:3000/tweetResult', //the URL to your node.js server that has data
          type:'POST',
          data:urlJSON,
          cache: false,
         }).done(function(data2){
     //data2 is JSON returned from restful method. The JSON is parsed and displayed by injecting html code
     	 document.getElementById("overlay").style.display = 'none';
     	 document.getElementById("loading").style.display = 'none';

         	data = data2;
         	console.log(data);

         	$("#profile").empty();
          //Expert tweets are injected into HTML 
	     	for(i=0;i<data.length;i++)
         	{
         	var content='<a target="_blank" href="https://twitter.com/' + data[i].handle + '"><div class="expertblock">';
        	content += '<img class="header0" src="'+ data[i].pimage+'"></img>';
          content += '<table class="table">';
          content += '<tr>';
          content += '<td id="username">'+data[i].name + '&nbsp;<div="handle">(@' + data[i].handle + ')</div></td>';
          content += '</tr>';
          content += '<tr><td id="tw_desc">' + data[i].description + '</td>';
          content += '</tr></table></a>';
        	content += '<div class="tweetblock">';
        	content += '<p id="tweets">'+data[i].text+'</p></div>';
        	content += '</div><br>';
        	$(content).appendTo("#profile");
        	}
        });
     }

//This method takes in the expert handle and calls the expert search RESTFul method of node.js server by AJAX 
  function expertSearch()
  {
    console.log(tablink);
    expname=$('#expert').val();
    urlJSON={url:tablink,expert:expname}

      $.ajax({
          url: 'http://localhost:3000/expertSearch', //the URL to your node.js server that has data
          type:'POST',
          data:urlJSON,
          cache: false,
         }).done(function(data3){

          //on success, tweets of an expert is received as JSON in data3

          $( "#expertFeed" ).empty();
          $( "#profile" ).hide();
          data=data3;
          console.log(data3);

          //HTML code which displays the tweet of an expert is injected
          var content='<br><br><br><a target="_blank" href="https://twitter.com/' + data[0].handle + '"><div class="expertblock">';
          content += '<img class="header0" src="'+ data[0].pimage+'" title="'+data[0].description+'"></img>';
           content += '<table class="table">';
          content += '<tr>';
          content += '<td id="username">'+data[0].name+'</td>';
          content += '</tr>'+'<tr>';
          content += '<td id="handle">'+'@'+data[0].handle+'</td>';
          content += '</td></table></a>';
          

          for(i=0;i<data3.length;i++)
          {
          content += '<div class="tweetblock">';
          content += '<p id="tweets">'+data[i].tweet+'</p></div>';
          content += '</div><br><br><div id="middle"></div><br><br>';
          $(content).appendTo("#expertFeed");
          }
     //"data" will be JSON. Do what you want with it. 
     console.log("success");
       
  });
}

//In Chrome extension, event handlers are declared below
 
document.getElementById('search').addEventListener('click', expertSearch);
