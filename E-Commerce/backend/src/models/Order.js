import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    adress: {
        type: String,
        required: true,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product',
        },
    ],
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model('Order', orderSchema); s
