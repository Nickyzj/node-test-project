const http = require('http');

let count = 0;

const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/html;charset=utf8"})
    response.write(`You are the ${count++} user access<br>`);
    response.write(`你是第${count}个访问者`);
    response.end();
});


server.listen(8080, '0.0.0.0', (error) => {
    if (error) {
        throw error;
    }
    console.log('Server is listening on 8080');
});