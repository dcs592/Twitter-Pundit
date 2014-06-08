/*
###########################
==== File Requirements ====
###########################
*/
var AlchemyAPI = require("alchemy-api");
var alchemyapi = new AlchemyAPI('68017bcdda143c99830dd2176b380769b4670263');
var Firebase = require('firebase');

var request = require('request');
var express = require('express');
var Twit=require('twit');
var async=require('async');
var $ = require('jquery');
var consolidate = require('consolidate');

var app= express()
var path = require('path');
var T = new Twit({
    consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o'
  , consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1'
  , access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED'
  , access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'
});

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

/*
==== Strings indicative of organizations ====
*/

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
				'netw3rk', 'hello', 'republic', 'education', 'review', 'communication', 'blog', 'glasswire',
				'updates', 'stripes', 'popular', 'science', 'energy', 'time', 'snckpck', 'engadget', 'macworld',
				'mobile', 'entreprenuer', 'venture', 'real', 'lynch', 'years', 'environment', 'u.s.', '.org',
				'coffee', 'dot org', 'grist', 'democracy', 'together', 'agency']

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
var resultJSON = []; // stores jsons of relevant tweets
var tweetList = [];
var count = 0;
var entities = {};
var store_url = "";
var store_title = "";

/*
###############################
==== Set up node.js server ====
###############################
*/

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
		  	}
		}
	});
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
	//search for the article url in Firebase
	checkIfURLinFirebase(url, res);
});


/*
###############################
==== Create Query Keywords ====
###############################
*/
function getQuery(url,res,expert) {
	query = []; //clear query list in case it is called more than once
	alchemyapi.text(url, {}, function(err, response) {
		//get the text from the article
		text = response['text'];
		if (text.length==0) {
			res.send(resultJSON);
			return false;
		}
		alchemyapi.title(url, {}, function(err, response) {
			//get the article title
			var art_title = response['title'];
			store_title = art_title;
			//combine the title and text
			text = art_title + ' ' + text;

			alchemyapi.author(url, {}, function(err, response) {
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

				/*
				##########################
				==== Extract Keywords ====
				##########################
				*/	

				alchemyapi.keywords(raw_text, {}, function(err, response) {
					if (response.length==0) {
						//send empty list
						res.send(resultJSON);
						return false;
					}
					keywords = response;
					entities = response;
					//use the top 8 keywords
					for (k in keywords['keywords']) {
						if (k<8) {
							query.push(keywords['keywords'][k]['text']);
						}
					}
					while (query.length<8) {
						query.push("");
					}
					tweetList = [];
					//if an expert was searched, use the expert search function
					if(expert)
					{
						expertTweet(query,res,expert);
					}
					//otherwise search for tweets from experts related to the article
					else
					{
						getTweets(query, res);
					}
				});
			});
		});
	});
}

