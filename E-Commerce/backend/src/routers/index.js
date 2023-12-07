import express from "express";
import helpers from '../helpers/jwt.js';
// Routes
import Auth from './Auth.js';
import Order from './Order.js';
import Product from './Product.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.end('Hey!');
});

router.use('/auth', Auth);
router.use('/product', Product);
router.use('/order', helpers.verifyAccessToken, Order);

