/*
###########################
==== File Requirements ====
###########################
*/
var AlchemyAPI = require("./alchemyapi");
var alchemyapi = new AlchemyAPI();
var Firebase = require('firebase');

var request = require('request');
var express = require('express');
var async=require('async');
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

var app= express()
var path = require('path');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
 if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
}

/*
#################################
==== Lists for Normalization ====
#################################
*/
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
'z', 'zero', '']

var punct_list = ['.', ',', ':', ';', "\'", "\"", '\\', '/', '?', '<', '>', '-', '_', '+', 
'=', '~', '!', '#', '$', '%', '&', '^', '*', '[', ']', '{', '}', '(', ')', '`']

var searchlist = ['believe', 'opinion', 'think'];

/*
########################################
==== Strings to Pull Out of Article ====
########################################
*/
var text = "";
var raw_text = "";
var author = "";
var query = []; // most relevant entities
var positions = []; // sublist of job positions
var people = []; // sublist of people
var resultJSON = []; // stores json of relevant tweets
var count = 0;
var entities = {};
var store_url = "";
var store_title = "";

/*
##########################
==== Grab Article URL ====
##########################
*/
function getURL() {
	console.log("URL of article: ");
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	var util = require('util');
	var test;
	
	process.stdin.on('data', function(data) {
		var url = data.toString();
		return getQuery(url);
	});
}


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
 if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
}


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.post('/tweetResult',function(req,res)
{
    res.contentType('application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    url=req.body.url;													
	store_url = url;
	//console.log(resultJSON)
	console.log(url);
	checkIfURLinFirebase(url, res);
});


/*
###############################
==== Create Query Keywords ====
###############################
*/
function getQuery(url,res) {
	alchemyapi.text('url', url, null, function(response) {
		//get the text from the article
		text = response['text'];
		alchemyapi.title('url', url, null, function(response) {
			//get the article title
			var art_title = response['title'];
			store_title = art_title;
			//combine the title and text
			text = art_title + ' ' + text;

			alchemyapi.author('url', url, null, function(response) {
				//get the article author
				author = response['author'];
				//remove the author from the article
				text = text.replace("By " + author, '');
				text = text.replace(author, '');
				/*
				########################
				==== Normalize Text ====
				########################
				*/
				// remove punctuation
				for(var p in punct_list) {
					while(text.indexOf(punct_list[p])>=0) {
						text = text.replace(punct_list[p], '');
					}
				}
				text = text.split(" ");
				// remove line breaks
				var index = text.indexOf('\n');
				do {
					if (index > -1) {
						text.splice(index, 1);
					}
					index = text.indexOf('\n');
				} while (index > -1);
				// remove tab characters
				index = text.indexOf('\t');
				do {
					if (index > -1) {
						text.splice(index, 1);
					}
					index = text.indexOf('\t');
				} while (index > -1);
				// remove empty characters
				index = text.indexOf('');
				do {
					if (index > -1) {
						text.splice(index, 1);
					}
					index = text.indexOf('');
				} while (index > -1);

				raw_text = text;
				raw_text = raw_text.join(' ');
				raw_text = raw_text.toLowerCase();

				text = text.join(" ");
				// make text lowercase
				text = text.toLowerCase();

				/*
				##########################
				==== Extract Entities ====
				##########################
				*/				
				alchemyapi.entities('text', text, null, function(response) {
					entities = response;
					var max = 5; // max number of entities listed
					var people_count = 0; // number of people in entities list
					for(var entity in response['entities']) {
						var qlen = query.length;
						// if the number of entities matches the desired number
						if(qlen==max) {
							break;
						}
						// if the entity is a person
						if(response['entities'][entity]['type']=='Person') {
							// split the string
							var person = response['entities'][entity]['text'].split(" ");
							var len = person.length;
							// take the last word in the list (last name)
							person = person[len-1];
							// if the person is already listed, don't duplicate
							if(query.indexOf(person)==-1) {
								query.push(person);
								people.push(person);
							}
							people_count+= 1;
							// for every 2 people in the entity list, find another entity
							if(people_count==2) {
								max+= 1;
								people_count = 0;
							}
						}
						// if the entity is a job title
						else if(response['entities'][entity]['type']=="JobTitle") {
							// add it to the sublist of job positions
							positions.push(response['entities'][entity]['text']);
							// add it to the entity list
							query.push(response['entities'][entity]['text']);
							// find another entity
							max+= 1;
						}
						// if the entity is not already listed
						else if (query.indexOf(response['entities'][entity]['text'])==-1) {
							// add it to the entity list
							query.push(response['entities'][entity]['text']);
						}
					}
					var uQ = updateQuery(query, people, positions);
					var cQ = compileQueries(uQ);
					//var intResult=getTweets(cQ);
					getTweets(cQ,res,url);
				});
			})
		});
	});
}

function updateQuery(text, people, positions) {
	console.log("inside update query")
	for(var i in people) {
		var index = text.indexOf(people[i]);
		text.splice(index, 1);
	}
	for (var i in positions) {
		var index = text.indexOf(positions[i]);
		text.splice(index, 1);
	}
	return [text, people, positions];
}

function compileQueries(array) {
	console.log("inside compileQueries")
	var text = array[0];
	var people = array[1];
	var positions = array[2];
	var queries = []
	var string = ""
	for (var i in text) {
		for (var i2 in text) {
			if (i!=i2) {
				string = text[i] + ' ' + text[i2];
				queries.push(string);
			}
		}
		for (var i3 in people) {
			string = text[i] + ' ' + people[i3];
			queries.push(string);
		}
		for (var i4 in positions) {
			string = text[i] + ' ' + positions[i4];
			queries.push(string);
		}
	}
	return queries;
}

function getTweets(queries,res,url) {
	console.log("inside get tweets");
	console.log(queries);
	var len = queries.length - 1;
	var query = 0;
	for(var p in punct_list) {
		while(url.indexOf(punct_list[p])>=0) {
			url = url.replace(punct_list[p], '');
		}
	}
	for(var query in queries) {
		request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&q=" + queries[query],
					oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
  	 							consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
  	 							access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
  	 							access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
  	 				json: true},
  	 		function(error, response, tweets) {
  	 			if(error || tweets.statuses.length==0) {
  	 				console.log("Query error")
  	 			}
  	 			for (var key in tweets.statuses) {
					var inArray = false;
  	 				for(var item in resultJSON) {
  	 					if (resultJSON[item]['text']==tweets.statuses[key].text) {
  	 						inArray = true;
  	 					}
  	 				}

  	 				var name = tweets.statuses[key].user['name'];
  	 				name = name.toLowerCase();

  	 				var org_name = false;
  	 				if (tweets.statuses[key].user['name'].indexOf('.com')>=0) {
  	 					org_name = true;
  	 				}
  	 				if (name.indexOf('news')>=0) {
  	 					org_name = true;
  	 				}
  	 				if (name.indexOf(' tv')>=0) {
  	 					org_name = true;
  	 				}
  	 				if (name.indexOf('radio')>=0) {
  	 					org_name = true;
  	 				}
  	 				if (name.indexOf('show')>=0) {
  	 					org_name = true;
  	 				}
  	 				var linked = false;
  	 				var text = tweets.statuses[key].text;
  	 				if (text.indexOf("http")>=0) {
  	 					linked = true;
  	 				}

  	 				var followers = false;
  	 				if(tweets.statuses[key].user['followers_count']>10000) {
  	 					followers = true;
  	 				}

  	 				if (inArray==false && org_name==false && linked==false && followers==true) {
  	 					count++;
  	 					console.log(count-1);
  	 					var id = tweets.statuses[key].id;
  	 					var newJSON = {};
  	 					newJSON['name'] = tweets.statuses[key].user['name'];
  	 					newJSON['handle'] = tweets.statuses[key].user['screen_name'];
						newJSON['text']	= tweets.statuses[key].text;
						newJSON['pimage'] = tweets.statuses[key].user['profile_image_url'];
						newJSON['bimage'] = tweets.statuses[key].user['profile_banner_url'] + '/web';
						resultJSON.push(newJSON);
						if(query==len && key==(tweets.statuses.length-1)) {
							compareTweets(resultJSON, res);
							text = "";
							raw_text = "";
							author = "";
							query = []; // most relevant entities
							positions = []; // sublist of job positions
							people = []; // sublist of people
							resultJSON = []; // stores json of relevant tweets
							count = 0;
							entities = {};
							store_url = "";
							store_title = "";
							break;
							return false;
						}
  	 				}
  	 				
  	 				if(query==len && key==(tweets.statuses.length-1)) {
  	 					compareTweets(resultJSON, res);
	 					text = "";
						raw_text = "";
						author = "";
						query = []; // most relevant entities
						positions = []; // sublist of job positions
						people = []; // sublist of people
						resultJSON = []; // stores json of relevant tweets
						count = 0;
						entities = {};
						store_url = "";
						store_title = "";
  	 					break;
  	 					return false;
  	 				}
  	 			}
  	 	});
	}
}

