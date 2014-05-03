
var AlchemyAPI = require("./alchemyapi");
var alchemyapi = new AlchemyAPI();

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
'l', 'last', 'lately', 'later', 'latimescom', 'latter', 'latterly', 'least', 'less', 'lest', 
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
'z', 'zero'];

var punct_list = ['.', ',', ':', ';', "\'", "\"", '\\', '/', '?', '<', '>', '-', '_', '+', 
'=', '~', '!', '#', '$', '%', '&', '^', '*', '[', ']', '{', '}', '(', ')', '`']


var searchlist = ['believe', 'opinion', 'think'];

var text = "";
var author = "";

function getURL() {
	console.log("URL of article: ");
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	var util = require('util');
	var test;
	
	process.stdin.on('data', function(data) {
		var url = data.toString();
		test = main(url);
		console.log(test);
	});
}
getURL();

function main(url) {
	console.log('\n')
	alchemyapi.text('url', url, null, function(response) {
		text = response['text'];
		alchemyapi.title('url', url, null, function(response) {
			var art_title = response['title'];
			text = art_title + ' ' + text;

			alchemyapi.author('url', url, null, function(response) {
				author = response['author'];
				text = text.replace("By " + author, '');
				text = text.replace(author, '');

				var tempstr = "";

				for(var p in punct_list) {
					while(text.indexOf(punct_list[p])>=0) {
						text = text.replace(punct_list[p], '');
					}
				}

				text = text.split(" ");

				var index = text.indexOf('\n');
				do {
					if (index > -1) {
						text.splice(index, 1);
					}
					index = text.indexOf('\n');
				} while (index > -1);

				var index = text.indexOf('\t');
				do {
					if (index > -1) {
						text.splice(index, 1);
					}
					index = text.indexOf('\t');
				} while (index > -1);

				var index = text.indexOf('');
				do {
					if (index > -1) {
						text.splice(index, 1);
					}
					index = text.indexOf('');
				} while (index > -1);

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
				text = text.toLowerCase();

				alchemyapi.entities('text', text, null, function(response) {
					console.log("#### Entities ####");
					var query = [];
					var positions = [];
					var people = [];
					var max = 5;
					var people_count = 0;
					for(var entity in response['entities']) {
						var qlen = query.length;
						if(qlen==max) {
							break;
						}
						if(response['entities'][entity]['type']=='Person') {
							var person = response['entities'][entity]['text'].split(" ");
							var len = person.length;
							person = person[len-1];
							query.push(person);
							people.push(person);
							people_count+= 1;
							if(people_count==2) {
								max+= 1;
								people_count = 0;
							}
						}
						else if(response['entities'][entity]['type']=="JobTitle") {
							positions.push(response['entities'][entity]['text']);
							query.push(response['entities'][entity]['text']);
							max+= 1;
						}
						else {
							query.push(response['entities'][entity]['text']);
						}
					}
					var num = 1;
					for(var i in query) {
						console.log(String(num) + '. ' + query[i]);
						num+= 1;
					}
					console.log('\n#### People ####');
					var num = 1;
					for(var i in people) {
						console.log(String(num) + '. ' + people[i]);
						num+= 1;
					}
					console.log('\n#### Job Titles ####');
					var num = 1;
					for(var i in positions) {
						console.log(String(num) + '. ' + positions[i]);
						num+= 1;
					}
					//console.log('\n');
				});

/*				alchemyapi.keywords('text', text, null, function(response) {
					console.log("#### Keywords ####");
					for(var keyword in response['keywords']) {
						console.log(response['keywords'][keyword]['text']);
					}
					console.log('\n');
				});
*/
				//console.log(text);
				//console.log('\n');
				return text;
			})
			return text;
		});
	});
}

