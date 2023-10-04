import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase";
import { LikeDislikeInputDTO } from "../dtos/likeDislikes/likeDislike.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { CommentDB } from "../models/Comments";
import { PostDB, LikesDislikesDB, POST_ACTION } from "../models/Post";
import { TokenManager } from "../services/TokenManager";

export class LikeDislikeBusiness {

  constructor(
    private likesDislikesDataBase: LikeDislikeDatabase,
    private tokenManager: TokenManager) { }

  public likeDislike = async (input: LikeDislikeInputDTO): Promise<string> => {

    const { id: actionId, like, action, token } = input;
    const likeVal: number = like ? 1 : 0;

    const payLoad = this.tokenManager.getPayload(token);
    if (payLoad == undefined || null) {
      throw new UnauthorizedError("Invalid token");
    }
    const { id:userId } = payLoad;
    const postLikeDislike: LikesDislikesDB = {
      user_id: userId,
      action_id: actionId,
      like: likeVal
    };
   
    let postComment: PostDB | CommentDB;
    if (action === POST_ACTION.POST) {
      [postComment] = await this.likesDislikesDataBase.findPost(actionId);
    } else {
      [postComment] = await this.likesDislikesDataBase.findComment(actionId);
    }

    if (postComment === undefined) {
      throw new NotFoundError("'id' not found");
    }

    if (postComment.creator_id === userId) {
      throw new ForbiddenError("Valid token but not enough permissions");
    }
    const likeDislikeDB: LikesDislikesDB = 
    await this.likesDislikesDataBase.findLikeDislike(actionId, userId);

    if (likeDislikeDB === undefined) {
      await this.likesDislikesDataBase.insertLikeDislike(postLikeDislike);
      if (likeVal === 1) {
        await this.likesDislikesDataBase.postIncreaseLike(action, actionId);
      } else {
        await this.likesDislikesDataBase.postIncreaseDislike(action, actionId);
      }
    } else { 
      if (likeVal == likeDislikeDB.like) {
        await this.likesDislikesDataBase.deleteLikeDislike(actionId, userId);
        if (likeVal === 1) {
          await this.likesDislikesDataBase.postDecreaseLike(action, actionId);
        } else {
          await this.likesDislikesDataBase.postDecreaseDislike(action, actionId);
        }
      } else { 
        await this.likesDislikesDataBase.updateLikeDislike(postLikeDislike);
        if (likeVal == 1) {
          await this.likesDislikesDataBase.postReverseDislikeToLike(action, actionId);
        }
        else {
          await this.likesDislikesDataBase.postReverseLikeToDislike(action, actionId);
        }
      }
    }
    return "ok";
  }
}
