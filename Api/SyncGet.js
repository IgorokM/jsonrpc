const { RpcException, RpcExceptionMap } = require("../RpcServer");

module.exports = function SyncGet({ token }) {
    let result = null;
    if (!token) {
        throw new RpcException(RpcExceptionMap.InvalidParams);
    }
    result = token;
    return result;
}