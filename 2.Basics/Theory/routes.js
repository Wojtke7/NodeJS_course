const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write("<html>")
        res.write('<head><title>Hello World!</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end(); 
    }
    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write("<html>")
    res.write('<head><title>Hello World!</title></head>');
    res.write('<body><h1>Hello world</h1></body>');
    res.write('</html>');
    res.end();
};

// Shortcut 
exports.handler = requestHandler;
exports.someText = someText;

// module.exports = {
//     handler: requestHandler,
//     someText: "Some hard coded text"
// };

// Also available
// module.exports.handler = requestHandler;
// module.exports.someText = someText;

// Shortcut 
// exports.handler = requestHandler;
// exports.someText = someText;