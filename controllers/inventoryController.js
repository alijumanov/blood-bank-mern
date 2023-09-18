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
        res.status(500).send({
            success: false,
            message: 'Error in create inventory API',
            error
        })
    }
};

module.exports = { createInventoryController }