const express = require('express');
const app = express();

app.use(express.static('./public'));
app.use(express.static('./node_modules'));

app.listen(process.env.PORT || 3333, function () {
    console.log(`Server is running at ${process.env.PORT || 3333}`);
});