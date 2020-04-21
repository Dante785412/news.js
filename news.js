const NEWS_API_KEY = '6d99e08921434e1b9c2e043c7991977a';

var request = require('request');

//console.log(process.argv);
//var category = process.argv[2] || 'business';

//variablen
var parameter =process.argv[2];
var category = process.argv.length > 2 ? process.argv[2] : 'business';


request('https://newsapi.org/v2/top-headlines?country=de&apiKey=' + NEWS_API_KEY + '&category=' + category, function (error, response, body){
    
    if (response.statusCode === 200) {
        var bodyObj = JSON.parse(body);
        console.log('Ergebnisse insgesamt: ' + bodyObj.totalResults);
    }

    for(var i = 0; i < 5 ; i++) { //statt 5 stand <bodyObj.articles.length>
        console.log((i+1) + ', ' + bodyObj.articles[i].title);
    }
    
});







