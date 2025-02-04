const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

//Request a Booking
router.post('/request', async (req, res) => {
    const { gigId, musicianId, userId, status = 'pending'} = req.body;
    try {
        const booking = new Booking({ gigId, musicianId, status})
        await Booking.save();
        res.json(booking);
    } catch(error){
        res.status(500).json({message: 'Error creating booking'})
    }
});

//Update Booking Status

router.post('/update-status', async(req, res) => {
    const {bookingId, status} = req.body;
    try{
        await Booking.findByIdAndUpdate(bookingId, {status})
    } catch(error){
        res.status(500).json({message: 'Error updating booking status'})
    }
});

module.exports = router;