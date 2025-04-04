const express = require('express');
const { db } = require('../FireBase/FireBase');
const e = require('express');
const { getGameDataHistoryByUserid } = require('../models/GameData');
const { getUserByEmail } = require('../models/User');

const authRouter = express.Router();

authRouter.post('/login',async (req,res)=>{
    const {email} = req.body;
    if(!email){
        return res.status(400).send('Email is required');
    }
    try {
        const userData = await getUserByEmail(email);
        if(!userData){
            return res.status(404).send('User not found');
        }
        const gameHistory = await getGameDataHistoryByUserid(user.uid);
        const placesRef = await db.collection('places').get();
        const stamps = await userData.data().stamps;
        const userSetStamps = new Set(stamps);
        const placesData = placesRef.docs.map(doc => doc.data()); 
        const allStamps = placesData.map(place); 
        return res.status(200).json({
            userId: user.uid,
            email: user.email,
            gameHistory: gameHistory,
            stamps: userData.data().stamps,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).send('Internal server error');
    }
})