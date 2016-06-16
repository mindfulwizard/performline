const fs = require('fs');
const readline = require('readline');

//create hashtable of names
var linecounter = 0;
var hashtable;
var output = {};

const contents = fs.readFileSync('names.txt', 'utf8');
hashtable = contents.split('\n');
//console.log(hashtable);

const rl = readline.createInterface({
    input: fs.createReadStream('list.txt', {encoding: 'utf8'})
});

rl.on('line', (line) => {
    checker(hashtable, line, linecounter);
    linecounter++;
}).on('close', () => {
    //process.stdout.write(output);
    console.log(output);
});

//checker function
function checker(namesArray, phrase, lineNumber) {
    namesArray.forEach(function(name) {
        if(name.toLowerCase() === phrase.toLowerCase()) {
            if(output[name]) {
                output[name].push(lineNumber)
            } else {
                output[name] = [];
                output[name].push(lineNumber);
            }
        }
    });
}