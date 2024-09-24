import express from 'express';
const app = express();
const PORT = 4000;
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})