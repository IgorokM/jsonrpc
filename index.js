const express = require('express');
const bodyParser = require('body-parser'); 



const app = express();

const port = 3000;

app.get('/', hendler);

app.listen(port, () => console.log(`server start on port: ${port}`));

function hendler(request, response) {
    response.json({igor:'igor'});
}