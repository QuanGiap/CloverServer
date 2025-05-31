const Busboy = require("busboy");

/**
 * Handles file uploads and parses fields.
 * - If fieldname is 'json', parses the file as JSON and returns the object.
 * - If fieldname is 'flag' or 'stamp', returns the image file buffer and info.
 * @param {object} req - Express request object
 * @returns {Promise<object>} - Resolves with { json: object|null, flag: file|null, stamp: file|null }
 */
function handleFileUpload(req) {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });
    const result = { json: null, flag: null, stamp: null };

    busboy.on("file", (fieldname, file, { filename, mimeType }) => {
      let buffers = [];
      file.on("data", (data) => buffers.push(data));
      file.on("end", () => {
        const buffer = Buffer.concat(buffers);
        if (fieldname === "json") {
          try {
            result.json = JSON.parse(buffer.toString("utf8"));
          } catch (e) {
            return reject(new Error("Invalid JSON file"));
          }
        } else if (fieldname === "flag" || fieldname === "stamp") {
          result[fieldname] = {
            filename,
            mimeType,
            buffer,
          };
        }
      });
    });

    busboy.on("finish", () => resolve(result));
    busboy.on("error", reject);

    // Firebase provides the entire body as raw buffer
    busboy.end(req.rawBody);
  });
}

module.exports = handleFileUpload;