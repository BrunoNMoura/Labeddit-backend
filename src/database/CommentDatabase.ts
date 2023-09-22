import { CommentDB, CommentResultDB, CommentUpdateDB } from "../models/Comments";
import { BaseDataBase } from "./BaseDatabase";

export class CommentDataBase extends BaseDataBase {

  TABLE_NAME = "comments"

  public getComment = async (postId: string): Promise<CommentResultDB[]> => {

    const output: CommentResultDB[] = await BaseDataBase.connection("comments as c")
      .select("c.id", "c.post_id", "c.content", "c.likes", "c.dislikes",
        "c.comments", "c.creator_id", "u.name as creator_name")
      .innerJoin("users as u", "c.creator_id", "u.id")
      .where({ post_id: postId })
    return output
  }

  public insertComment = async (newComment: CommentDB): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME).insert(newComment)
  }

  public updateComment = async (updateComment: CommentUpdateDB, creatorId: string): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME)
      .update(updateComment)
      .where("id", "=", updateComment.id)
      .andWhere("creator_id", "=", creatorId)
  }

  public deleteComment = async (commentId: string): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME)
      .del().where("id", "=", commentId)
    await BaseDataBase.connection("likes_dislikes")
      .del().where({ action_id: commentId })
  }

  public incrementComments = async (postId: string): Promise<void> => {
    await BaseDataBase.connection("posts")
      .where({ id: postId })
      .increment("comments")
  }

  public decrementComments = async (postId: string): Promise<void> => {
    await BaseDataBase.connection("posts")
      .where({ id: postId })
      .decrement("comments")
  }
}
