const { db } = require("../FireBase/FireBase");

async function getPlaces(){
    const placesRef = await db.collection('places').get();
    return placesRef.docs.map(doc=>doc.data());
}


module.exports = { getPlaces };