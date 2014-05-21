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
          url: 'http://localhost:3000/tweetResult', //the URL to your node.js server that has data
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
         	var content='<div class="expertblock">';
        	content += '<img class="header0" src="'+ data[i].profile_image+'" title="'+data[i].description+'"></img>';
        	content += '<h1 id="username">'+data[i].name+'</h1>';
        	content += '<p id="handle">'+data[i].handle+'</p>';
        	//content += '<p id="t_des">'+data[i].description+'</p>';
        	content += '<div class="tweetblock"></div>';
        	content += '<p id="tweets">'+data[i].text+'</p>';
        	content += '</div><br><br><div id="middle"></div><br>';
        	$(content).appendTo("#profile");
        	}
         });
     }
  
// function hello1(){
// console.log(data);
// document.getElementById("button1").src="tw_min.png";
// document.getElementById("button2").src="tw_plus.png";
// document.getElementById("button3").src="tw_plus.png";
// document.getElementById("button4").src="tw_plus.png";
// document.getElementById("button5").src="tw_plus.png";

// document.getElementById("middle").innerHTML=data[0].text;
// document.getElementById("username").innerHTML=data[0].name;
// document.getElementById("handle").innerHTML="@"+data[0].handle;
// document.getElementById("header0").src=data[0].profile_image;
// document.getElementById("base").src=data[0].background_image;
// document.getElementById("t_des").innerHTML=data[0].description;

// for(var t=0;t<5;t++){
// document.getElementById("ex"+String(t)).innerHTML=data[t].name;
// }
// }

// function hello2(){
// document.getElementById("button2").src="tw_min.png";
// document.getElementById("button1").src="tw_plus.png";
// document.getElementById("button3").src="tw_plus.png";
// document.getElementById("button4").src="tw_plus.png";
// document.getElementById("button5").src="tw_plus.png";

// document.getElementById("middle").innerHTML=data[1].text;
// document.getElementById("username").innerHTML=data[1].name;
// document.getElementById("handle").innerHTML="@"+data[1].handle;
// document.getElementById("header0").src=data[1].profile_image;
// document.getElementById("base").src=data[1].background_image;
//    document.getElementById("t_des").innerHTML=data[1].description;
// for(var t=0;t<5;t++){
// document.getElementById("ex"+String(t)).innerHTML=data[t].name;
// }
// }

// function hello3(){
// document.getElementById("button3").src="tw_min.png";
// document.getElementById("button2").src="tw_plus.png";
// document.getElementById("button1").src="tw_plus.png";
// document.getElementById("button4").src="tw_plus.png";
// document.getElementById("button5").src="tw_plus.png";


// document.getElementById("middle").innerHTML=data[2].text;
// document.getElementById("username").innerHTML=data[2].name;
// document.getElementById("handle").innerHTML="@"+data[2].handle;
// document.getElementById("header0").src=data[2].profile_image;
// document.getElementById("base").src=data[2].background_image;
// document.getElementById("t_des").innerHTML=data[2].description;

// for(var t=0;t<5;t++){
// document.getElementById("ex"+String(t)).innerHTML=data[t].name;
// }
// }

// function hello4(){
// document.getElementById("button4").src="tw_min.png";
// document.getElementById("button2").src="tw_plus.png";
// document.getElementById("button1").src="tw_plus.png";
// document.getElementById("button3").src="tw_plus.png";
// document.getElementById("button5").src="tw_plus.png";

// document.getElementById("middle").innerHTML=data[3].text;
// document.getElementById("username").innerHTML=data[3].name;
// document.getElementById("handle").innerHTML="@"+data[3].handle;
// document.getElementById("header0").src=data[3].profile_image;
// document.getElementById("base").src=data[3].background_image;
// document.getElementById("t_des").innerHTML=data[3].description;

// for(var t=0;t<5;t++){
// document.getElementById("ex"+String(t)).innerHTML=data[t].name;
// }
// }

// function hello5(){
// document.getElementById("button5").src="tw_min.png";
// document.getElementById("button2").src="tw_plus.png";
// document.getElementById("button1").src="tw_plus.png";
// document.getElementById("button3").src="tw_plus.png";
// document.getElementById("button4").src="tw_plus.png";

// document.getElementById("middle").innerHTML=data[4].text;
// document.getElementById("username").innerHTML=data[4].name;
// document.getElementById("handle").innerHTML="@"+data[4].handle;
// document.getElementById("header0").src=data[4].profile_image;
// document.getElementById("base").src=data[4].background_image;
// document.getElementById("t_des").innerHTML=data[4].description;

// for(var t=0;t<5;t++){
// document.getElementById("ex"+String(t)).innerHTML=data[t].name;
// }
// }

// document.getElementById('button1').addEventListener('click', hello1);
// document.getElementById('button2').addEventListener('click', hello2);
// document.getElementById('button3').addEventListener('click', hello3);
// document.getElementById('button4').addEventListener('click', hello4);
// document.getElementById('button5').addEventListener('click', hello5);