function compareTweets(tweets, res) {
	console.log("inside compare tweets");
	var art_len = raw_text.length;
	for (var i=0; i < tweets.length; i++) {
		var tally = 0;
		var content = tweets[i]['text'];
		content = content.toLowerCase();
		for (var p in punct_list) {
			content = content.replace(punct_list[p], '');
		}
		content = content.replace('\n', ' ');
		content = content.replace('\t', ' ');
		content = content.split(' ');
		for (var len = 1; len < content.length-1; len++) {
			for (var index = 0; index < (content.length - len + 1); index++) {
				if (stoplist.indexOf(content[index])<0 && stoplist.indexOf(content[index+len-1])<0) {
					var string = content.slice(index, index+len);
					string = string.join(' ');
					var pos = raw_text.indexOf(string);
					if (pos>=0) {
						for (var item in entities) {
							if(string.indexOf(entities[item]['text'])>=0) {
								var relevance = parseFloat(entities[item]['relevance']);
								var word_count = parseFloat(entities[item]['count']);
								var multiple = relevance*word_count;
								break;
							}
							else {
								var multiple = 1;
							}
						}
						tally+= (art_len - pos)*multiple;
					}
				}
			}
		}
		tweets[i]['count'] = tally;
		if (i==(tweets.length-1)) {
			tweets.sort(function(a,b) { return parseFloat(b.count) - parseFloat(a.count) } );
			var limit = 0;
			if (tweets.length>5) {
				limit = 5;
			}
			else { limit = tweets.length;}
			var json = {};
			for (var i=0; i<limit; i++) {
				json[String(i)] = {};
				json[String(i)]['name'] = resultJSON[i]['name'];
				json[String(i)]['handle'] = resultJSON[i]['handle'];
				json[String(i)]['text'] = resultJSON[i]['text'];
				json[String(i)]['pimage'] = resultJSON[i]['pimage'];
				json[String(i)]['bimage'] = resultJSON[i]['bimage'];
			}
			res.send(tweets.slice(0, limit));
			addURLtoFirebase(store_url, author, store_title, json);
			return false;
		}
	}
	return false;
}

