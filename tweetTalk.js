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
var Twit=require('twit');
var async=require('async');
var $ = require('jquery');
var express = require('express');
var consolidate = require('consolidate');

var app= express()
var path = require('path');
var T = new Twit({
    consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o'
  , consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1'
  , access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED'
  , access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'
});

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
'z', 'zero', '', '-']

var punct_list = ['.', ',', ':', ';', "\'", "\"", '\\', '/', '?', '<', '>', '-', '_', '+', 
'=', '~', '!', '#', '$', '%', '&', '^', '*', '[', ']', '{', '}', '(', ')', '`']

var searchlist = ['believe', 'opinion', 'think'];

var org_list = ['.com', 'news', 'times', 'guardian', 'politic', 'bbc', 'euromaidan', 'standard',
				'washington', 'press', 'yahoo', 'online', 'daily', 'rt', 'not ', 'live', 'street',
				'leicester', 'picture', 'histor', 'white house', 'fact', 'espn', 'mashable', 'sport',
				'quartz', 'america', 'msn', 'nato', 'independent', 'market', 'forbes', 'magazine',
				'vanity', 'cnn', 'something', 'bad luck', 'good luck', 'tv', 'radio', 'church',
				' sun', 'sugerscape', 'classic', 'alert', 'city', 'state', 'god', 'lolgop', 'mother jones',
				'fun bird', 'globe', 'variety', 'vogue', 'instyle', 'reuter', 'dna', 'group', 'yorker',
				'anonymous', 'nra', 'fox', 'nation', 'huffpost', 'series', 'abc', 'circa', 'panthers',
				'buzz', 'tampa', 'houston', 'right', 'last word', 'republican', 'democrat', 'wwe', 'nyt',
				'museum', 'nyc', 'propaganda', 'foundation', 'organization', 'girl', 'boy', 'opinion',
				'local', 'nbc', 'today', 'new day', 'usa', 'wiki', 'meme', 'publica', 'apha', 'who',
				'pitchfork', 'cp24', 'hedge', 'detroit', 'tribune', 'inc.', 'story', 'policy', 'telegraph',
				'wsjd', 'atlantic', 'project', 'vh', 'insider', 'business', 'park', 'soccer', 'football',
				'journal', 'ofa', 'bank', 'movie', 'vision', 'problems', 'school', 'conservative', 'liberal',
				'progress', 'blaze', 'matters', 'media', 'what', 'nba', 'desk', 'official', 'tumblr', '.gov',
				'climate','vox', 'club', 'the hill', 'reason', 'club', 'sincerely', 'believe', 'post', 'student',
				'netw3rk', 'hello', 'republic', 'education']

/*
########################################
==== Strings to Pull Out of Article ====
########################################
*/
var text = "";
var raw_text = "";
var author = "";
var topic;
var query = []; // most relevant entities
var positions = []; // sublist of job positions
var people = []; // sublist of people
var resultJSON = []; // stores json of relevant tweets
var tweetList = [];
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


app.post('/expertSearch',function(req,res)
{
    res.contentType('application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    url=req.body.url;													
	// store_url = url;

	expert=req.body.expert;
	T.get('users/lookup', {screen_name: expert}, function (err, data, response) {
		if(data) {
		  	if(data[0].name) {
		  		console.log(data[0].name);
		  	  	getQuery(url,res,expert);
		  		// res.send(data[0].name)
		  	}
		}
	});

	// console.log(url);
	// checkIfURLinFirebase(url, res);
});



app.post('/tweetResult',function(req,res)
{
    res.contentType('application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    url=req.body.url;													
	store_url = url;

	console.log(url);
	checkIfURLinFirebase(url, res);
});


/*
###############################
==== Create Query Keywords ====
###############################
*/
function getQuery(url,res,expert) {
	query = [];
	positions = []; // sublist of job positions
	people = []; // sublist of people
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
				==== Extract Keywords ====
				##########################
				*/	

				alchemyapi.keywords('text', raw_text, null, function(response) {
					keywords = response;
					entities = response;
				//	console.log(response);
					for (k in keywords['keywords']) {
						if (k<8) {//(parseFloat(keywords['keywords'][k]['relevance'])>=.5) {
							query.push(keywords['keywords'][k]['text']);
						}
					}
					tweetList = [];
					if(expert)
					{
						expertTweet(query,res,expert);
					}

					else

					{

					for (var item in query) {
						getTweets(query[item], res, item, query.length-1);
					}

				}
				});
			});
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
	var q = array;
//	var people = array[1];
//	var positions = array[2];
	var queries = []
	var string = ""
	for (var s in searchlist) {
		for (var i in q) {
			string = q[i] + " " + searchlist[s];
			queries.push(string);
		}
	}

	for (var i in q) {
		for (var j in q) {
			if (i!=j) {
				string = q[i] + ' ' + q[j];
				queries.push(string);
			}
		}
	}
	return queries;
}

