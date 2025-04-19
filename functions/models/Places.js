const { db } = require("../FireBase/FireBase");

async function getPlaces(){
    const placesRef = await db.collection('places').get();
    return placesRef.docs.map(doc=>({
        id:doc.id,
        ...doc.data(),
    }));
}

async function checkPlaceExists(placeName){
    const placesRef = await db.collection('places').doc(placeName).get();
    return placesRef.exists;
}
module.exports = { getPlaces,checkPlaceExists };