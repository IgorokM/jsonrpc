const { RpcException, RpcExceptionMap } = require("../RpcServer");
const pool = require('../pool');

module.exports = async function SyncGet({ token }) {
    if (!token) {
        throw new RpcException(RpcExceptionMap.InvalidParams);
    }
    const sql = 'SELECT `player`, `data`, UNIX_TIMESTAMP(`time`) AS `time` FROM `sync` WHERE `player`=?';
    const [rows, fields] = await pool.execute(sql, [320462]);
    console.log(rows);
    return rows[0];
};