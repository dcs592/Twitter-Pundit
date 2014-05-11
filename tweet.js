

var AlchemyAPI = require("./alchemyapi");
var alchemyapi = new AlchemyAPI();

var $ = require('jquery');
var express = require('express');
var consolidate = require('consolidate');
var Twit = require('twit')
var T = new Twit({
    consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o'
  , consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1'
  , access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED'
  , access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'
});


var stoplist = ['a', "a's", 'able', 'about', 'above', 'according', 'accordingly', 'across', 
'actually', 'after', 'afterwards', 'again', 'against', "ain't", 'all', 'allow', 
'allows', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 
'am', 'among', 'amongst', 'an', 'and', 'another', 'any', 'anybody', 'anyhow', 
'anyone', 'anything', 'anyway', 'anyways', 'anywhere', 'apart', 'appear', 
'appreciate', 'appropriate', 'are', "aren't", 'around', 'as', 'aside', 'ask', 
'asking', 'associated', 'at', 'available', 'away', 'awfully', 'b', 'be', 'became', 
'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 
'behind', 'being', 'believe', 'below', 'beside', 'besides', 'best', 'better', 
'between', 'beyond', 'both', 'brief', 'but', 'by', 'c', "c'mon", "c's", 'came', 
'can', "can't", 'cannot', 'cant', 'cause', 'causes', 'certain', 'certainly', 
'changes', 'clearly', 'co', 'com', 'come', 'comes', 'concerning', 'consequently', 
'consider', 'considering', 'contain', 'containing', 'contains', 'corresponding', 
'could', "couldn't", 'course', 'currently', 'd', 'definitely', 'described', 
'despite', 'did', "didn't", 'different', 'do', 'does', "doesn't", 'doing', 
"don't", 'done', 'down', 'downwards', 'during', 'e', 'each', 'edu', 'eg', 
'eight', 'either', 'else', 'elsewhere', 'enough', 'entirely', 'especially', 
'et', 'etc', 'even', 'ever', 'every', 'everybody', 'everyone', 'everything', 
'everywhere', 'ex', 'exactly', 'example', 'except', 'f', 'far', 'few', 'fifth', 
'first', 'five', 'followed', 'following', 'follows', 'for', 'former', 'formerly', 
'forth', 'four', 'from', 'further', 'furthermore', 'g', 'get', 'gets', 'getting', 
'given', 'gives', 'go', 'goes', 'going', 'gone', 'got', 'gotten', 'greetings', 
'h', 'had', "hadn't", 'happens', 'hardly', 'has', "hasn't", 'have', "haven't", 
'having', 'he', "he's", 'hello', 'help', 'hence', 'her', 'here', "here's", 
'hereafter', 'hereby', 'herein', 'hereupon', 'hers', 'herself', 'hi', 'him', 
'himself', 'his', 'hither', 'hopefully', 'how', 'howbeit', 'however', 'i', "i'd", 
"i'll", "i'm", "i've", 'ie', 'if', 'ignored', 'immediate', 'in', 'inasmuch', 
'inc', 'indeed', 'indicate', 'indicated', 'indicates', 'inner', 'insofar', 
'instead', 'into', 'inward', 'is', "isn't", 'it', "it'd", "it'll", "it's", 'its', 
'itself', 'j', 'just', 'k', 'keep', 'keeps', 'kept', 'know', 'knows', 'known', 
'l', 'last', 'lately', 'later', 'latimes.com', 'latter', 'latterly', 'least', 'less', 'lest', 
'let', "let's", 'like', 'liked', 'likely', 'little', 'look', 'looking', 'looks', 
'ltd', 'm', 'mainly', 'many', 'may', 'maybe', 'me', 'mean', 'meanwhile', 
'merely', 'might', 'more', 'moreover', 'most', 'mostly', 'much', 'must', 'my', 
'myself', 'n', 'name', 'namely', 'nd', 'near', 'nearly', 'necessary', 'need', 
'needs', 'neither', 'never', 'nevertheless', 'new', 'next', 'nine', 'no', 
'nobody', 'non', 'none', 'noone', 'nor', 'normally', 'not', 'nothing', 'novel', 
'now', 'nowhere', 'o', 'obviously', 'of', 'off', 'often', 'oh', 'ok', 'okay', 
'old', 'on', 'once', 'one', 'ones', 'only', 'onto', 'or', 'other', 'others', 
'otherwise', 'ought', 'our', 'ours', 'ourselves', 'out', 'outside', 'over', 
'overall', 'own', 'p', 'particular', 'particularly', 'per', 'perhaps', 'placed', 
'please', 'plus', 'possible', 'presumably', 'probably', 'provides', 'q', 'que', 
'quite', 'qv', 'r', 'rather', 'rd', 're', 'really', 'reasonably', 'regarding', 
'regardless', 'regards', 'relatively', 'respectively', 'right', 's', 'said', 
'same', 'saw', 'say', 'saying', 'says', 'second', 'secondly', 'see', 'seeing', 
'seem', 'seemed', 'seeming', 'seems', 'seen', 'self', 'selves', 'sensible', 
'sent', 'serious', 'seriously', 'seven', 'several', 'shall', 'she', 'should', 
"shouldn't", 'since', 'six', 'so', 'some', 'somebody', 'somehow', 'someone', 
'something', 'sometime', 'sometimes', 'somewhat', 'somewhere', 'soon', 'sorry', 
'specified', 'specify', 'specifying', 'still', 'sub', 'such', 'sup', 'sure', 't', 
"t's", 'take', 'taken', 'tell', 'tends', 'th', 'than', 'thank', 'thanks', 
'thanx', 'that', "that's", 'thats', 'the', 'their', 'theirs', 'them', 
'themselves', 'then', 'thence', 'there', "there's", 'thereafter', 'thereby', 
'therefore', 'therein', 'theres', 'thereupon', 'these', 'they', "they'd", 
"they'll", "they're", "they've", 'think', 'third', 'this', 'thorough', 
'thoroughly', 'those', 'though', 'three', 'through', 'throughout', 'thru', 
'thus', 'to', 'together', 'too', 'took', 'toward', 'towards', 'tried', 'tries', 
'truly', 'try', 'trying', 'twice', 'two', 'u', 'un', 'under', 'unfortunately', 
'unless', 'unlikely', 'until', 'unto', 'up', 'upon', 'us', 'use', 'used', 
'useful', 'uses', 'using', 'usually', 'uucp', 'v', 'value', 'various', 'very', 
'via', 'viz', 'vs', 'w', 'want', 'wants', 'was', "wasn't", 'way', 'we', "we'd", 
"we'll", "we're", "we've", 'welcome', 'well', 'went', 'were', "weren't", 'what', 
"what's", 'whatever', 'when', 'whence', 'whenever', 'where', "where's", 
'whereafter', 'whereas', 'whereby', 'wherein', 'whereupon', 'wherever', 
'whether', 'which', 'while', 'whither', 'who', "who's", 'whoever', 'whole', 
'whom', 'whose', 'why', 'will', 'willing', 'wish', 'with', 'within', 'without', 
"won't", 'wonder', 'would', 'would', "wouldn't", 'x', 'y', 'yes', 'yet', 'you', 
"you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself', 'yourselves', 
'z', 'zero', '-']



