import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import cors from 'cors'
import userRouter from './Routers/userRouter.js'

dotenv.config()
mongoose.set('strictQuery', false)

const app = express()

// cors paketini istekler bloklanmasın diye kullandık 
// ve sadece 3000 portundan gelen istekleri kabul etmesini söyledik
// app.use(cors()) bu şekilde hepsine izin verebiliriz
app.use(cors({origin:'http://localhost:3000'}))
app.use(express.json())
app.use("/users", userRouter);

app.listen(5000, () => {
    mongoose.connect(process.env.DB_CONNECTION_STRING)
        .then(() => console.log('connected to db'))
        .catch((error) => console.log(error))
})
