import { CommentDataBase } from "../database/CommentDatabase";
import { CreateCommentInputDTO } from "../dtos/comments/creatComment.dto";
import { DeleteCommentInputDTO } from "../dtos/comments/deleteComment.dto";
import { GetCommentInputDTO } from "../dtos/comments/getPost.dto";
import { UpdateCommentInputDTO } from "../dtos/comments/updateComment.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { CommentDB, CommentModel, CommentResultDB, CommentUpdateDB } from "../models/Comments";
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

  public getComment = async (input: GetCommentInputDTO): Promise<CommentModel[]> => {
    const { commentId, token } = input;

    const payLoad = this.tokenManager.getPayload(token);
    if (payLoad == null) {
      throw new BadRequestError("Invalid token");
    }

    const resultDB: CommentResultDB[] = await this.commentDataBase.getComment(commentId);

    const response = await Promise.all(resultDB.map(async (comment) => {
      const resultLikedDB = await this.commentDataBase.findLikeDislike(comment.id, payLoad.id);

      let liked: LIKED = LIKED.NOLIKED;

      if (resultLikedDB != undefined) {
        liked = resultLikedDB.like == 1 ? LIKED.LIKE : LIKED.DISLIKE;
      }
      const commentNew: CommentModel = {
        id: comment.id,
        postId: comment.post_id,
        parentalPostId: comment.parental_post_id,
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
    const { commentId, content, token } = input;

    const payLoad = this.tokenManager.getPayload(token);
    if (payLoad == null) {
      throw new BadRequestError("Invalid token");
    }
    const { id: creatorId } = payLoad;

    const [postDB] = await this.commentDataBase.findPost(commentId);

    if (postDB == undefined) {
      throw new NotFoundError("Post not found");
    }

    const id = this.idGenerator.generate();

    const newComment: CommentDB = {
      id,
      post_id: commentId,
      creator_id: creatorId,
      parental_post_id: "",
      content,
      likes: 0,
      dislikes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await this.commentDataBase.insertComment(newComment);
    await this.commentDataBase.incrementComments(commentId);

    return "ok";
  }

  public editComment = async (id: string, input: UpdateCommentInputDTO): Promise<string> => {
    const { content, token } = input;

    const payLoad = this.tokenManager.getPayload(token);
    if (payLoad == null) {
      throw new BadRequestError("Invalid token");
    }

    const { id: creatorId } = payLoad;

    const updateComment: CommentUpdateDB = {
      id,
      content,
      updated_at: new Date().toISOString(),
    };

    const [resultComment] = await this.commentDataBase.findComment(id);

    if (!resultComment) {
      throw new NotFoundError("'id' not found");
    }

    if (resultComment.creator_id != creatorId) {
      throw new UnauthorizedError("Access denied");
    }
    await this.commentDataBase.updateComment(updateComment, creatorId);
    return "ok";
  }

  public deleteComment = async (input: DeleteCommentInputDTO): Promise<string> => {
    const { idToDelete, token } = input;

    const payLoad = this.tokenManager.getPayload(token);
    if (payLoad == null) {
      throw new BadRequestError("Invalid token");
    }

    const { id: creatorId, role } = payLoad;

    const [resultComment]: CommentDB[] = await this.commentDataBase.findComment(idToDelete);

    if (!resultComment) {
      throw new NotFoundError("'id' not found");
    }

    if (resultComment.creator_id != creatorId && role != USER_ROLES.ADMIN) {
      throw new UnauthorizedError("Access denied");
    }

    await this.commentDataBase.deleteComment(idToDelete);
    await this.commentDataBase.decrementComments(resultComment.post_id);
    return "ok";
  }

  
}
