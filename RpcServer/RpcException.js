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

module.exports = {RpcException, RpcExceptionMap};