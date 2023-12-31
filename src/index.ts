import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './router/userRouter';
import { postRouter } from './router/postRouter';
import { commentRouter } from './router/commentRouter';
import { likeDislikeRouter } from './router/likeDislikeRouter';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Server running on port ${process.env.PORT}`);
})

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeDislikeRouter);
