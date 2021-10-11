const fs = require('fs');
const csv = require('csvtojson');

const filePath = 'csv/nodejs-hw1-ex1.csv';
const fileName = 'nodejs-hw1-ex1.txt';

const readStream = fs.createReadStream(filePath);

const writeStream = fs.createWriteStream(fileName);

csv()
    .fromStream(readStream)
    .preFileLine((line, index) => {
        return (index === 0) ? line.toLowerCase() : line;
    })
    .subscribe(json => {
        return new Promise(resolve => {
            writeStream.write(JSON.stringify(json) + '\r\n');
            return resolve(json);
        })
    }, error => console.dir(error), () => console.dir(fileName + ' is successfully created.'));



