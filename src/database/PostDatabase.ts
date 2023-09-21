import { PostDB, PostResultDB, PostUpdateDB } from "../models/Post";
import { BaseDataBase } from "./BaseDatabase";

export class PostDatabase extends BaseDataBase {
  TABLE_NAME = "posts";

  public insertPost = async (newPost: PostDB): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME).insert(newPost);
  };

  public updatePost = async (
    updatePost: PostUpdateDB,
    creatorId: string
  ): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME)
      .update(updatePost)
      .where("id", "=", updatePost.id)
      .andWhere("creator_id", "=", creatorId);
  };

  public deletePost = async (postId: string): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME).del().where({ id: postId });
    await BaseDataBase.connection("likes_dislikes")
      .del()
      .where({ action_id: postId });
  };

  public getPost = async (): Promise<PostResultDB[]> => {
    const response = await BaseDataBase.connection("posts as p")
      .select(
        "p.id",
        "p.content",
        "p.likes",
        "p.dislikes",
        "p.comments",
        "p.created_at",
        "p.updated_at",
        "p.creator_id",
        "u.name as creator_name"
      )
      .leftJoin("users as u", "p.creator_id", "u.id")
      .orderBy("p.updated_at", "desc");
    return response;
  };
}
