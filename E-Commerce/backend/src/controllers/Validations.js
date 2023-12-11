import Joi from 'joi';

const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const orderSchema = Joi.object({
    address: Joi.string().required(),
    items: Joi.array().items(Joi.string()).required(),
});

export default {
    authSchema,
    orderSchema,
}