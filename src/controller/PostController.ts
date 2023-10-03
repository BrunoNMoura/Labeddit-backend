import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostSchema } from "../dtos/posts/createPost.dto";
import { DeletePostSchema } from "../dtos/posts/deletePost.dto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { UpdatePostSchema } from "../dtos/posts/updataPost.dto";
import { GetPostShema } from "../dtos/posts/getPost.dto";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public getPost = async (req: Request, res: Response) => {
    try {
      const input = GetPostShema.parse({
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.getPost(input);
      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  };

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization,
      });

      const output = await this.postBusiness.createPost(input);

      res.status(201).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  };

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = UpdatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization,
        idToEdit: req.params.id,
      });

      const output = await this.postBusiness.editPost(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization as string,
      });

      const output = await this.postBusiness.deletePost(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Unexpected error");
      }
    }
  };
}
