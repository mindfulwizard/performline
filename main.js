const fs = require('fs');
const readline = require('readline');

//made the assumption that the names fit into memory
const contents = fs.readFileSync('names.txt', 'utf8');

//created a hashtable out of names to be used in lookup and also to store answer values, aka line numbers
const output = contents.split('\n').reduce((obj, elem) => {
    obj[elem.toLowerCase()] = [];
    return obj;
}, {});

var linecounter = 1;

//using streams allows very large data sources (from databases, hard drives, etc) to be used without maxing out memory
const rl = readline.createInterface({
    input: fs.createReadStream('list.txt', {encoding: 'utf8'})
});

//checker function is run on every line streamed, when that stream ends answers are written from memory to new stream process.stdout
rl.on('line', (line) => {
    checker(line, linecounter);
    linecounter++;
})
.on('close', () => {
    logger(output);
});

function checker(phrase, lineNumber) {
    const name = phrase.toLowerCase().trim();
    //isArray check is necessary to ensure the Javascript object 'constructor' property isn't matched with the word 'constructor' in the stream
    if(Array.isArray(output[name])) {
        output[name].push(lineNumber);
    }
}

function logger(obj) {
    for(var key in obj) {
        process.stdout.write(`${key}: ${obj[key].join()} \n`);
    }
}