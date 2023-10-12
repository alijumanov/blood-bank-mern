const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// create inventory options

const createInventoryController = async (req, res) => {
    try {
        const { email, inventoryType } = req.body;
        const user = await userModel.findOne({ email });

        // validation

        if (!user) {
            throw new Error('User Not found')
        }
        if (inventoryType === 'in' && user.role !== 'donar') {
            throw new Error('Not a donar account')
        }
        if (inventoryType === 'out' && user.role !== 'hospital') {
            throw new Error('Not a hospital')
        }

        // save record

        const inventory = new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
            success: true,
            message: 'New blood record added'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in create inventory API',
            error
        })
    }
};

const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({ organisation: req.body.userId }).populate('donar').populate('hospital').sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: 'GET all records successfully',
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in GET all inventory',
            error
        })
    }
};

module.exports = { createInventoryController, getInventoryController }