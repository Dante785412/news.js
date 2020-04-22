require ('dotenv').config();

var request = require('request');
var yargs   = require('yargs');

var args = yargs
    .option ('c', { //category
         'describe':'NEWS category of interest',
         'alias': 'category',
         'choices': ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
         'type': 'string',
         'default': 'business',
         'demandOption': 'false'

    }).option ('n', { //artikelNum
        'describe':'Number of Artikles',
        'alias': 'num',
        'type': 'number',
        'default': '5',
        'demandOption': 'false'

   }).option ('l', { //location
        'describe':'Country code of interest(e.g., "de", "uk", etc. ',
        'alias': 'country',
        'type': 'string',
        'default': 'de',
        'demandOption': 'false'

   }).help('h')
    .argv;

//variablen
var num = args.num;

var requestOptions = {
    url:'https://newsapi.org/v2/top-headlines',
    qs: {
        country: args.country,
        apiKey: process.env.NEWS_API_KEY,
        category:args.category
    }
};



request(
    requestOptions, 
    function (error, response, body){
    
        if (response.statusCode === 200) {
            var bodyObj = JSON.parse(body);
            console.log('Ergebnisse insgesamt: ' + bodyObj.totalResults);
        }

        for(var i = 0; i < num ; i++) { //statt 5 stand <bodyObj.articles.length>
            console.log((i+1) + ', ' + bodyObj.articles[i].title);
            console.log('    ' + bodyObj.articles[i].url );
        }
        
});