function expertTweet(query,res, expert)
{
	console.log(query);
	console.log(expert);
	var expertTweetList=[];
	console.log(expert);
	if (expert.indexOf('@')==0) {
		expert = expert.substr(1);	
	}
	console.log(expert);
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
						res.send(expertTweetList);
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


//the general function called when the extension is clicked
//retrieve tweets from twitter related to the article
function getTweets(q, res) {

	queryResults = []; //clear the results in case old results are still stored
	console.log("inside getTweets");
	//send a request to twitter for 'result_type=popular' results
	//this gets really messy, but the 8 queries from 'getQuery' used
	//in a nested format to get results from Twitter
	//we previously had it run in a loop, but it did not always execute in order,
	//so it would not leave the loop or would not return all of the results
	//this format ensures it always leaves the loop if and only if it has 
	//executed everything
	request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&q=" + q[0],
		oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
							consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
							access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
							access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
				json: true},
			function(error, response, tweets) {
				if(error || !tweets) {
					console.log("Query error");
					res.send(resultJSON);
					return false;
				}
  	 			else {
  	 				//add the returned tweets to the array
  	 				for(var item in tweets.statuses) {
	  	 				queryResults.push(tweets.statuses[item]);
	  	 			}
					request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&q=" + q[1],
						oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
											consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
											access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
											access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
								json: true},
							function(error, response, tweets) {
								if(error || !tweets) {
									console.log("Query error");
									res.send(resultJSON);
									return false;
								}
				  	 			else {
				  	 				for(var item in tweets.statuses) {
					  	 				queryResults.push(tweets.statuses[item]);
					  	 			}
									request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&q=" + q[2],
										oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
															consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
															access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
															access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
												json: true},
											function(error, response, tweets) {
												if(error || !tweets) {
													console.log("Query error");
													res.send(resultJSON);
													return false;
												}
								  	 			else {
								  	 				for(var item in tweets.statuses) {
									  	 				queryResults.push(tweets.statuses[item]);
									  	 			}
													request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&q=" + q[3],
														oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
																			consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
																			access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
																			access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
																json: true},
															function(error, response, tweets) {
																if(error || !tweets) {
																	console.log("Query error");
																	res.send(resultJSON);
																	return false;
																}
												  	 			else {
												  	 				for(var item in tweets.statuses) {
													  	 				queryResults.push(tweets.statuses[item]);
													  	 			}
																	request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&q=" + q[4],
																		oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
																							consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
																							access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
																							access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
																				json: true},
																			function(error, response, tweets) {
																				if(error || !tweets) {
																					console.log("Query error");
																					res.send(resultJSON);
																					return false;
																				}
																  	 			else {
																  	 				for(var item in tweets.statuses) {
																	  	 				queryResults.push(tweets.statuses[item]);
																	  	 			}
																					request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&q=" + q[5],
																						oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
																											consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
																											access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
																											access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
																								json: true},
																							function(error, response, tweets) {
																								if(error || !tweets) {
																									console.log("Query error");
																									res.send(resultJSON);
																									return false;
																								}
																				  	 			else {
																				  	 				for(var item in tweets.statuses) {
																					  	 				queryResults.push(tweets.statuses[item]);
																					  	 			}														  	 												
																									request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&q=" + q[6],
																										oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
																															consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
																															access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
																															access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
																												json: true},
																											function(error, response, tweets) {
																												if(error || !tweets) {
																													console.log("Query error");
																													res.send(resultJSON);
																													return false;
																												}
																								  	 			else {
																								  	 				for(var item in tweets.statuses) {
																									  	 				queryResults.push(tweets.statuses[item]);
																									  	 			}
																													request.get({url: "https://api.twitter.com/1.1/search/tweets.json?result_type=popular&lang=en&q=" + q[7],
																														oauth: { 	consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o', 
																																			consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1', 
																																			access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED', 
																																			access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'},
																																json: true},
																															function(error, response, tweets) {
																																if(error || !tweets) {
																																	console.log("Query error");
																																	res.send(resultJSON);
																																	return false;
																																}
																												  	 			else {
																												  	 				for(var item in tweets.statuses) {
																													  	 				queryResults.push(tweets.statuses[item]);
																													  	 			}
																													  	 			console.log(queryResults.length);
																												  	 				if (queryResults.length==0) {
																												  	 					console.log("No results");
																												  	 					//send an empty list to show there are not results
																												  	 					res.send(resultJSON);
																												  	 					return false;
																												  	 				}
																												  	 				//loop through all of the returned tweets
																													  	 			for (var key in queryResults) {
																													  	 				//check if the tweet has already been added to the final list
																																		var inArray = false;
																													  	 				for(var item in tweetList) {
																													  	 					if (tweetList[item]['text']==queryResults[key]['text']) {
																													  	 						inArray = true;
																													  	 						//if so, it will not be added again
																													  	 						break;
																													  	 					}
																													  	 				}

																													  	 				//now look at the name to see if it is an organization
																													  	 				var name = queryResults[key].user['name'];
																													  	 				name = name.toLowerCase();

																													  	 				var org_name = false;
																													  	 				//loop through the list given above to find matches
																													  	 				for (var sub in org_list) {
																													  	 					if (name.indexOf(org_list[sub])>=0) {
																													  	 						org_name = true;
																													  	 						break;
																													  	 					}
																													  	 				}

																													  	 				var tw_text = queryResults[key].text;

																													  	 				//check if there are too few or many followers
																													  	 				var followers = false;
																													  	 				if (queryResults[key].user['followers_count']<10000) {
																													  	 					followers = true;
																													  	 				}
																													  	 				if (queryResults[key].user['followers_count']>1000000) {
																													  	 					followers = true;
																													  	 				}

																													  	 				//if it says 'tune in' it usually is just an ad for a tv/radoi show
																													  	 				var pitch = false;
																													  	 				if (tw_text.indexOf("tune in")>=0) {
																													  	 					pitch = true;
																													  	 				}

																													  	 				//if the person is a correspondent, then their opinion is valuable
																													  	 				//set a counter that is used later in determining relevance
																													  	 				var corresp = 1;
																													  	 				if (queryResults[key].user['description'].toLowerCase().indexOf("correspondent")) {
																													  	 					pitch = false;
																													  	 					corresp = 3;
																													  	 				}
																													  	 				if (queryResults[key].user['description'].toLowerCase().indexOf("ambassador")) {
																													  	 					pitch = false;
																													  	 					corresp = 3;
																													  	 				}		
																													  	 				if (queryResults[key].user['description'].toLowerCase().indexOf("latest news")) {
																													  	 					corresp = 2;
																													  	 				}

																													  	 				//if the proper conditions are met, add the tweet to the final list
																													  	 				if (inArray==false && org_name==false && pitch==false && followers==false) {// && org_name==false && followers==false && pitch==false) {
																													  	 					console.log("added");
																													  	 					queryResults[key]['corresp'] = corresp;
																													  	 					tweetList.push(queryResults[key]);
																													  	 				}
																													  	 				//if it is the last tweet in the list, move to the next function
																													  	 				if(key==(queryResults.length-1)) {
																													  	 					return parseTweets(tweetList, res);
																													  	 				}
																													  	 			}
																												  	 			}
																												  	 		}
																												  	);
																												}
																											}
																										);
																								}
																							}
																						);
																				}
																			}
																		);
																}
															}
														);
												}
											}
										);
								}
							}
						);
				}
			}
		);
}

