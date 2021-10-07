const process = require('process');

process.stdin.on('data', buffer => {
    const dataReversed = buffer.reverse().toString().split(/[\n|\n\r]/)[2];
    process.stdout.write(dataReversed);
});


