import Joi from 'joi';

const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(), // there is just if condition
})

const orderSchema = Joi.object({
    address: Joi.string().required(),
    items: Joi.array().items(Joi.string()).required(),
});

const productSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(3),
    price: Joi.number().required(),
    photos: Joi.array(),
  });

export default {
    authSchema,
    orderSchema,
    productSchema,
}