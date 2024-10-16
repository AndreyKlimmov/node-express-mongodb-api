
const express = require('express');
const router = express.Router();
const Evm = require('../models/evm');

// Create a new item
// router.post('/', async (req, res) => {
//     try {
//         // const newItem = await Item.create(req.body);
//         const newItem = await Evm.create({ name: "awesome" });
//         res.status(201).json(newItem);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Evm.aggregate([
            {
                "$set": {
                    "date": {
                        "$dateFromString": {
                            "dateString": "$date"
                        }
                    }
                }
            },
            {
                "$match": {
                    "date": {
                        "$gte": new Date(req.body.dateStart), // send in body raw {"dateStart": "2024-10-13", "dateFinish": "2024-10-15"}
                        "$lt": new Date(req.body.dateFinish)
                    }
                }
            }
        ]);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an item
// router.patch('/:id', async (req, res) => {
//     try {
//         const updatedItem = await Evm.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedItem);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Delete an item
// router.delete('/:id', async (req, res) => {
//     try {
//         await Evm.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Item deleted' });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

module.exports = router;
