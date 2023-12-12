import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    address: {
        type: String,
        required: true,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model('Order', orderSchema);