console.log("Server Listening at port 3000")
app.listen(3000);

/*
#################################
==== Add queries to database ====
#################################
*/
var myDataRef = new Firebase('https://tweettalk.firebaseio.com/');
	
function addURLtoFirebase(url, author, title, tweets) {
	for(var p in punct_list) {
		while(url.indexOf(punct_list[p])>=0) {
			url = url.replace(punct_list[p], '');
		}
	}
//	checkIfURLinFirebase(url) {
	console.log("addingurl");
	myDataRef.child('urls').child(url).set({
		'author': author,
		'title': title,
		'tweets': tweets
	});
	text = "";
	raw_text = "";
	author = "";
	query = []; // most relevant entities
	positions = []; // sublist of job positions
	people = []; // sublist of people
	resultJSON = []; // stores json of relevant tweets
	count = 0;
	entities = {};
	store_url = "";
	store_title = "";
	return false;
//	}
}

function addTweet(url, tweet) {
	myDataRef.child('urls').child(url).child('tweets').child(tweet).set(tweet);
}


function checkIfURLinFirebase(url, res) {
	console.log("searching database")
	if(url) {
		var tempurl = url;
		for(var p in punct_list) {
			while(url.indexOf(punct_list[p])>=0) {
				url = url.replace(punct_list[p], '');
			}
		}
		var firebaseAPI = "https://tweettalk.firebaseio.com/urls/" + url + "/tweets.json";
		request.get(firebaseAPI, function(error, response, result) {
			console.log(result);
			if(!error && response.statusCode == 200) {
				if(result!='null') {
					res.send(result);
					//console.log(result['tweets']);
					console.log("found");
					return false;
				}
				else {
					console.log("not found");
					getQuery(tempurl,res);
					return false;;
				}
			}
			else {
				console.log("not found");
				getQuery(tempurl,res);
				return false;
			}
		});
	}
}
















