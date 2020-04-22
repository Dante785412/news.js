const NEWS_API_KEY = '6d99e08921434e1b9c2e043c7991977a';

var request = require('request');
var yargs   = require('yargs');
function printUsage(){
    console.log('                           ___---|||HELP|||---___ \n Usage: node news.js <category>');
    console.log('Categories: business entertainment general health science sports technology');

}

var args = yargs
    .option ('c', {
         'describe':'NEWS category of interest',
         'alias': 'category',
         'choices': ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
         'type': 'string',
         'default': 'busines',
         'demandOption': 'false'

    })
    .argv;

console.log(args);
console.log('Category: ' + args.category);
process.exit(0);
//console.log(process.argv);
//var category = process.argv[2] || 'business';

//variablen
var category = 'business'; // parameter -c
var country = 'de';  // parameter -l
var numArgs = process.argv.length;
var currentArg;

for(var i = 2; i< numArgs; i++ ) {
    currentArg = process.argv[i];
    if (currentArg === '-h' || currentArg === '--h'){
        printUsage();
        process.exit(0);
    }else if ((currentArg === '-c'|| currentArg === '-category') && numArgs > i) {
        i += 1;
        category = process.argv[i];
    }else if ((currentArg === '-l' || currentArg === '-country')&& numArgs > i) {
        i += 1;
        country = process.argv[i];
    }
}



request(
    'https://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=' + NEWS_API_KEY + '&category=' + category, function (error, response, body){
    
        if (response.statusCode === 200) {
            var bodyObj = JSON.parse(body);
            console.log('Ergebnisse insgesamt: ' + bodyObj.totalResults);
        }

        for(var i = 0; i < 5 ; i++) { //statt 5 stand <bodyObj.articles.length>
            console.log((i+1) + ', ' + bodyObj.articles[i].title);
        }
        
});







