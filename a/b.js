var createjson = require('../createjson')
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
var date = moment().format('YYYY-MM-DD HH:mm:ss')

const keyword = {
    id: "james",
    keywords : "ipad7 32gb",
    date : date
}

createjson.makeJson(keyword)
