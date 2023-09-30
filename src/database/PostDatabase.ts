import { PostDB, PostResultDB, PostUpdateDB } from "../models/Post";
import { BaseDataBase } from "./BaseDatabase";
import { UserDataBase } from "./UserDatabase";

export class PostDatabase extends BaseDataBase {
  public static TABLE_POSTS = "posts";

  public insertPost = async (newPost: PostDB): Promise<void> => {
    await BaseDataBase.connection(PostDatabase.TABLE_POSTS).insert(newPost);
  };

  public updatePost = async (
    updatePost: PostUpdateDB,
    creatorId: string
  ): Promise<void> => {
    await BaseDataBase.connection(PostDatabase.TABLE_POSTS)
      .update(updatePost)
      .where("id", "=", updatePost.idToEdit)
      .andWhere("creator_id", "=", creatorId);
  };

  public deletePost = async (postId: string): Promise<void> => {
    await BaseDataBase.connection("likes_dislikes")
      .del()
      .where({ action_id: postId });
    await BaseDataBase.connection(PostDatabase.TABLE_POSTS)
      .del()
      .where({ id: postId });
  };

  public getPost = async (): Promise<PostResultDB[]> => {
    const response = await BaseDataBase.connection(
      `${PostDatabase.TABLE_POSTS} as p`
    )
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
      .innerJoin(`${UserDataBase.TABLE_USERS} as u`, "p.creator_id", "u.id")
      .orderBy("p.updated_at", "desc");
    return response;
  };
}
