/*
###########################
==== File Requirements ====
###########################
*/
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
'z', 'zero', '-']

var punct_list = ['.', ',', ':', ';', "\'", "\"", '\\', '/', '?', '<', '>', '-', '_', '+', 
'=', '~', '!', '#', '$', '%', '&', '^', '*', '[', ']', '{', '}', '(', ')', '`']

var searchlist = ['believe', 'opinion', 'think'];

/*
########################################
==== Strings to Pull Out of Article ====
########################################
*/
var text = "";
var author = "";
var query = []; // most relevant entities
var positions = []; // sublist of job positions
var people = []; // sublist of people
var resultJSON = {}; // stores json of relevant tweets
var top5 = [];
var count = 0;

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
getURL();

/*
###############################
==== Create Query Keywords ====
###############################
*/
function getQuery(url) {
	console.log('\n')
	alchemyapi.text('url', url, null, function(response) {
		//get the text from the article
		text = response['text'];
		alchemyapi.title('url', url, null, function(response) {
			//get the article title
			var art_title = response['title'];
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
				// remove stoplist words
				var templist = [];
				for(var word in text) {
					if (stoplist.indexOf(text[word])>= 0) {
						continue;
					}
					else {	
						templist.push(text[word]);
					}
				}
				text = templist;
				text = text.join(" ");
				// make text lowercase
				text = text.toLowerCase();

				/*
				##########################
				==== Extract Entities ====
				##########################
				*/				
				alchemyapi.entities('text', text, null, function(response) {
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
					return getTweets(cQ);
					
					// if(typeof tempJSON!='undefined') {
					// 	console.log(tempJSON);
					// }
				
				});
			})
		});
	});
}

function receiveQuery(text, people, positions) {
	console.log(text);
	console.log(people);
	console.log(positions);
}

function updateQuery(text, people, positions) {
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
	var text = array[0];
	var people = array[1];
	var positions = array[2];
	var queries = []
	var string = ""
	for (var i in text) {
		for (var s in searchlist) {
			for (var i2 in text) {
				if (i!=i2) {
					string = text[i] + ' ' + text[i2] + ' ' + searchlist[s];
					queries.push(string);
				}
			}
			for (var i3 in people) {
				string = text[i] + ' ' + people[i3] + ' ' + searchlist[s];
				queries.push(string);
			}
			for (var i4 in positions) {
				string = text[i] + ' ' + positions[i4] + ' ' + searchlist[s];
				queries.push(string);
			}
		}
	}
	return queries;
}

function getTweets(queries) {
	//console.log(queries);
	var i = 0;
	var len = queries.length - 1;
	var query = 0;
	while (query<20) {
	//	console.log(String(query) + '/' + String(queries.length-1));
	//	console.log(queries[query]);
		T.get('search/tweets', {q: queries[query], count: 100}, function(err, response) {
	//		console.log(queries[query]);
			if (!response) {
				console.log(err);
			}
			else if(response.statuses.length>0) {
				for (var key in response.statuses) {
					if(response.statuses[key].retweeted==false && response.statuses[key].user['verified']==true) {

						count++;

						alchemyapi.entities('text', response.statuses[key].name, null, function(response) {
							if(response['entities'][0]['type']=='Person') {

								var id = response.statuses[key].id;
								resultJSON[id] = {};
								resultJSON[id].name = response.statuses[key].user['name'];
								resultJSON[id].handle = response.statuses[key].user['screen_name'];
								resultJSON[id].text	= response.statuses[key].text;
								resultJSON[id].profile_image = response.statuses[key].user['profile_image_url'];
								resultJSON[id].background_image = response.statuses[key].user['profile_banner_url'] + '/web';
								resultJSON[id].followers = response.statuses[key].user['friends_count'];
								if(count==5) {
									console.log(resultJSON);
								}
							}
						});
					}
				}	
			}
		});
		query++;
	}
} 

function printQuery() {
 	console.log(top5);
 	return;
}




