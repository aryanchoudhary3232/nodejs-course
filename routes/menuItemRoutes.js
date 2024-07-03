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

router.put('/:id', async(req,res) => {
    try {
        const dishId = req.params.id;
        const updateData = req.body;
        const response = await MenuItem.findByIdAndUpdate(dishId, updateData, {
            new: true,
            runValidators: true,
        })
        if(!response){
            return res.status(404).json({error: 'taste not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.delete('/:id', async(req,res) => {
    try {
        const dishId = req.params.id;
        const response =await  MenuItem.findByIdAndDelete(dishId);
        if(!response){
            return res.status(404).json({error: 'taste not found'});
        }
        console.log('data deleted successfully');
        res.status(200).json({message: 'Dish deleted successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;


