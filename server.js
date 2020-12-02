const express = require('express');

const app = express();
const PORT = 80;

app.use(express.static('./static'));
app.use((req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
})

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});