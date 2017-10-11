const http = require('http');

let count = 0;

const server = http.createServer((request, response) => {
    response.write(`You are the ${count++} user access`);
    response.end();
});


server.listen(8080, '0.0.0.0', (error) => {
    if (error) {
        throw error;
    }
    console.log('Server is listening on 8080');
});