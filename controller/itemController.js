const Item = require("../model/Item");

exports.add = async (req, res) => {
    try {
        const { item } = req.body;
        await Item.create({
            item
        });
        res.status(200).json({
            success: true
        })
    } catch (err) {
        console.error(err)
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { item } = req.body;
        await Item.findByIdAndUpdate(
            id,
            {item},
            { new: true }
        );
        res.status(200).json({
            success: true
        })
    } catch (err) {
        console.error(err)
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.status(200).json({
            success: true
        })
    } catch (err) {
        console.error(err)
    }
}

exports.list = async (req, res) => {
    try {
        const listData = await Item.find()
        res.status(200).json({
            success: true,
            data: listData
        })
    } catch (err) {
        console.error(err)
    }
}