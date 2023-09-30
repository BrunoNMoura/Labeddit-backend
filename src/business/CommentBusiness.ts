import { CommentDataBase } from "../database/CommentDatabase";
import { CreateCommentInputDTO } from "../dtos/comments/creatComment.dto";
import { DeleteCommentInputDTO } from "../dtos/comments/deleteComment.dto";
import { GetCommentInputDTO, GetCommentOutputDTO } from "../dtos/comments/getPost.dto";
import { UpdateCommentInputDTO } from "../dtos/comments/updateComment.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { CommentDB, CommentResultDB, CommentUpdateDB } from "../models/Comments";
import { LIKED } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentBusiness {
  constructor(
    private commentDataBase: CommentDataBase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getComment = async (input: GetCommentInputDTO): Promise<GetCommentOutputDTO> => {
    const { postId, token } = input;

    const payLoad = this.tokenManager.getPayload(token);
    if (payLoad == null) {
      throw new BadRequestError("Invalid token");
    }

    const resultDB: CommentResultDB[] = await this.commentDataBase.getComment(postId);

    const response = await Promise.all(resultDB.map(async (comment) => {
      const resultLikedDB = await this.commentDataBase.findLikeDislike(comment.id, payLoad.id);

      let liked: LIKED = LIKED.NOLIKED;

      if (resultLikedDB != undefined) {
        liked = resultLikedDB.like == 1 ? LIKED.LIKE : LIKED.DISLIKE;
      }
      const commentNew = {
        id: comment.id,
        postId: comment.post_id,
        content: comment.content,
        likes: comment.likes,
        dislikes: comment.dislikes,
        comments: comment.comments,
        creator: {
          id: comment.creator_id,
          name: comment.creator_name,
        },
        liked,
      };
      return commentNew;
    }));
    return response;
  }

  public createComment = async (input: CreateCommentInputDTO): Promise<string> => {
    const { postId, content, token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (payload == undefined||null) {
      throw new BadRequestError("invalid token");
    }
    const { id: creatorId } = payload;

    const [postDB] = await this.commentDataBase.findPost(postId);

    if (postDB == undefined) {
      throw new NotFoundError("Post not found");
    }

    const id = this.idGenerator.generate();

    const newComment: CommentDB = {
      id,
      post_id: postId,
      creator_id: creatorId,
      content,
      likes: 0,
      dislikes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await this.commentDataBase.insertComment(newComment);
    await this.commentDataBase.incrementComments(postId);

    return "comment created";
  }

  public updateComment = async (input: UpdateCommentInputDTO): Promise<string> => {
    const { content, token,idToEdit } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new UnauthorizedError();
    }

    const { id: creatorId } = payload;

    const updateComment: CommentUpdateDB = {
      idToEdit,
      content,
      updated_at: new Date().toISOString(),
    };

    const [resultComment] = await this.commentDataBase.findComment(idToEdit);

    if (!resultComment) {
      throw new NotFoundError("'id' not found");
    }

    if (resultComment.creator_id != creatorId) {
      throw new UnauthorizedError("Access denied");
    }
    await this.commentDataBase.updateComment(updateComment, creatorId);
    return "update made";
  }

  public deleteComment = async (input: DeleteCommentInputDTO): Promise<string> => {
    const { idToDelete, token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new UnauthorizedError();
    }

    const { id: creatorId, role } = payload;

    const [resultComment]: CommentDB[] = await this.commentDataBase.findComment(idToDelete);

    if (!resultComment) {
      throw new NotFoundError("comment with this id does not exist");
    }

    if (resultComment.creator_id != creatorId && role != USER_ROLES.ADMIN) {
      throw new UnauthorizedError("Access denied");
    }

    await this.commentDataBase.deleteComment(idToDelete);
    await this.commentDataBase.decrementComments(resultComment.post_id);
    return "comment deleted";
  }

  
}
