import mongoose from "mongoose";

const TipSchema = new mongoose.Schema({
    id: {type: String, required: true},
    tip: {type: String, required: true},
}); 

const TipModel = mongoose.model('safetyTips', TipSchema);

export default TipModel;

