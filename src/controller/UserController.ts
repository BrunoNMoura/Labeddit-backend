import { Request, Response } from "express"
import { LoginSchema } from "../dtos/users/login.dto"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"
import { SignupSchema } from "../dtos/users/signup.dto"
import { GetUsersSchema } from "../dtos/users/getUsers.dto"
import { UserBusiness } from "../business/UserBusiness"
export class UserController {

  constructor(private userBusiness: UserBusiness) {}
  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {

      const input = GetUsersSchema.parse({
        q: req.query.q,
        token: req.headers.authorization
      })

      const output = await this.userBusiness.getUsers(input)
console.log(output);

      res.status(200).send(output)

    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("unexpected error")
      }
    }
  }
   public signUp = async (req: Request, res: Response): Promise<void> => {

    try {
      const input = SignupSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      console.log(input);

      const output = await this.userBusiness.signUp(input);

      res.status(201).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("unexpected error")
      }
    }
  }  
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password,
      });

      console.log("Received login request with data:", input);

      const output = await this.userBusiness.login(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("unexpected error");
      }
    }
  };   
}