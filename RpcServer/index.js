/**
 * -32700 Parse error Invalid -     JSON was received by the server. An error occurred on the server while parsing the JSON text.
 *  -32600 Invalid Request -         The JSON sent is not a valid Request object.
 *  -32601 Method not found -        The method does not exist / is not available.
 *  -32602 Invalid params -          Invalid method parameter(s).
 *  -32603 Internal error -          Internal JSON-RPC error.
 *  -32000 to -32099	Server error -  Reserved for implementation-defined server-errors.
 */



const RpcExceptionMap = {
    ParseError: { code: -32700, message: 'Parse error Invalid' },
    InvalidRequest: { code: -32600, message: 'Invalid Request' },
    InvalidParams: { code: 32602, message: 'Invalid Params' },
    InternalError: { code: -32603, message: 'Internal Error' },
    MethodNotFound: { code: -32601, message: 'Method not found' }
};

class RpcException {
    constructor(exception) {
        this.exception = exception;
    }
    call(id = 0) {
        return { id, jsonrpc: '2.0', error: this.exception };
    }
}

class RpcServer {
    #apiMap = [];
    constructor(apiMap) {
        this.apiMap = apiMap;
    }

    async process(clientData) {
        const result = {
            id: 0,
            jsonrpc: '2.0',
            result: null
        };

        if (!RpcServer.isValidRpcData(clientData)) {
            throw new RpcException(RpcExceptionMap.InvalidRequest).call();
        }

        // const method = clientData.method;
        // const params = clientData.params;
        const { id, method, params } = clientData;

        if (!this.hasMethod(method)) {
            throw new RpcException(RpcExceptionMap.MethodNotFound).call(id);
        }
        result.id = id;
        try {
            result.result = await this.callMethod(method, params);
        } catch (e) {
            if (e instanceof RpcException) {
                return e.call(id);
            } else {
                const message = e.message;
                const code = e.name;
                throw new RpcException({ code, message }).call(id);
            }
        }

        return result;
    }

    callMethod(clientMethod, params) {
        return this.apiMap[clientMethod](params);
    }

    hasMethod(clientMethod) {
        return clientMethod in this.apiMap;
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

module.exports = { RpcException, RpcServer, RpcExceptionMap };