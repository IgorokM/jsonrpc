const app = require('express')();
const bodyParser = require('body-parser');
const { RpcServer } = require('./RpcServer');
const ApiMap = require('./ApiMap');


const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';
const bodyJsonParser = bodyParser.json();
const server = new RpcServer(ApiMap);

app.post('/', bodyJsonParser, finishHendler);

app.listen(port, hostname, () => console.log(`server start on port: ${port}`));

async function finishHendler(req, res) {
    try {
        res.json(await server.process(req.body));
    } catch (e) {
        res.json(e);
    }
}