var art_title = ""
//var keywords = new Array();



function getURL() {
	console.log("URL of article: ");
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	var util = require('util');
	
	process.stdin.on('data', function(data) {
		var url = data.toString();
		title(url);
	});
}
getURL();

//title();

function keywords(url, $) {
	var results;
	var resultJSON = {};
	alchemyapi.keywords('url', url, null, function(response) {
		results = response['keywords'];
		var arrayLength = results.length;
		//console.log('\tKeywords: ')
		for(var i=0; i<arrayLength; i++) {
			//console.log('\t\t' + results[i].text);
		}
		if(results.length)
		{

  	 		var query=results[0].text+'  '+ results[1].text ;
  	 		var id;
  	 		$.getJSON("http://search.twitter.com/search.json?q=" + query + ";rpp=5&amp;callback=?", function(data) {
		//T.get('search/tweets', { q: query, count:200  }, function(err, reply1) {
			//$(data.results).each(function(i, v) {
				console.log(data);
			//})
			});
  	 	}
  	});
}
/*


  				//console.log(err)
  				if(reply1.statuses.length>0)
  				{
  					ctr=0;
  					console.log('------------------------------------------------------------------------------');
  					for (var key in reply1.statuses) {
  				//		if(reply1.statuses[key].user['verified']==true) {
	  						if(reply1.statuses[key].retweeted==false) {
		  						if(ctr<5) {
		  							var name = reply1.statuses[key].user['name'];

		  							var image = reply1.statuses[key].user['profile_banner_url'] + '/web';

		  							resultJSON[key] = {};
		  							resultJSON[key].name = reply1.statuses[key].user['name'];
		  							resultJSON[key].handle = reply1.statuses[key].user['screen_name'];
		  							resultJSON[key].text = reply1.statuses[key].text;
		  							resultJSON[key].profile_image = reply1.statuses[key].user['profile_image_url'];
		  							resultJSON[key].background_image = image;
		
			  						//resultJSON[key] = reply1.statuses[key];
		  							ctr+= 1;
		  						}
		  				//	}
		  				}
  					}
  					console.log(resultJSON);
  		//		for(var i=0;i<reply1.statuses.length;i++)
  		//		{
  		//		if(reply1.statuses[i].text.indexOf('RT')==-1)
  		//		{
  		//			ctr++;
  		//			console.log(ctr+' ) '+ reply1.statuses[i].user['name']+'\n'+ reply1.statuses[i].text+'\n');
  		//		}
  				}
  		//		console.log(query);
  		//		id=reply1.statuses[i-1].id;
  		//		getMoreTweets(query,id,ctr);
  				});

		}
		/*T.get('users/suggestions/:slug', { slug: 'government' }, function (err, reply) {
  //
  		userList=JSON.parse(JSON.stringify(reply));
  		if(reply.users.length>0)
  		{
    		for(i=0;i<reply.users.length;i++)
  			{ 
  	 			//console.log(reply.users[i].name+"\n");
  	 			var query=results[0].text+' OR '+ results[1].text+' OR '+ results[2].text+ ' from:'+userList.users[i].screen_name;
  	 			var query1='from:'+userList.users[i].screen_name; 
  	 			//console.log(query1);
  	 			tweetdisplay(query,userList.users[i].screen_name);
  				
  			}
  		}
		});*/	


function getMoreTweets(query,id,ctr)
{

T.get('search/tweets', { q: query, count:200 , max_id:id }, function(err, reply1) {

  				//console.log(err)
  				if(reply1.statuses.length>0)
  				{
  				console.log('------------------------------------------------------------------------------')
  				for(var i=0;i<reply1.statuses.length;i++)
  				{
  				if(reply1.statuses[i].text.indexOf('RT')==-1)
  				{
  					ctr++;
  					console.log(ctr+' ) '+ reply1.statuses[i].user['name']+'\n'+ reply1.statuses[i].text+'\n');
  				}
  				}
  				console.log(query);
  				id=reply1.statuses[i-1].id;
  				getMoreTweets(query,id,ctr);
  				}
				});

}

function title(url) {
	alchemyapi.title('url', url, null, function(response) {
		art_title = response['title'];
		art_title = art_title.toLowerCase();
		art_title = art_title.split(" ");
		var temp = new Array();
		for(var i in art_title) {
			if(stoplist.indexOf(art_title[i])>=0) {
				continue;
			}
			else {
				temp.push(art_title[i])
			}
		}
		art_title = temp
	//	console.log('\n\tArticle Keywords: [' + art_title + ']\n');
	})
	keywords(url, $);
}