function parseTweets(tweets, res) {
	console.log("in parse tweets");
	resultJSON = []; //clear in case old results are stored
	console.log("Number of tweets: " + tweets.length);
	//go through the list of tweets
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
			//add them as JSON's to resultJSON
			resultJSON.push(newJSON);
	}
	//move to the next function
	if(resultJSON.length>0) {
		compareTweets(resultJSON, res);
		return false;
	}
	else {
		console.log("No results");
		//return an empty list to indicate nothing was found
		res.send(resultJSON);
		return false;
	}
}

//find the relevance of each tweet
function compareTweets(tweets, res) {
	console.log("inside compare tweets");
	var art_len = raw_text.length; //number of words in the article
	//loop through the tweets
	for (var i=0; i < tweets.length; i++) {
		//get the correspondent counter
		var corresp = tweets[i].corresp;
		//start the relevance at 0
		var tally = 0;
		//get the content of the tweet
		var content = tweets[i]['text'];
		content = content.toLowerCase();
		//normalize it
		for (var p in punct_list) {
			content = content.replace(punct_list[p], '');
		}
		content = content.replace('\n', ' ');
		content = content.replace('\t', ' ');
		content = content.split(' '); // split it into an array of words
		//loop through the words
		//combine them in unigrams, bigrams, trigrams, etc through the entire
		//list of words, so each individual word up to the entire tweet is
		//compared to the article
		for (var len = 1; len < content.length-1; len++) {
			for (var index = 0; index < (content.length - len + 1); index++) {
				//if the first and last words are not in the stoplist, procede
				if (stoplist.indexOf(content[index])<0 && stoplist.indexOf(content[index+len-1])<0) {
					var string = content.slice(index, index+len);
					string = string.join(' ');
					//find the position of the string in the article
					var pos = raw_text.indexOf(string);
					//if it is in the article, add to the relevance
					if (pos>=0) {
						//check if the string is a keyword returned by Alchemy
						for (var item in entities['keywords']) {
							if(string.indexOf(entities['keywords'][item]['text'])>=0) {
								//get the relevance assigned by Alchemy
								var relevance = parseFloat(entities['keywords'][item]['relevance']);
								//use the position in the article (the higher in the article, 
								//the higher the value) and the relevance to add to the final relevance
								tally+= (art_len - pos)*relevance;
								break;
							}
						}
					}
				}
			}
		}
		//add the relevance to it's json entry
		tweets[i]['count'] = tally*corresp;
		//if it is the last tweet, order the tweets based on relevance
		if (i==(tweets.length-1)) {
			tweets.sort(function(a,b) { return parseFloat(b.count) - parseFloat(a.count) } );
			//add the import information to the json being added to Firebase
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
			//add the information to Firebase
			addURLtoFirebase(store_url, author, store_title, json, res);
			return false;
		}
	}
	return false;
}

