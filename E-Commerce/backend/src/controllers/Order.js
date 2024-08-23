import User from "../models/User.js";
import Order from "../models/Order.js";
import Boom from "@hapi/boom";
import Validations from "./Validations.js";

const create = async (req, res, next) => {
    const input = req.body;
    //input.items = input.items ? JSON.parse(input.items) : null;

    const { error } = Validations.orderSchema.validate(input);
    if (error) return next(Boom.badRequest(error.details[0].message));

    const { user_id } = req.payload;
    try {
        const order = new Order({
            user: user_id,
            address: input.address,
            items: input.items,
        });

        const savedData = await order.save();

        res.status(201).json({ message: 'Order created', order: savedData });
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate('user', '-password -__v').populate('items');
        console.log(orders)
        res.json(orders);
    } catch (error) {
        next(error);
    }
}

const getMyOrders = async (req, res, next) => {
    const { user_id } = req.payload;

    try {
        const orders = await Order.find({ user: user_id }) /*.populate('purchases.item')*/;

        res.json(orders);
    } catch (error) {
        next(error)
    }
}


export default {
    create,
    list,
    getMyOrders,

}