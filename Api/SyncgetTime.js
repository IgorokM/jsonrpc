const { RpcException, RpcExceptionMap } = require("../RpcServer");
const pool = require('../pool');
const jwt = require('jsonwebtoken');

module.exports = async function SyncGetTime({ token }) {
    let result = null;
    if (!token) {
        throw new RpcException(RpcExceptionMap.InvalidParams);
    }

    const payload = jwt.decode(token);

    if (payload === null || payload.product !== 'solitaire') {
        throw new RpcException(RpcExceptionMap.InvalidParams);
    }
    const player = Number(payload.sub);

    if (player === 0 && player === NaN) {
        throw new RpcException(RpcExceptionMap.InvalidParams);
    }

    const sql = 'SELECT UNIX_TIMESTAMP(`time`) AS `time` FROM `sync` WHERE `player`=?';
    const con = await pool.getConnection();
    console.log(con.threadId);
    const [rows] = await con.execute(sql, [player]);
    con.release();
    result = rows[0];
    return result;
};