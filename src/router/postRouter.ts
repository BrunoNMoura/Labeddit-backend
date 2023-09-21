import express from "express"
import { TokenManager } from "../services/TokenManager"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/PostBusiness"
import { PostDatabase } from "../database/PostDatabase"
import { IdGenerator } from "../services/IdGenerator"

export const postRouter = express.Router()

const postController = new PostController
  (
    new PostBusiness(
      new PostDatabase(),
      new IdGenerator(),
      new TokenManager())      
  )

//=================== CREATE POST
postRouter.post("/",postController.createPost)

//================== GET POSTS
postRouter.get("/",postController.getPost)

//================== EDIT POST
postRouter.put("/:id",postController.editPost)

//================== DELETE POST
postRouter.delete("/:id",postController.deletePost)