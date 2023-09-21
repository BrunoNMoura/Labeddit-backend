import { z } from "zod"
import { LIKED } from "../../models/Post";

export interface GetPostInputDTO {
  token: string 
}
export interface GetPostOutputDTO {
  id: string,  
  content: string,
  likes: number,
  dislikes: number,  
  comments: number,
  updatedAt: string, 
  creator: {
    id: string,
    name: string
  }
  liked: LIKED;
}
export const GetPostShema = z.object(
  {
    token: z.string().min(1)
  }).transform(data => data as GetPostInputDTO)