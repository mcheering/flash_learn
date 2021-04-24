import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { aggregateSubjects } from './controllers/aggregateCards.js';

import createCard from './routes/createCard.js';
import userRoutes from './routes/users.js';

const app = express();



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/cards', createCard)
app.use('/user', userRoutes)
//MongoDB connection
const CONNECTION_URL = 'mongodb+srv://flashcard:y5WxSmGa6gUThmW0@cluster0.lly57.mongodb.net/AllFlashCards?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
      .then(() => {
            app.listen(PORT, () => {
                  console.log(`Server running on port: ${PORT}`)
            })
      })
      .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);