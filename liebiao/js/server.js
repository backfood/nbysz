const http = require("http");
const url = require("url");
const fs = require("fs");
var server = http.createServer();
server.on("request",(req,res)=>{
    var data = (url.parse(req.url,"query").query);
    var page = data.page;
    var pageSize = data.pageSize;
    var cb = data.callback;
    var myjson ;
    fs.readFile(__dirname+"//../data.json","utf8",(err,data)=>{
        myjson = JSON.parse(data.toString());
        var start = (page-1)*pageSize<0?0:(page-1)*pageSize;
        if(start>myjson.length-1){
            res.end(`${cb}([])`);
        }else{
            var end = page*pageSize-1
            if(end>=myjson.length-1){
                var result = JSON.stringify(myjson.slice(start));
            }else{
                var result = JSON.stringify(myjson.slice(start,end+1));
            }
            res.end(`${cb}(${result})`);
        }
    })
})
server.listen(8888,()=>{
    console.log('服务已经启动')
})
