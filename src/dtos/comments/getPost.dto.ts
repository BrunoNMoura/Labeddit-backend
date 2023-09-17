import { z } from "zod"
import { CommentModel } from "../../models/Comments"


export interface GetCommentInputDTO {
    postId: string,
    token: string 
}
export type GetCommentOutputDTO = CommentModel[]

export const GetCommentShema = z.object(
  {
    postId: z.string().min(1),
    token: z.string().min(1)
  }).transform(data => data as GetCommentInputDTO)