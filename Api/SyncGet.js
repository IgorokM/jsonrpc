const { RpcException, RpcExceptionMap } = require("../RpcServer");
const pool = require('../pool');
const jwt = require('jsonwebtoken');

module.exports = async function SyncGet({ token }) {
    if (!token) {
        throw new RpcException(RpcExceptionMap.InvalidParams);
    }
    const payload = jwt.decode(token);

    if(payload === null || payload.product !== 'solitaire'){
        throw new RpcException(RpcExceptionMap.InvalidParams);
    }
    const player = Number(payload.sub);

    if(player === 0 && player === NaN){
        throw new RpcException(RpcExceptionMap.InvalidParams);
    }

    const sql = 'SELECT UNIX_TIMESTAMP(`time`) AS `time`, `data` FROM `sync` WHERE `player`=?';
    const [rows] = await pool.execute(sql, [player]);
    return rows[0];
};