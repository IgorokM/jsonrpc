const { RpcException, RpcExceptionMap } = require("../RpcServer");
const pool = require('../pool');

module.exports = async function SyncGetTime({ token }) {
    let result = null;
    if (!token) {
        throw new RpcException(RpcExceptionMap.InvalidParams);
    }

    const sql = 'SELECT `time` FROM `sync` WHERE `player`=?';
    const con = await pool.getConnection();
    console.log(con.threadId);
    const [rows] = await con.execute(sql, [320462]);
    con.release();
    result = rows[0];
    return result;
};