function expertTweet(query,res, expert)
{
	console.log(query);
	console.log(expert);
	var expertTweetList=[];
	ctr=0;
	for (item=0; item<query.length;item++) {
		request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&from=" + expert+"&q="+query[item],
				oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
									consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
									access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
									access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
						json: true},
				function(error, response, tweets) {
					if(error || !tweets) {
						console.log("Query error")
					}
	  	 			else {
	  	 				for(i=0;i<tweets.statuses.length;i++)
	  	 				{
							expertTweetList.push({name: tweets.statuses[i].user['name'], description: tweets.statuses[i].user['description'], handle: tweets.statuses[i].user['screen_name'], pimage: tweets.statuses[i].user['profile_image_url'], tweet:tweets.statuses[i].text})
							res.send(expertTweetList)
							ctr++;
	  	 				}	
	  	 			}
		});
	}
	if(ctr>0)
	{
	 	console.log(expertTweetList)
	 	res.send(expertTweetList)
	}
}



function getTweets(q, res, k, total) {

	request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&q=" + q,
		oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
							consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
							access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
							access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
				json: true},
			function(error, response, tweets) {
				if(error || !tweets) {
					console.log("Query error")
				}
  	 			else {
	  	 			for (var key in tweets.statuses) {
						var inArray = false;
	  	 				for(var item in tweetList) {
	  	 					if (tweetList[item]['text']==tweets.statuses[key]['text']) {
	  	 						inArray = true;
	  	 						break;
	  	 					}
	  	 				}

	  	 				var name = tweets.statuses[key].user['name'];
	  	 				name = name.toLowerCase();

	  	 				var org_name = false;
	  	 				for (var sub in org_list) {
	  	 					if (name.indexOf(org_list[sub])>=0) {
	  	 						org_name = true;
	  	 						break;
	  	 					}
	  	 				}

	  	 				var tw_text = tweets.statuses[key].text;

	  	 				var followers = false;
	  	 				if (tweets.statuses[key].user['followers_count']<10000) {
	  	 					followers = true;
	  	 				}
	  	 				if (tweets.statuses[key].user['followers_count']>1000000) {
	  	 					followers = true;
	  	 				}

	  	 				var pitch = false;
	  	 				if (tw_text.indexOf("tune in")>=0) {
	  	 					pitch = true;
	  	 				}

	  	 				var corresp = 1;
	  	 				if (tweets.statuses[key].user['description'].toLowerCase().indexOf("correspondent")) {
	  	 					pitch = false;
	  	 					corresp = 3;
	  	 				}
	  	 				if (tweets.statuses[key].user['description'].toLowerCase().indexOf("ambassador")) {
	  	 					pitch = false;
	  	 					corresp = 3;
	  	 				}		
	  	 				if (tweets.statuses[key].user['description'].toLowerCase().indexOf("latest news")) {
	  	 					corresp = 2;
	  	 				}
	  	 				if (tweets.statuses[key].user['description'].toLowerCase().indexOf("parody")) {
	  	 					org_name = true;
	  	 				}

	  	 				if (inArray==false && org_name==false && pitch==false && followers==false) {// && org_name==false && followers==false && pitch==false) {
	  	 					console.log("added");
	  	 					tweets.statuses[key]['corresp'] = corresp;
	  	 					tweetList.push(tweets.statuses[key]);
	  	 				}
	  	 				if(key==(tweets.statuses.length-1)) {
	  	 					if(k==total-1 || k==total || tweetList.length>=5) {
	  	 						return parseTweets(tweetList, res);
	  	 					}
	  	 				}
  	 			}
  	 	}
	 });
}

