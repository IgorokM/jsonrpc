class RpcServer {
    #apiMap = [];
    constructor(apiMap) {
        this.apiMap = apiMap;
    }

    process(clientData) {
        const result = {
            id: 0,
            jsonrpc: '2.0',
            result: null
        };

        if (!RpcServer.isValidRpcData(clientData)) {
            throw new RpcException('wefewfewf');
        }

        return result;
    }

    static isValidRpcData(d) {
        const jsonrpcOk = ('jsonrpc' in d) && d.jsonrpc === '2.0';
        const idOk = ('id' in d) && Number.isInteger(d.id);
        const methodOk = ('method' in d) && (typeof d.method === 'string' || d.method instanceof String) && d.method !== '';
        const paramsNullOk = ('params' in d) && d.params === null;
        const paramsOk = ('params' in d) && (typeof d.params === 'object' || Array.isArray(d.params));

        return idOk && jsonrpcOk && methodOk && (paramsNullOk || paramsOk);
    }
}

/**
 * -32700 Parse error Invalid -     JSON was received by the server. An error occurred on the server while parsing the JSON text.
*  -32600 Invalid Request -         The JSON sent is not a valid Request object.
*  -32601 Method not found -        The method does not exist / is not available.
*  -32602 Invalid params -          Invalid method parameter(s).
*  -32603 Internal error -          Internal JSON-RPC error.
*  -32000 to -32099	Server error -  Reserved for implementation-defined server-errors.
 */



class RpcException {
    // RpcmapError = {
    //     InternalError: -32603
    // };
    // #jsonFormat
    #code;
    constructor(code) {
        this.code = code;
    }

    jsonFormat() {
        return { code: this.code };
    }
}

module.exports = { RpcException, RpcServer };