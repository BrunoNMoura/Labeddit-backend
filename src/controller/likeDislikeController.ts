import { Request, Response } from "express"
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness"
import { LikeDislikeSchema } from "../dtos/likeDislikes/likeDislike.dto"
import { ZodError } from "zod"
import { BaseError } from "../errors/BaseError"

export class LikeDislikeController {
  constructor(private likeDislikeBusiness: LikeDislikeBusiness) { }

 public likeDislike = async (req: Request, res: Response) => {
    try {
      const input = LikeDislikeSchema.parse({
        id: req.params.id,
        like: req.body.like,
        action: req.body.action,
        token: req.headers.authorization as string
      })
      console.log(input);
      
      const output = await this.likeDislikeBusiness.likeDislike(input)
      res.status(200).send(output)

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
}