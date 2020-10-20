const { RpcException, RpcExceptionMap } = require("./RpcException");

class RpcServer {

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

module.exports = { RpcServer };