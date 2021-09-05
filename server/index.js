import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRouter);

// for heroku
app.get('/', (req, res) => {
  res.send("hello to memories api");
});

//const CONNECTION_URL = 'mongodb+srv://aziz:j00rhjME1MZhAR4h@cluster0.s4un4.mongodb.net/memories?retryWrites=true&w=majority';
const databaseUrl = process.env.CONNECTION_URL;  // come from .env file
const PORT = process.env.PORT|| 5000;


mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);