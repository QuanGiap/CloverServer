const { storage } = require("../FireBase/FireBase");


function getPublicUrl(fileName){
    const file = storage.bucket().file(fileName);
    return file.publicUrl();
}
module.exports = {getPublicUrl};
