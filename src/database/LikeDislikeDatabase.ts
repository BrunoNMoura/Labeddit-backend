import { LikesDislikesDB, POST_LIKE } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class LikeDislikeDatabase extends BaseDatabase {
  public static TABLE_LIKES_DISLIKES = "likes_deslikes";

  public findLikeDislike = async (
    likeDislikeDB: LikesDislikesDB
  ): Promise<POST_LIKE | undefined> => {
    const [result]: Array<LikesDislikesDB | undefined> =
      await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
        .select()
        .where({
          user_id: likeDislikeDB.user_id,
          post_id: likeDislikeDB.post_id,
        });

    if (result === undefined) {
      return undefined;
    } else if (result.like === 1) {
      return POST_LIKE.ALREADY_LIKED;
    } else {
      return POST_LIKE.ALREADY_DISLIKED;
    }
  };
  public removeLikeDislike = async (
    likeDislikeDB: LikesDislikesDB
  ): Promise<void> => {
    await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      });
  };
  public updateLikeDislike = async (
    likeDislikeDB: LikesDislikesDB
  ): Promise<void> => {
    await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      });
  };
  public insertLikeDislike = async (
    likeDislikeDB: LikesDislikesDB
  ): Promise<void> => {
    await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKES_DISLIKES).insert(
      likeDislikeDB
    );
  };
  //======================= LIKES E DISLIKES IN POSTS   
  //add one to like   
  public postIncreaseLike = async (action: string, id: string): Promise<void> => {
    await BaseDatabase.connection(action)
      .where({ id })
      .increment("likes")
  }

  //subtract one from the like 
  public postDecreaseLike = async (action: string, id: string): Promise<void> => {
    await BaseDatabase.connection(action)
      .where({ id })
      .decrement("likes")
  }

  //add one to dislike 
  public postIncreaseDislike = async (action: string, id: string): Promise<void> => {
    await BaseDatabase.connection(action)
      .where({ id })
      .increment("dislikes")
  }

  // subtract one from dislike
  public postDecreaseDislike = async (action: string, id: string): Promise<void> => {
    await BaseDatabase.connection(action)
      .where({ id })
      .decrement("dislikes")
  }

  //updates status - from Like to Dislike 
  public postReverseDislikeToLike = async (action: string, id: string): Promise<void> => {
    await BaseDatabase.connection(action)
      .where({ id })
      .decrement("dislikes")
      .increment("likes")
  }

  //updates status - from Dislike to Like 
  public postReverseLikeToDislike = async (action: string, id: string): Promise<void> => {
    await BaseDatabase.connection(action)
      .where({ id })
      .decrement("likes")
      .increment("dislikes")
  }
}
