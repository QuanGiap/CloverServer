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

placesRouter.post("/", async (req, res) => {
    return res.status(400).json({
        message: "This endpoint is not available",
    });
})

module.exports = placesRouter;
