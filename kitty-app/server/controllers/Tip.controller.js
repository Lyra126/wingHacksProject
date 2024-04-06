import TipModel from "../models/Tip.js";

const getAllTips = async (req, res) => {
    try {
        const tips = await TipModel.find();
        res.json(tips);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to fetch tips' });
    }
};

const createTip = async (req, res) => {
    try {
        const tip = new TipModel({ 
            id: req.body.id,
            tip: req.body.tip,
        })
        await tip.save();
        res.json(tip);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to create tip' });
    }
};

const getTipById = async (req, res) => {};

export{
    getAllTips,
    createTip,
    getTipById,
}