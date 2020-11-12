const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./static'));
app.get(/[\w\W]*/, function (req, res) {
    res.redirect('/');
})

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});