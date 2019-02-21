const fs = require('fs');
const path = require('path');
const _path = path.resolve(__dirname, 'dist');
const deleteFolderFile = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                deleteFolderFile(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
    }
}
module.exports = {
    deleteFolderFile: deleteFolderFile
}

