const httpModule = require('http');

const server = new httpModule.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello World!');
        res.end();
    }
    if(req.url === '/secondpage') {
        res.write('Welcome to page 2!');
        res.end();
    }
});

server.on('connection', (socket) => {
    console.log('New connection received')
})

server.listen(3000)