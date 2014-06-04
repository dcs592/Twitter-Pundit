var data;

var tablink;
chrome.tabs.getSelected(null,function(tab) {
   tablink = tab.url;
   startup();
});


function startup()
{

console.log(tablink);
urlJSON={url:tablink}

      $.ajax({
          //url: 'http://pure-anchorage-2860.herokuapp.com:3000/tweetResult',
          // url: 'http://tweettalk.nodejitsu.com/tweetResult',  //the URL to your node.js server that has data
          url: 'http://localhost:3000/tweetResult',
          type:'POST',
          data:urlJSON,
          cache: false,
         }).done(function(data2){
     //"data" will be JSON. Do what you want with it. 
     	 document.getElementById("overlay").style.display = 'none';
     	 document.getElementById("loading").style.display = 'none';

         	data = data2;
         	console.log(data);

         	$("#profile").empty();

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

          $( "#expertFeed" ).empty();
          $( "#profile" ).hide();
          data=JSON.parse(JSON.stringify(data3));
          console.log(data);

          var content='<br><br><a target="_blank" href="https://twitter.com/' + data[0].handle + '"><div class="expertblock">';
          content += '<img class="header0" src="'+ data[0].pimage+'"></img>';
          content += '<table class="table">';
          content += '<tr>';
          content += '<td id="username">'+data[0].name + '&nbsp;<div="handle">(@' + data[0].handle + ')</div></td>';
          content += '</tr>';
          content += '<tr><td id="tw_desc">' + data[0].description + '</td>';
          content += '</tr></table></a>';
          console.log(data.length);
          for(i=0;i<data.length;i++)
          {
          content += '<div class="tweetblock">';
          content += '<p id="tweets">'+data[i].tweet+'</p></div>';
          content += '</div><br>';
          $(content).appendTo("#expertFeed");
          }
          console.log(content);

     //      var content='<br><br><br><a target="_blank" href="https://twitter.com/' + data[0].handle + '"><div class="expertblock">';
     //      content += '<img class="header0" src="'+ data[0].pimage+'" title="'+data[0].description+'"></img>';
     //       content += '<table class="table">';
     //      content += '<tr>';
     //      content += '<td id="username">'+data[0].name+'</td>';
     //      content += '</tr>'+'<tr>';
     //      content += '<td id="handle">'+'@'+data[0].handle+'</td>';
     //      content += '</td></table></a>';
     //      //content += '<p id="t_des">'+data[i].description+'</p>';
          

     //      for(i=0;i<data3.length;i++)
     //      {
     //      content += '<div class="tweetblock">';
     //      content += '<p id="tweets">'+data3[i].text+'</p></div>';
     //      content += '</div><br><br><div id="middle"></div><br><br>';
     //      $(content).appendTo("#expertFeed");
     //      }
     //      //$( "#profile" ).hide();
     // //"data" will be JSON. Do what you want with it. 
     console.log("success");
       
  });
}
document.getElementById('search').addEventListener('click', expertSearch);
