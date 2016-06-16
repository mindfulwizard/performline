var fs = require('fs');

//create hashtable of names
var hashtable;

fs.readFile('names.txt', 'utf8', function(err, contents) {
    if(err) {
        throw err;
    } else {
        hashtable = contents.split('\n');
        //console.log(hashtable);
    }
});

var output = {};

//stream the list
var listStream = fs.createReadStream('list.txt', {encoding: 'utf8'});

listStream.on('data', function(contents) {
    //when there's a newline in contents???
    checker(hashtable, contents);
})

listStream.on('end', function(contents) {
    process.stdout.write(output);
})


//checker function
function checker(namesArray, line) {
    namesArray.forEach(function(name) {
        if(name.toLowerCase() === line.toLowerCase()) {
            if(output[name]) {
                output[name].push(lineNumber)
            } else {
                output[name] = name;
                output[name].push(lineNumber);
            }
        }
    });
}
