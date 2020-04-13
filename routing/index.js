const express = require('express');
const app = express();

app.get('/users/:id/:postId?', (req, res)=> {
    res.send(req.params);
})

app.get('/contact', (req, res) => {
    res.send('Contact Page!');
});

app.post('/contact', (req, res)=> {
    res.send('Contact Page POST Method');
});

/*app.all('/', (req, res)=> {
    res.send('Hi this is app.all()');
});*/


app.listen(3000, () => {
    console.log('express server is working');
});