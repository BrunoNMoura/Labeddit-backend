import express from "express";
import { TokenManager } from "../services/TokenManager";
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness";
import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase";
import { LikeDislikeController } from "../controller/likeDislikeController";

export const likeDislikeRouter = express.Router();

const likeDislikeController = new LikeDislikeController(
  new LikeDislikeBusiness(new LikeDislikeDatabase(), new TokenManager())
);

likeDislikeRouter.put("/:id", likeDislikeController.likeDislike);
