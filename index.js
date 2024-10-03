import express from 'express';
import cookieParser from 'cookie-parser'; 
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();

const PORT = 4000;
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import testRouter from './routes/test.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(express.json())
app.use(cookieParser());

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/test', testRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})