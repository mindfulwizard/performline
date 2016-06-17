const fs = require('fs');
const readline = require('readline');

const contents = fs.readFileSync('names.txt', 'utf8');
const output = contents.split('\n').reduce((obj, elem) => {
    obj[elem.toLowerCase()] = [];
    return obj;
}, {});

var linecounter = 1;

const rl = readline.createInterface({
    input: fs.createReadStream('list.txt', {encoding: 'utf8'})
});

rl.on('line', (line) => {
        checker(line, linecounter);
        linecounter++;
    })
    .on('close', () => {
        logger(output);
    });

function checker(phrase, lineNumber) {
    var name = phrase.toLowerCase().trim();
    if(Array.isArray(output[name])) {
        output[name].push(lineNumber);
    }
}

function logger(obj) {
    for(var key in obj) {
        process.stdout.write(`${key}: ${obj[key].join()} \n`);
    }
}