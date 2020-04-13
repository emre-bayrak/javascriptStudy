const fs     = require('fs');
const http   = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
    /*fs.readFile('demo.txt', (err, data) => {
        if (err)
            throw err;

        res.end(data);
    });*/

    const readStream = fs.createReadStream('demo.txt');
    readStream.pipe(res);

});


server.listen(3000);