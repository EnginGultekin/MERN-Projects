import 'dotenv/config';
import './config/db.js';
import express from 'express';
import Boom from '@hapi/boom';
import cors from 'cors';
import limiter from './middlewares/rate-limiter.js';

const app = express();

app.use(cors());
app.use(limiter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(router)

// Yukarda gittiği yerde router'ı bulamazsa buraya girecek
app.use((req, res, next) => {
    return next(Boom.notFound('This route does not exist.'));
});


// Server hatası olduğunda buraya gelecek 
app.use((err, req, res, next) => {
    console.log(err);

    if (err) {
        if (err.output) {
            return res.status(err.output.statusCode || 500).json(err.output.payload);
        }
        return res.status(500).json(err)
    }
})

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`))





