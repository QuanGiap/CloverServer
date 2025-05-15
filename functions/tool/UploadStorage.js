const { storage } = require("../FireBase/FireBase");

async function uploadStorage(path,file){
    const bucket = storage.bucket();
    const filePath = path + file.filename;
    const fileUpload = bucket.file(filePath);
    const stream = fileUpload.createWriteStream({
        metadata: {
            contentType: file.mimeType,
        },
    });
    return new Promise((resolve, reject) => {
        stream.on("error", (error) => {
            console.error("Error uploading file:", error);
            reject(error);
        });

        stream.on("finish", () => {
            fileUpload.makePublic().then(()=>resolve(filePath));
        });

        stream.end(file.buffer);
    });
}
module.exports = uploadStorage;