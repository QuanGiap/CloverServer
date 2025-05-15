const { db } = require("../FireBase/FireBase");
const uploadStorage = require("../tool/UploadStorage");

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

async function uploadPlaces({stamp,flag,body}){
    const {address,code_name,place_name} = body;
    let stamp_img_name = body.stamp_img_name;
    let flag_img_name = body.flag_img_name;
    let [uploadStampPromise, uploadFlagPromise] = [null,null];
    if(stamp){
        uploadStampPromise = uploadStorage('stamp/',stamp);
        stamp_img_name = stamp.filename;
    }
    if(flag){
        uploadFlagPromise = uploadStorage('flag/',flag);
        flag_img_name = flag.filename;
    }
    const uploadDataPromise = db.collection('places').doc(code_name).set({
        address,
        code_name,
        flag_img_url:flag_img_name,
        icon_url:stamp_img_name,
        place_name:place_name,
    });
    await Promise.all([uploadStampPromise,uploadFlagPromise,uploadDataPromise]);
    return {
        address,
        code_name,
        flag_img_url:flag_img_name,
        icon_url:stamp_img_name,
        place_name:place_name,
    };
}


module.exports = { getPlaces,checkPlaceExists,uploadPlaces };