const { RpcException, RpcExceptionMap } = require("../RpcServer");
const pool = require('../pool');

module.exports = async function SyncGet({ token }) {
    if (!token) {
        throw new RpcException(RpcExceptionMap.InvalidParams);
    }
    const sql = 'SELECT UNIX_TIMESTAMP(`time`) AS `time`, `data` FROM `sync` WHERE `player`=?';
    const [rows] = await pool.execute(sql, [320462]);
    return rows[0];
};