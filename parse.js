var fs = require("fs");
var csv = require("fast-csv");
var parse = require('csv-parse');
var Shelter_name = null;
var subject = [];
fs.readFile('./source/高雄市各項災害避難收容場所一覽表104年7月30日更正.csv', function(err, body) {
    // console.log(body);
    var subject = [];
    parse(body.toString(), null, function(err, output) {
        output.forEach(function(o) {
            // console.log(o.length);
            var obj = {};
            for (var i = 0; i < o.length; ++i) {
                o[i] = o[i].trim();
            }
            if (/^高雄市因應各項災害避難收容處所一覽表/.test(o[0]) || /^共計規劃/.test(o[0]) || /^項次/.test(o[0]) || /^總計/.test(o[18])) {
                return;
            }
            //編號
            obj.num = o[1];

            //收容所名稱
            obj.name = o[2];
            //地區
            obj.area = o[5];
            //收容所聯絡人電話
            obj.phone = o[11];

            //收容所聯絡人手機
            obj.tel = o[12];

            //地址
            obj.address = o[14] + o[15] + o[16] + o[17];

            //可收那人數
            obj.people = o[19];
            //目前人數
            obj.nowpeople=Math.floor(Math.random() * 200);
            //通用災害
            var type = o[20].split('\n');
            function deleteArr() {
                for (i = 0; type.length > i; i++) {
                    if (type[i].substring(0, 1) == "□") {
                        type.splice(i, 1);
                        deleteArr();
                        break;
                    }
                }
            }
            deleteArr();
            for (i in type) {
                type[i] = type[i].slice(1);
            }
            obj.type = type;
            //加入物件
            subject.push(obj);
        });
        fs.writeFile('./output/data.json', JSON.stringify(subject), function(err) {
            console.log('success');
        });
    });


});
