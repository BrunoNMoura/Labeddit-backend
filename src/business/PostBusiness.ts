import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO } from "../dtos/posts/createPost.dto";
import { DeletePostInputDTO } from "../dtos/posts/deletePost.dto";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/posts/getPost.dto";
import { UpdatePostInputDTO } from "../dtos/posts/updataPost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { LIKED, PostDB, PostUpdateDB } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
  constructor(
    private postDataBase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getPost = async (
    input: GetPostInputDTO
  ): Promise<GetPostOutputDTO[]> => {
    const { token } = input;
    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const resultDB = await this.postDataBase.getPost();

    const response = await Promise.all(
      resultDB.map(async (post) => {
        const resultLikedDB = await this.postDataBase.findLikeDislike(
          post.id,
          payload.id
        );
        let liked: LIKED = LIKED.NOLIKED;
        if (resultLikedDB != undefined) {
          liked = resultLikedDB.like == 1 ? LIKED.LIKE : LIKED.DISLIKE;
        }

        const postNew = {
          id: post.id,
          content: post.content,
          likes: post.likes,
          dislikes: post.dislikes,
          comments: post.comments,
          updatedAt: post.updated_at,
          creator: {
            id: post.creator_id,
            name: post.creator_name,
          },
          liked,
        };
        return postNew;
      })
    );
    return response;
  };

  public createPost = async (input: CreatePostInputDTO): Promise<PostDB> => {
    const { content, token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (payload == undefined) {
      throw new BadRequestError("invalid token");
    }

    const { id: creatorId } = payload;

    const id = this.idGenerator.generate();

    const newPost: PostDB = {
      id,
      creator_id: creatorId,
      content,
      likes: 0,
      dislikes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await this.postDataBase.insertPost(newPost);

    return newPost;
  };

  public editPost = async (
    input: UpdatePostInputDTO
  ): Promise<string> => {
    const { content, token, idToEdit } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new UnauthorizedError();
    }
    const { id: creatorId } = payload;

    const updatePost: PostUpdateDB = {
      idToEdit,
      content,
      updated_at: new Date().toISOString(),
    };

    const [resultPost] = await this.postDataBase.findPost(idToEdit);

    if (!resultPost) {
      throw new NotFoundError("'id' not found");
    }

    if (resultPost.creator_id != creatorId) {
      throw new UnauthorizedError("Access denied");
    }

    await this.postDataBase.editPost(updatePost, creatorId);

    return "update made";
  };

  public deletePost = async (input: DeletePostInputDTO): Promise<string> => {
    const { token, idToDelete } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new UnauthorizedError();
    }

    const { id: creatorId, role } = payload;

    const [resultPost]: PostDB[] = await this.postDataBase.findPost(idToDelete);

    if (!resultPost) {
      throw new NotFoundError("post with this id does not exist");
    }

    if (resultPost.creator_id != creatorId && role != USER_ROLES.ADMIN) {
      throw new UnauthorizedError("Access denied");
    }

    await this.postDataBase.deletePost(idToDelete);
    return "deleted";
  };
}
