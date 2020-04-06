let fs = require('fs'); 
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

var date = moment().format('YYYY-MM-DD HH:mm:ss')
console.log("검색 요청 시간 : ", date);
// json 파일 생성하기

function makeJson(x){
    
    const keywordJSON = JSON.stringify(x)
    const parsedData = JSON.parse(keywordJSON)
    console.log(keywordJSON)
    console.log(parsedData.keywords)
    fs.writeFileSync('keywords.json', keywordJSON)
}
function readJson(x){
    
    // json 파일 읽기

    const dataBuffer = fs.readFileSync(x)
    const dataJSON = dataBuffer.toString();
    console.log(dataJSON);
    // json 파일 데이터 파싱
    const data = JSON.parse(dataJSON)
    console.log(data.keywords)
}

module.exports.makeJson = makeJson;
module.exports.readJson = readJson;