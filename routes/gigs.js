const express = require('express');
const Gig = require('../models/Gig');
const router = express.Router();


//Create a Gig
router.post('/create', async (req, res) => {
    const { title, location, genre, date, payment, creatorId} = req.body;
    try{
        const gig = new Gig({ title, location, genre, date, payment, creatorId});
        await gig.save();
        res.json(gig);
    } catch(error){
        res.status(500).json({ message: 'Error creaing gig'});
    }
});

//Get Gigs with Pagination
router.get('/', async (req, res) => {
    const { page = 1, limit = 10} = req.query;
    try{
        const gigs = await Gig.find()
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ date: 1});
        res.json(gigs);
    } catch(error){
        res.status(500).json({ message: 'Error fetching gigs'})
    }
});

module.exports = router;