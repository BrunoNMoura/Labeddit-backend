import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { UserDataBase } from "../database/UserDatabase"


export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDataBase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)
userRouter.get("/", userController.getUsers)
userRouter.post("/signup", userController.singUp)
userRouter.post("/login", userController.login)