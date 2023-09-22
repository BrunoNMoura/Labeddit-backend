import { Request, Response } from "express";
import { UpdateCommentSchema } from "../dtos/comments/updateComment.dto";
import { DeleteCommentSchema } from "../dtos/comments/deleteComment.dto";
import { GetCommentSchema } from "../dtos/comments/getPost.dto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { CreateCommentSchema } from "../dtos/comments/creatComment.dto";
import { CommentBusiness } from "../business/CommentBusiness";

export class CommentController {
  constructor(private commentBusiness: CommentBusiness) {}

  public getComment = async (req: Request, res: Response) => {
    try {
      const input = GetCommentSchema.parse({
        postId: req.params.id,
        token: req.headers.authorization,
      });

      const output = await this.commentBusiness.getComment(input);

      res.status(200).send(output);
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

  public createComment = async (req: Request, res: Response) => {
    try {
      const input = CreateCommentSchema.parse({
        postId: req.body.postId,
        content: req.body.content,
        token: req.headers.authorization,
      });

      const response = await this.commentBusiness.createComment(input);

      res.status(200).send(response);
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

  public editComment = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;

      const input = UpdateCommentSchema.parse({
        content: req.body.content,
        token: req.headers.authorization,
      });

      const response = await this.commentBusiness.editComment(id, input);

      res.status(200).send(response);
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

  public deleteComment = async (req: Request, res: Response) => {
    try {
      const input = DeleteCommentSchema.parse({
        id: req.params.id,
        token: req.headers.authorization as string,
      });

      await this.commentBusiness.deleteComment(input);

      res.sendStatus(200);
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
