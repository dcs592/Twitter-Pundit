var data;


function startAjax(){
  $.ajax({
           url: 'http://localhost:3000/tweetResult', //the URL to your node.js server that has data
           type:'POST',
           cache: false,
          }).done(function(data2){
      //"data" will be JSON. Do what you want with it. 
            data = data2;
            console.log(data)
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
  document.getElementById("header0").src=data[0].profile_image;
  document.getElementById("base").src=data[0].background_image;

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
  document.getElementById("header0").src=data[1].profile_image;
  document.getElementById("base").src=data[1].background_image;

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
  document.getElementById("header0").src=data[2].profile_image;
  document.getElementById("base").src=data[2].background_image;

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
  document.getElementById("header0").src=data[3].profile_image;
  document.getElementById("base").src=data[3].background_image;

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
  document.getElementById("header0").src=data[4].profile_image;
  document.getElementById("base").src=data[4].background_image;

  for(var t=0;t<5;t++){
    document.getElementById("ex"+String(t)).innerHTML=data[t].name;
  }
}