function parseTweets(tweets, res) {
	console.log("in parse tweets");
	resultJSON = [];
	console.log("Number of tweets: " + tweets.length);
	for (var t in tweets) {
			var newJSON = {};
			newJSON['name'] = tweets[t].user['name'];
			newJSON['handle'] = tweets[t].user['screen_name'];
			newJSON['text']	= tweets[t].text;
			newJSON['pimage'] = tweets[t].user['profile_image_url'];
			newJSON['bimage'] = tweets[t].user['profile_banner_url'] + '/web';
			newJSON['description']=tweets[t].user['description'];
			newJSON['corresp'] = tweets[t].corresp;
			newJSON['tweet_id'] = tweets[t].id;
			resultJSON.push(newJSON);
	}
	if(resultJSON.length>0) {
		compareTweets(resultJSON, res);
		return false;
	}
	else {
		console.log("No results");
		return false;
	}
}

function compareTweets(tweets, res) {
	console.log("inside compare tweets");
	var art_len = raw_text.length;
	for (var i=0; i < tweets.length; i++) {
		var corresp = tweets[i].corresp;
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
						for (var item in entities['keywords']) {
							if(string.indexOf(entities['keywords'][item]['text'])>=0) {
								var relevance = parseFloat(entities['keywords'][item]['relevance']);
								tally+= (art_len - pos)*relevance;
								break;
							}
						}
					}
				}
			}
		}
		tweets[i]['count'] = tally*corresp;
		if (i==(tweets.length-1)) {
			tweets.sort(function(a,b) { return parseFloat(b.count) - parseFloat(a.count) } );

			var json = {};
			for (var i=0; i<resultJSON.length; i++) {
				json[String(i)] = {};
				json[String(i)]['name'] = resultJSON[i]['name'];
				json[String(i)]['handle'] = resultJSON[i]['handle'];
				json[String(i)]['text'] = resultJSON[i]['text'];
				json[String(i)]['pimage'] = resultJSON[i]['pimage'];
				json[String(i)]['bimage'] = resultJSON[i]['bimage'];
				json[String(i)]['description'] = resultJSON[i]['description'];
				json[String(i)]['tweet_id'] = resultJSON[i]['tweet_id'];
			}
			addURLtoFirebase(store_url, author, store_title, json, res);
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

function addURLtoFirebase(url, author, title, tweets, res) {
	for(var p in punct_list) {
		while(url.indexOf(punct_list[p])>=0) {
			url = url.replace(punct_list[p], '');
		}
	}
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yy = today.getFullYear();
	var date = {'day': dd, 'month': mm, 'year': yy};
	console.log("addingurl");
	myDataRef.child('urls').child(url).set({
		'author': author,
		'title': title,
		'tweets': tweets,
		'updated': date
	});
	checkIfURLinFirebase(url, res);
//	res.send(tweets);
	return false;
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
		//	console.log(result);
			if(!error && response.statusCode == 200) {
				if(result!='null') {
					res.send(result);
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


function checkName(text) {
	console.log("Inside check name");
	var request = alchemyapi.entities('text', text, null, function(response) {
		if((response['entities'].length==1) && (response['entities'][0]['type']=='Person')) {
			console.log("True: " + text);
			return true;
		}
		if(text.indexOf('anderson cooper')>=0) {
			console.log("True: " + text);
			return true;
		}
		else {
		//	console.log("False: " + text);
			return false;
		}
	});
}

function checkTopic(text) {
	console.log("Inside check topic");
	var request = alchemyapi.category('text', text, null, function(response) {
		if(response['category']) {
			console.log(response['category']);
			return response['category'];
		}
		else {
			console.log("No category");
			return false;
		}
	});
}











