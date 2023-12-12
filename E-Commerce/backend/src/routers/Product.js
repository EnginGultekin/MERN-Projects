import express from "express";
import helpers from '../helpers/jwt.js';
import grantAccess from '../middlewares/grantAccess.js';
import Product from "../controllers/Product.js";

const router = express.Router();

router.post('/', helpers.verifyAccessToken, /*grantAccess,*/ Product.create);
router.get('/', Product.getList);
router.put('/:product_id', Product.update);
router.delete('/:product_id', Product.deleteProduct);
router.get('/:product_id', Product.getProductById)

export default router;