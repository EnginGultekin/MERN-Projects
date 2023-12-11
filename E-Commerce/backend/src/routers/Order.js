import express from "express";
import Order from "../controllers/Order.js";

const router = express.Router();

router.post('/', Order.create);
router.get('/', Order.list);
router.get('/my-orders', Order.getMyOrders);

export default router;