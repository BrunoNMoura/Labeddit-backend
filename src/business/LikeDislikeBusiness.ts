import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase"
import { LikeDislikeInputDTO } from "../dtos/likeDislike/likeDislike.dto"
import { BadRequestError } from "../error/BadRequest"
import { NotFoundError } from "../error/NotFound"
import { CommentDB } from "../models/Comments"
import { PostDB, LikesDislikesDB, POST_ACTION } from "../models/Post"
import { TokenManager } from "../services/TokenManager"

export class LikeDislikeBusiness {

  constructor(
    private likesDislikesDataBase: LikeDislikeDatabase,
    private tokenManager: TokenManager) { }

  // tratativas da ação: like / dislike    
  public likeDislike = async (input: LikeDislikeInputDTO): Promise<string> => {

    // pega o id do post / comment
    const { id: actionId, like, action, token } = input
    const likeVal: number = like ? 1 : 0

    // validação token 
    const payLoad = this.tokenManager.getPayload(token)
    if (payLoad == undefined) {
      throw new BadRequestError("invalid token")
    }

    // pega o id do usuário 
    const { id: userId } = payLoad

    // monta o objeto de likes dislikes
    const postLikeDislike: LikesDislikesDB = {
      user_id: userId,
      action_id: actionId,
      like: likeVal
    }
  
    // procurar o post / comment
    let postComment: PostDB | CommentDB
    if (action == POST_ACTION.POST) {
      [postComment] = await this.likesDislikesDataBase.findPost(actionId)
    } else {
      [postComment] = await this.likesDislikesDataBase.findComment(actionId)
    }

    if (postComment === undefined) {
      throw new NotFoundError("'id' not afound")
    }

    // Verifica se o post/comment é do mesmo usuário
    if (postComment.creator_id === userId) {
      throw new BadRequestError("invalid action: you cannot like or dislike your own post/comment")
    }

    // pesquisa se ( likes_dislikes ) se existe registro: User x Post
    const likeDislikeDB: LikesDislikesDB = 
    await this.likesDislikesDataBase.findLikeDislike(actionId, userId)

    // inserir na tabela (caso não haja registro)
    if (likeDislikeDB === undefined) {
      await this.likesDislikesDataBase.insertLikeDislike(postLikeDislike)
      if (likeVal === 1) {
        await this.likesDislikesDataBase.postIncreaseLike(action, actionId)
      } else {
        await this.likesDislikesDataBase.postIncreaseDislike(action, actionId)
      }
    } else { // existe um registro entre User x Post 
      // deletar o like/Dislike se for a mesma opção
      if (likeVal == likeDislikeDB.like) {
        await this.likesDislikesDataBase.deleteLikeDislike(actionId, userId)
        if (likeVal === 1) {
          await this.likesDislikesDataBase.postDecreaseLike(action, actionId)
        } else {
          await this.likesDislikesDataBase.postDecreaseDislike(action, actionId)
        }
      } else { // trocar de like para dislike ou dislike para like (inverter)
        await this.likesDislikesDataBase.updateLikeDislike(postLikeDislike)
        if (likeVal == 1) {
          await this.likesDislikesDataBase.postReverseDislikeToLike(action, actionId)
        }
        else {
          await this.likesDislikesDataBase.postReverseLikeToDislike(action, actionId)
        }
      }
    }
    return "ok"
  }
}
