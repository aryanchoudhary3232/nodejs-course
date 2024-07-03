const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Person = require('../models/person');

router.post('/', async (req,res) => {

    try {
        const data = req.body;

        const newPerson = new MenuItem(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/', async(req,res) => {
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:taste', async (req,res) => {
    try {
        const tastePara = req.params.taste;
        if(tastePara === 'sour' || tastePara === 'sweet' || tastePara === 'spicy') {
            const response = await MenuItem.find({taste: tastePara});
            console.log('data fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})



module.exports = router;


