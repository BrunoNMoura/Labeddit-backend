import express from "express"
import { CommentBusiness } from "../business/CommentBusiness"
import { CommentDataBase } from "../database/CommentDatabase"
import { TokenManager } from "../services/TokenManager"
import { CommentController } from "../controller/CommentController"
import { IdGenerator } from "../services/IdGenerator"

export const commentRouter = express.Router()

const commentController = new CommentController
  (
    new CommentBusiness(
      new CommentDataBase(),
      new IdGenerator(),
      new TokenManager())    
  )


commentRouter.post("/", commentController.createComment) 
commentRouter.get("/:id", commentController.getComment)
commentRouter.put("/:id", commentController.updateComment)
commentRouter.delete("/:id", commentController.deleteComment)