import { LikesDislikesDB } from "../models/Post";
import { BaseDataBase } from "./BaseDatabase";

export class LikeDislikeDatabase extends BaseDataBase {

  TABLE_NAME = "likes_dislikes";

  public insertLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME).insert(likeDislike);
  }

  public updateLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
    await BaseDataBase.connection(this.TABLE_NAME)
      .update({ like: likeDislike.like })
      .where({ user_id: likeDislike.user_id })
      .andWhere({ action_id: likeDislike.action_id });
  }

  public deleteLikeDislike = async (actionId: string, userId: string): Promise<void> => {
    await BaseDataBase.connection("likes_dislikes")
      .del()
      .where({ action_id: actionId })
      .andWhere({ user_id: userId });
  }

  public postIncreaseLike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .increment("likes");
  }

  public postDecreaseLike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("likes");
  }

  public postIncreaseDislike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .increment("dislikes");
  }

  public postDecreaseDislike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("dislikes");
  }

  public postReverseDislikeToLike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("dislikes")
      .increment("likes");
  }

  public postReverseLikeToDislike = async (action: string, id: string): Promise<void> => {
    await BaseDataBase.connection(action)
      .where({ id })
      .decrement("likes")
      .increment("dislikes");
  }
}
