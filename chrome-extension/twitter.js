
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
          	data = data2;
          	hello1();
          });
      }
    
function hello1(){
	console.log(data);
	document.getElementById("button1").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";

	document.getElementById("middle").innerHTML=data[0].text;
	document.getElementById("username").innerHTML=data[0].name;
	document.getElementById("handle").innerHTML="@"+data[0].handle;
	document.getElementById("header0").src=data[0].pimage;
	document.getElementById("base").src=data[0].bimage;

	for(var t=0;t<5;t++){
		document.getElementById("ex"+String(t)).innerHTML=data[t].name;
	}
}

function hello2(){
	document.getElementById("button2").src="tw_min.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";

	document.getElementById("middle").innerHTML=data[1].text;
	document.getElementById("username").innerHTML=data[1].name;
	document.getElementById("handle").innerHTML="@"+data[1].handle;
	document.getElementById("header0").src=data[1].pimage;
	document.getElementById("base").src=data[1].bimage;

	for(var t=0;t<5;t++){
		document.getElementById("ex"+String(t)).innerHTML=data[t].name;
	}
}

function hello3(){
	document.getElementById("button3").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";


	document.getElementById("middle").innerHTML=data[2].text;
	document.getElementById("username").innerHTML=data[2].name;
	document.getElementById("handle").innerHTML="@"+data[2].handle;
	document.getElementById("header0").src=data[2].pimage;
	document.getElementById("base").src=data[2].bimage;

	for(var t=0;t<5;t++){
		document.getElementById("ex"+String(t)).innerHTML=data[t].name;
	}
}

function hello4(){
	document.getElementById("button4").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";

	document.getElementById("middle").innerHTML=data[3].text;
	document.getElementById("username").innerHTML=data[3].name;
	document.getElementById("handle").innerHTML="@"+data[3].handle;
	document.getElementById("header0").src=data[3].pimage;
	document.getElementById("base").src=data[3].bimage;

	for(var t=0;t<5;t++){
		document.getElementById("ex"+String(t)).innerHTML=data[t].name;
	}
}

function hello5(){
	document.getElementById("button5").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";

	document.getElementById("middle").innerHTML=data[4].text;
	document.getElementById("username").innerHTML=data[4].name;
	document.getElementById("handle").innerHTML="@"+data[4].handle;
	document.getElementById("header0").src=data[4].pimage;
	document.getElementById("base").src=data[4].bimage;

	for(var t=0;t<5;t++){
		document.getElementById("ex"+String(t)).innerHTML=data[t].name;
	}
}

document.getElementById('button1').addEventListener('click', hello1);
document.getElementById('button2').addEventListener('click', hello2);
document.getElementById('button3').addEventListener('click', hello3);
document.getElementById('button4').addEventListener('click', hello4);
document.getElementById('button5').addEventListener('click', hello5);