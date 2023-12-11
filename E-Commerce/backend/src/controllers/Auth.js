import Boom from "@hapi/boom";
import redis from "../config/redis.js";
import Validations from './Validations.js';
import helpers from '../helpers/jwt.js';
import User from '../models/User.js';

const register = async (req, res, next) => {
    const input = req.body;

    const { error } = Validations.authSchema.validate(input);
    if (error) return next(Boom.badRequest(error.details[0].message));

    try {
        const isExists = await User.findOne({ email: input.email });
        if (isExists) return next(Boom.conflict('This e-mail already using.'))

        const user = new User(input);
        const data = await user.save();
        const userData = data.toObject();

        delete userData.password;
        delete userData.__v;

        const accessToken = await helpers.signAccessToken({
            user_id: user._id,
            role: user.role,
        });

        const refreshToken = await helpers.signRefreshToken(user._id);
        res.json({
            user: userData,
            accessToken,
            refreshToken,
        });

    } catch (error) {
        next(error);
    }

}

const login = async (req, res, next) => {
    const input = req.body;

    const { error } = Validations.authSchema.validate(input);
    if (error) return next(Boom.badRequest(error.details[0].message));

    try {
        const user = await User.findOne({ email: input.email });
        if (!user) throw Boom.notFound('The email address was not found.');

        const isMatched = await user.isValidPass(input.password);
        if (!isMatched) throw Boom.unauthorized("email or password not correct");

        const userData = user.toObject();
        delete userData.password;
        delete userData.__v;

        const accessToken = await helpers.signAccessToken({
            user_id: user._id,
            role: user.role,
        });

        const refreshToken = await helpers.signRefreshToken(user._id);

        res.json({
            user: userData,
            accessToken,
            refreshToken,
        })

    } catch (error) {
        return next(error)
    }
}


const refreshToken = async (req, res, next) => {
    const { refresh_token } = req.body

    try {
        if (!refresh_token) throw Boom.badRequest();

        const user_id = await helpers.verifyRefreshToken(refresh_token);
        const accessToken = await helpers.signAccessToken(user_id);
        const refreshToken = await helpers.signRefreshToken(user_id);

        res.json({ accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const { refresh_token } = req.body;
        if (!refresh_token) throw Boom.badRequest();

        const user_id = await helpers.verifyRefreshToken(refresh_token);
        const data = await redis.del(user_id);

        if (!data) throw Boom.badRequest();

        res.json({ message: 'Succuess' })
    } catch (error) {
        return next(error)
    }
}

const isMe = async (req, res, next) => {
    const { user_id } = req.payload;
    console.log(req.payload)

    try {
        const user = await User.findById(user_id).select("-password -__v");

        res.json(user);
    } catch (error) {
        next(error);
    }
}


export default {
    register,
    login,
    refreshToken,
    logout,
    isMe,
}



