const http = require('http');
const express = require("express")
// Custom files

const app = express();

app.use('/add-product', (req, res, next) => {
    console.log("In the another middleware")
    res.send('<h1>The add product page</h1>');
});

app.use('/', (req, res, next) => {
    console.log("In the another middleware")
    res.send('<h1>Hello</h1>');
});

app.listen(3000);