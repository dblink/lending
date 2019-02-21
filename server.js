let express = require('express');
let fs = require('fs');
let mime = require('mime');
//let https = require('https');
let http = require('http');

let app = express();

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get(/.*/, (req, res)=>{
    let _path = __dirname + req.path;
    let _isExits = fs.existsSync(_path);
    if(!_isExits){
        if(req.path.indexOf('.') === -1){
            res.sendFile(__dirname + '/index.html');
            return;
        }
        res.status(404);
        return res.send(`console.log('未找到该页面')`).end();
    }
    
    res.type(mime.getType(_path));
    res.sendFile(_path);
    res.status(200);
});
let server = http.createServer(app);
server.listen(3000);
console.log('Test Demo listening at http://localhost:%s', '3000')
/*let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});*/