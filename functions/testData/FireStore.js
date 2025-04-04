const places = [
    {placeName: "Space Needle",
        flagImgUrl:'usa.png',
        address: "400 Broad St, Seattle, WA 98109, United States", codeName:"SPACE_NEEDLE",
        iconUrl: 'space_needle.png'},
    {placeName: "Eiffel Tower",
        flagImgUrl:'france.png',
        address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France", codeName:"EIFFEL_TOWER",
        iconUrl: 'eiffel.svg'},
    {placeName: "Statue of Liberty",
        flagImgUrl:'usa.png',
        address: "Liberty Island, New York, NY 10004, United States", codeName:"STATUE_OF_LIBERTY",
        iconUrl: 'second_tower.png'},
    {placeName: "Great Wall of China",
        flagImgUrl:'china.png',
        address: "Huairou District, China", codeName:"GREAT_WALL_OF_CHINA",
        iconUrl: 'clover.png'}
];

async function addTestPlacesData(db) {
    const batch = db.batch();
    places.forEach(place => {
        const docRef = db.collection('places').doc(place.codeName);
        batch.set(docRef, place);
    });
    await batch.commit();
}

module.exports = {
    places,
    addTestPlacesData,
};