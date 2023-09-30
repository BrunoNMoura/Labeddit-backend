import { CommentDB, CommentResultDB, CommentUpdateDB } from "../models/Comments";
import { BaseDataBase } from "./BaseDatabase";
import { LikeDislikeDatabase } from "./LikeDislikeDatabase";
import { PostDatabase } from "./PostDatabase";
import { UserDataBase } from "./UserDatabase";

export class CommentDataBase extends BaseDataBase {

  public static TABLE_COMMENTS  = "comments"

  public getComment = async (postId: string): Promise<CommentResultDB[]> => {

    const output: CommentResultDB[] = await BaseDataBase.connection(`${CommentDataBase.TABLE_COMMENTS} as c`)
      .select("c.id", "c.post_id", "c.content", "c.likes", "c.dislikes",
        "c.comments", "c.creator_id", "u.name as creator_name")
      .innerJoin(`${UserDataBase.TABLE_USERS} as u`, "c.creator_id", "u.id")
      .where({ post_id: postId })
    return output
  }

  public insertComment = async (newComment: CommentDB): Promise<void> => {
    await BaseDataBase.connection(CommentDataBase.TABLE_COMMENTS).insert(newComment)
  }

  public updateComment = async (updateComment: CommentUpdateDB, creatorId: string): Promise<void> => {
    console.log(updateComment, creatorId);
    const updateCommentDB = {
      id:updateComment.idToEdit,
      content:updateComment.content,
      updated_at: updateComment.updated_at
    }
    await BaseDataBase.connection(CommentDataBase.TABLE_COMMENTS)
      .update(updateCommentDB)
      .where("id", "=", updateComment.idToEdit)
      .andWhere("creator_id", "=", creatorId)
  }

  public deleteComment = async (commentId: string): Promise<void> => {
    await BaseDataBase.connection(CommentDataBase.TABLE_COMMENTS)
      .del().where("id", "=", commentId)
    await BaseDataBase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
      .del().where({ action_id: commentId })
  }

  public incrementComments = async (postId: string): Promise<void> => {
    await BaseDataBase.connection(PostDatabase.TABLE_POSTS)
      .where({ id: postId })
      .increment("comments")
  }

  public decrementComments = async (postId: string): Promise<void> => {
    await BaseDataBase.connection(PostDatabase.TABLE_POSTS)
      .where({ id: postId })
      .decrement("comments")
  }
}
