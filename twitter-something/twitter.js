
// $(function(){
// 	$(".button1").live('click',function(){
// 		alert("hello");
// 		if($(this).attr("class")=="button1"){
// 			this.src=this.src.replace("tw_plus.png","tw_min.png");
// 		}else{
// 			this.src=this.src.replace("tw_min.png","tw_plus.png");
// 		}
// 		$(this).toggleClass("on");
// 	});
// });

function hello1(){
	document.getElementById("button1").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";
	parent.ex_topics.location.href="content.html";

}

function hello2(){
	document.getElementById("button2").src="tw_min.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";
	parent.ex_topics.location.href="content1.html";
}

function hello3(){
	document.getElementById("button3").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";
	parent.ex_topics.location.href="content2.html";
}

function hello4(){
	document.getElementById("button4").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button5").src="tw_plus.png";
	parent.ex_topics.location.href="content3.html";
}

function hello5(){
	document.getElementById("button5").src="tw_min.png";
	document.getElementById("button2").src="tw_plus.png";
	document.getElementById("button1").src="tw_plus.png";
	document.getElementById("button3").src="tw_plus.png";
	document.getElementById("button4").src="tw_plus.png";
	parent.ex_topics.location.href="content4.html";
}
