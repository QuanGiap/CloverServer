const express = require("express");
const { getPlaces } = require("../models/Places");
const placesRouter = express.Router();

placesRouter.get("/", async (req, res) => {
    const places = await getPlaces();
    return res.status(200).json({
        message: "Places fetched successfully",
        places,
    });
})

module.exports = placesRouter;