/*
#################################
==== Add queries to database ====
#################################
*/
var myDataRef = new Firebase('https://tweettalk.firebaseio.com/');

function addURLtoFirebase(url, author, title, tweets, res) {
	//strip the url of punctuation so it can be used as a key in Firebase
	for(var p in punct_list) {
		while(url.indexOf(punct_list[p])>=0) {
			url = url.replace(punct_list[p], '');
		}
	}
	//get day's date
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yy = today.getFullYear();
	var date = {'day': dd, 'month': mm, 'year': yy};
	console.log("addingurl");
	//store the author, title, tweets, and date in Firebase
	myDataRef.child('urls').child(url).set({
		'author': author,
		'title': title,
		'tweets': tweets,
		'updated': date
	});
	//return the results from Firebase
	//this seems inefficient, but it works around js' asynchronous functions
	//otherwise it returns inaccurate results for some reason
	checkIfURLinFirebase(url, res);
	return false;
}

//search for url stored in database
function checkIfURLinFirebase(url, res) {
	console.log("searching database")
	if(url) {
		var tempurl = url;
		//remove all punctuation in the url
		//(because of key requirements in Firebase)
		for(var p in punct_list) {
			while(url.indexOf(punct_list[p])>=0) {
				url = url.replace(punct_list[p], '');
			}
		}
		//search firebase
		var firebaseAPI = "https://tweettalk.firebaseio.com/urls/" + url + "/tweets.json";

		request.get(firebaseAPI, function(error, response, result) {
			if(!error && response.statusCode == 200) {
				if(result!='null') {
					//if the entry exists, retrieve it's 'last updated' date
					var dateUpdated = "https://tweettalk.firebaseio.com/urls/" + url + "/updated.json";
					request.get(dateUpdated, function(err, resp, result2) {
						if(!err && response.statusCode==200) {
							//it returns as a string, so parse it into a JSON
							//for evaluation
							var result2 = JSON.parse(result2);
							//create a date with the results
							var lastUpdated = new Date(result2['year'], result2['month'], result2['day']);
							//create today's date
							var today = new Date();
							//find the difference in milliseconds
							var diff = today-lastUpdated;
							//if more than 2 days have passed, run queries as if
							//it weren't in the database at all
							if(diff>=172800000) {
								console.log("updating");
								getQuery(tempurl, res);
								return false;
							}
							//otherwise return the results
							else {
								res.send(result);
								console.log("found");
								return false;
							}
						}
		//if nothing is listed in Firebase, continue with the search
						else {
							console.log("not found");
							getQuery(tempurl,res);
							return false;;
						}
					});
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

console.log("Server Listening at port 3000")
app.listen(3000);









