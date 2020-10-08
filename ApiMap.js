const syncGet = require('./Api/SyncGet');
const syncGetLastTime = require('./Api/SyncgetTime');

const ApiMap = {
    sync_get: syncGet,
    sync_get_last_time: syncGetLastTime
};


module.exports = ApiMap;