const fs = require('fs');
const readline = require('readline');

const contents = fs.readFileSync('names.txt', 'utf8');
var names = contents.split('\n');
var linecounter = 0;
var output = {};

const rl = readline.createInterface({
    input: fs.createReadStream('list.txt', {encoding: 'utf8'})
});

rl.on('line', (line) => {
        checker(names, line, linecounter);
        linecounter++;
    })
    .on('close', () => {
        logger(output);
    });

function checker(namesArray, phrase, lineNumber) {
    namesArray.forEach((name) => {
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

function logger(obj) {
    for(var key in obj) {
        process.stdout.write(`${key}: ${obj[key].join()} \n`);
    }
}