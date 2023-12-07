import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    photos: [String],
    createAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Product', productSchema);