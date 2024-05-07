import mongoose from "mongoose";

const TipSchema = new mongoose.Schema({
    id: {type: String, required: true},
    tip: {type: String, required: true},
}); 

const TipModel = mongoose.model('safetytips', TipSchema);

export default TipModel;

