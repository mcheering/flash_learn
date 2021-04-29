
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));



import createCard from './server/routes/createCard.js';
import userRoutes from './server/routes/users.js';
import dotenv from 'dotenv'
dotenv.config({ silent: true }, { path: path.resolve(__dirname, './.env') })

const app = express();

console.log(process.env.CONNECTION_URL)

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
if (process.env.NODE_ENV === "devlopment") {
      app.use(function (req, res) {
            res.sendFile(path.join(__dirname, "../client/public/index.html"));
      });
}

if (process.env.NODE_ENV === "development") {
      app.use(express.static("client/public/index.html"));
}

/*if (process.env.NODE_ENV === "production") {
      app.use(express.static(__dirname, "./client/build/index.html"));
}*/

if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));
}

app.use('/cards', createCard)
app.use('/user', userRoutes)
//MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
      .then(() => {
            app.listen(PORT, () => {
                  console.log(`Server running on port: ${PORT}`)
            })
      })
      .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);