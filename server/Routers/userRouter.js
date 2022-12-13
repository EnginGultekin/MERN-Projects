import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';

const router = express.Router();

// localhost:5000/users 'a yapılan post isteği 
// içinde req istek res bizim vereceğimiz cevap
router.post("/signup", async (req, res) => {
    try {
        //console.log(req.body)
        // isteğin bodysinde bunlar gelmekte
        const { fullname, password, passwordConfirm, phoneNumber, email } = req.body;

        if (password !== passwordConfirm) {
            return res.status(400).json({ message: 'Password do not match' })
        }

        // emaile göre bir kullanıcı var mı
        const userExists = await User.findOne({ email })
        // varsa zaten mevcut döner
        if (userExists)
            return res.status(400).json({ message: 'User already exists.' })

        // gelen passwordu hashliyoruz ve  10 ise karmaşıklık seviyesi   
        // yani haslenmiş şifrenin sonuna 10 tane random karakter ekler
        const hashedPassword = await bcrypt.hash(password, 10)

        // döneceğimiz yeni kullanıcı bilgileri
        const createdUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber
        })

        // Cevabı döndür
        return res.status(201).json({ createdUser, message: 'Register successful' });
    } catch (error) {
        console.log(error)
        return res.json({ message: "create user failed" })
    }
})

// localhost:5000/users/signin POST request
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        // kullanıcı mevcutsa
        if (!user)
            return res.status(400).json({ message: "user does not exist" })

        // girilen şifre ile bizim hashlenmiş olark veritabanında tutulan şifreyi karşılaştıtıyoruz    
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Wrong Password" })

        // en son giriş başarılı olur
        return res.status(200).json({ user, message: 'Authentication successful' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

export default router;