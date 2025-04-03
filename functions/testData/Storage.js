const fs = require('fs')
const path = require('path')
async function uploadFolder(localFolderPath, storageFolderPath,bucket) {
    const items = fs.readdirSync(localFolderPath, { withFileTypes: true });

    for (const item of items) {
        const localItemPath = path.join(localFolderPath, item.name);
        const storageItemPath = path.join(storageFolderPath, item.name).replace(/\\/g, "/");

        if (item.isDirectory()) {
            // Recursively upload subfolder
            await uploadFolder(localItemPath, storageItemPath + "/");
        } else {
            // Upload file
            await bucket.upload(localItemPath, {
                destination: storageItemPath,
                metadata: { cacheControl: "public, max-age=31536000" },
            });

            console.log(`Uploaded: ${storageItemPath}`);
        }
    }
}
module.exports = uploadFolder