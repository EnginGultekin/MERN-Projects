import Boom from '@hapi/boom';
import Product from '../models/Product.js';
import Validations from './Validations.js';

const create = async (req, res, next) => {
    const input = req.body;
    const { error } = Validations.productSchema.validate(input);

    if (error) return next(Boom.badRequest(error.details[0].message))

    try {
        //input.photos = JSON.parse(input.photos);

        const product = new Product(input);
        const savedData = await product.save();

        res.json({ product: savedData });
    } catch (error) {
        next(error);
    }
}

const getProductById = async (req, res, next) => {
    const { product_id } = req.params;

    if (!product_id) return next(Boom.badRequest("Missins parameter (:product_id)"));

    try {
        const product = await Product.findById(product_id)
        if (!product) return next(Boom.notFound());
        
        res.json(product);
    } catch (error) {
        next(error)
    }

}

const update = async (req, res, next) => {
    const { product_id } = req.params;

    try {
        const updated = await Product.findByIdAndUpdate(
            product_id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    const { product_id } = req.params;

    try {
        const deleted = await Product.findByIdAndDelete(product_id);

        if (!deleted) throw Boom.badRequest('Product not found.');

        res.json({ product: deleted, message: 'Deletion successful' })
    } catch (error) {
        next(error);
    }

}

const limit = 6;
const getList = async (req, res, next) => {
    let { page } = req.query;

    if (page < 1) page = 1;

    const skip = (parseInt(page) - 1) * limit

    try {
        const products = await Product.find({})
            .sort({ createAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json(products)
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    update,
    getList,
    getProductById,
    deleteProduct,
}