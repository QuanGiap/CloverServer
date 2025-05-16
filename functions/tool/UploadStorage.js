const { storage } = require("../FireBase/FireBase");

async function uploadStorage(path, file) {
    const bucket = storage.bucket();
    const filePath = path + file.filename;
    const fileUpload = bucket.file(filePath);

    return new Promise((resolve, reject) => {
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimeType,
            },
        });

        stream.on("error", (error) => {
            console.error("Error uploading file:", error);
            reject(error);
        });

        stream.on("finish", async () => {
            try {
                await fileUpload.makePublic();
                console.log("File uploaded successfully:", filePath);
                resolve(filePath);
            } catch (err) {
                reject(err);
            }
        });

        // Write the buffer to the stream
        stream.end(file.buffer);
    });
}

module.exports = uploadStorage;