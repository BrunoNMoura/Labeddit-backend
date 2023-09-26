import { BaseDataBase } from "../../src/database/BaseDatabase"
import { LikesDislikesDB, PostDB, PostResultDB, PostUpdateDB } from "../../src/models/Post"
import { liksMock } from "./LikesDislikesDataBase.Mock"

export const postMock: PostResultDB[] = [
  {
    id: "id-mock-post1",  
    content: "mock-post-1",
    likes: 0,
    dislikes: 0,  
    comments: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(), 
    creator_id: "id-mock-astrodev",
    creator_name: "Astrodev"
  },
  {
    id: "id-mock-post2",  
    content: "mock-post-2",
    likes: 0,
    dislikes: 0,  
    comments: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(), 
    creator_id: "id-mock-astrodev",
    creator_name: "Astrodev"
  },
  {
    id: "id-mock-post3",  
    content: "mock-post-3",
    likes: 0,
    dislikes: 0,  
    comments: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(), 
    creator_id: "id-mock-fulano",
    creator_name: "Fulano"
  },
]

export class PostDataBaseMock extends BaseDataBase {

    public static TABLE_POSTS = "posts"

  public insertPost = async (newPost: PostDB): Promise<void> => {}

  public updatePost = async (updatePost: PostUpdateDB, creatorId: string): Promise<void> => {}

  public deletePost = async (postId: string): Promise<void> => {}

  public getPost = async ():Promise<PostResultDB[]> => {
      return postMock
  }
      public async findPost(id: string): Promise<PostDB[]> {
        const result: PostDB[] = postMock.filter( post => post.id == id)
        return result
    }
     
  public findLikeDislike = async (actionId: string, userId: string): Promise<LikesDislikesDB> => {
    const [resultDB]: LikesDislikesDB[] = liksMock
      .filter(like => like.action_id == actionId && like.user_id == userId)
    return resultDB
  }
}