import { LikesDislikesDB, PostDB } from "../../src/models/Post"
import { BaseDataBase } from "../../src/database/BaseDataBase"
import { postMock } from "./PostDataBase.Mock"
import { commentMock } from "./CommentDataBase.Mock"
import { CommentDB } from "../../src/models/Comments"

export const liksMock = [{
  action_id: "id-mock-post1",
  user_id: "id-mock-fulano",
  like: 1
},
{
  action_id: "id-mock-post2",
  user_id: "id-mock-fulano",
  like: 0
},
{
  action_id: "id-mock-comment-1",
  user_id: "id-mock-fulano",
  like: 1
},
{
  action_id: "id-mock-comment-3",
  user_id: "id-mock-astrodev",
  like: 0
}
]

export class LikesDislikesDataBaseMock extends BaseDataBase {

    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

public insertLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
  }

public updateLikeDislike = async (likeDislike: LikesDislikesDB): Promise<void> => {
  }

public deleteLikeDislike = async (actionId: string, userId: string): Promise<void> => {

  }


 public postIncreaseLike = async (action: string, id: string): Promise<void> => {
  }

public postDecreaseLike = async (action: string, id: string): Promise<void> => {
  }

public postIncreaseDislike = async (action: string, id: string): Promise<void> => {
  }

public postDecreaseDislike = async (action: string, id: string): Promise<void> => {
  }

public postReverseDislikeToLike = async (action: string, id: string): Promise<void> => {
  }

public postReverseLikeToDislike = async (action: string, id: string): Promise<void> => {
  }

public findLikeDislike = async (actionId: string, userId: string): Promise<LikesDislikesDB> => {
    const [resultDB]: LikesDislikesDB[] = liksMock
      .filter(like => like.action_id == actionId && like.user_id == userId)
    return resultDB
  }

public async findPost(id: string): Promise<PostDB[]> {
    const result: PostDB[] = postMock.filter(post => post.id == id)
    return result
  }

  public async findComment(id: string): Promise<CommentDB[]> {
    const result: CommentDB[] = commentMock.filter(comment => comment.id == id)
    return result
  }
}