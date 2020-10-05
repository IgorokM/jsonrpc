const express = require('express');
const bodyParser = require('body-parser');
const { RpcServer } = require('./RpcServer');
const ApiMap = require('./ApiMap');



const app = express();
const port = process.env.PORT || 3000;
const bodyParserJson = bodyParser.json();
const server = new RpcServer(ApiMap);

app.use(bodyParserJson);

app.post('/', hendler);

app.listen(port, () => console.log(`server start on port: ${port}`));

async function hendler(request, response) {
    const body = request.body;
    let result = null;
    try {
        result = await server.process(body);
    } catch (e) {
        result = e;
    }
    response.json(result);
}