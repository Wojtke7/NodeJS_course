
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write("<html>")
        res.write('<head><title>Hello World!</title></head>');
        res.write('<body>');
        res.write('<h1>Hello world</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>');
        res.write('</body>');
        res.write('</html>');
    }
    if (url === '/users') {
        res.write("<html>")
        res.write('<head><title>Users</title></head>');
        res.write('<body><ul><li>User 1</li></ul></body>');
        res.write('</html>');
    }
    if (url === '/create-user' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const bodyString = Buffer.concat(body).toString();
            console.log(bodyString.split("=")[1]);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
}

module.exports = requestHandler;