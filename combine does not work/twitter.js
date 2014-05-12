// var json= {"expert":[{
// "name":"World ZGames WOW",
//  "handle": 'AliAlexAli1234',
// "text":"Violence inflicted by pro-Russian militants in eastern Ukraine \'terrorism, pure and simple,\' says U.S. embassy http://t.co/YnWRufoP5d",
// "profile_image":"http://abs.twimg.com/sticky/default_profile_images/default_profile_0_normal.png",
// "background_image":"undefined/web"},
// {
//  "name":"Alive Now",
//  "handle": 'AliveNow23',
//  "text":"RT @Justin_D_Martin: After being detained &amp; beaten by pro-Russia militants, CBS &amp; BuzzFeed journalists freed in eastern Ukraine http://t.co…",
//  "profile_image":"http://pbs.twimg.com/profile_images/419060289741393920/HGQko_Mk_normal.jpeg",
//  "background_image":"https://pbs.twimg.com/profile_banners/735474648/1396738079/web"
// },
// {
// "name":"Justin D. Martin",
// "handle": 'Justin_D_Martin',
//  "text":"After being detained &amp; beaten by pro-Russia militants, CBS &amp; BuzzFeed journalists freed in eastern Ukraine http://t.co/8vFS8gJY1f",
//  "profile_image":"http://pbs.twimg.com/profile_images/976231963/CIkjhjkh_normal.JPG",
//  "background_image":"https://pbs.twimg.com/profile_banners/186905420/1388791035/web"
// },
// {"name":"prinzZ",
// "handle": 'Prinzix',
//  "text":"RT @Ukraine_Trends: The pro-Russia militants who stood guard at one of the tire-strewn checkpoints littering eastern Ukraine prese... http:…",
//  "profile_image":"http://pbs.twimg.com/profile_images/378800000722101435/42077f82a42e987614700d59cd7601b9_normal.jpeg",
//  "background_image":"https://pbs.twimg.com/profile_banners/186905420/1388791035/web"},
//  {
//  "name":"Ukraine News",
//  "handle": 'Ukraine_Trends',
//  "text":"The pro-Russia militants who stood guard at one of the tire-strewn checkpoints littering eastern Ukraine prese... http://t.co/lv7JDojB3F",
//  "profile_image":"http://pbs.twimg.com/profile_images/454318702704336896/smUHVFWv_normal.jpeg",
//  "background_image":"https://pbs.twimg.com/profile_banners/2437341031/1397152832/web"}
// ]};
// var json="{"+"""
$("#click").mouseover(function(){
		$(this).css("border","2px solid green");
	});
	$("#click").mouseout(function(){
		$(this).css("border","none");
	});
// details=[];
var details;
function startAjax(){
$.ajax({
           url: 'http://localhost:3000/tweetResult', //the URL to your node.js server that has data
           type:'POST',
           cache: false
          }).done(function(data){
      //"data" will be JSON. Do what you want with it. 
          details=JSON.parse(JSON.stringify(data));
          console.log(details[0].name)
          // hello1(details);
         // var items=json1.expert;
          // document.getElementById("username").innerHTML=items[1].username;
          // window.alert(json);
          // console.log(details)
          });
          window.location='twitter.html';
      }
     
// var items=json.expert;
// for(var i=0;i<items.length;i++){
//    var obj=items[i].name;
//    document.getElementById("ex"+i).innerHTML=obj;
// }


function hello1(data){
	console.log(data);
	document.getElementById("button1").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";
	for(var k=0;k<3;k++){
	document.getElementById("tw"+k).innerHTML=data.text;
	document.getElementById("username").innerHTML=data.name;
	document.getElementById("handle").innerHTML="@"+data.handle;
	}
for(var t=0;t<4;t++){
		document.getElementById("header"+t).src=data.profile_image;
	}
	// document.getElementById("base").src=items[0].background_image;
	document.getElementById("handle").innerHTML="@"+data.handle;
}


function hello2(){
	document.getElementById("button2").src="tw_min.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";
	for(var k=0;k<3;k++){
	document.getElementById("tw"+k).innerHTML=items[1].text;	
	}
	document.getElementById("username").innerHTML=items[1].name;
	for(var t=0;t<4;t++){
		document.getElementById("header"+t).src=items[1].profile_image;
	}
	document.getElementById("base").src=items[1].background_image;
	document.getElementById("handle").innerHTML="@"+items[1].handle;
}

function hello3(){
	document.getElementById("button3").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";
	for(var k=0;k<3;k++){
	document.getElementById("tw"+k).innerHTML=items[2].text;	
	}
	for(var t=0;t<4;t++){
		document.getElementById("header"+t).src=items[2].profile_image;
	}
	document.getElementById("username").innerHTML=items[2].name;
	document.getElementById("base").src=items[2].background_image;
	document.getElementById("handle").innerHTML="@"+items[2].handle;
}

function hello4(){
	document.getElementById("button4").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";
	for(var k=0;k<3;k++){
	document.getElementById("tw"+k).innerHTML=items[3].text;	
	}
	for(var t=0;t<4;t++){
		document.getElementById("header"+t).src=items[3].profile_image;
	}
	document.getElementById("username").innerHTML=items[3].name;
	document.getElementById("base").src=items[3].background_image;
	document.getElementById("handle").innerHTML="@"+items[3].handle;
}

function hello5(){
	document.getElementById("button5").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	for(var k=0;k<3;k++){
	document.getElementById("tw"+k).innerHTML=items[4].text;	
	}
	for(var t=0;t<4;t++){
		document.getElementById("header"+t).src=items[4].profile_image;
	}
	document.getElementById("username").innerHTML=items[4].name;
	document.getElementById("base").src=items[4].background_image;
	document.getElementById("handle").innerHTML="@"+items[4].handle;
}
