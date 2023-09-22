import { z } from "zod"
import { CommentModel } from "../../models/Comments"


export interface GetCommentInputDTO {
    commentId: string,
    token: string 
}
export type GetCommentOutputDTO = CommentModel[]

export const GetCommentSchema = z.object(
  {
    commentId: z.string().min(1),
    token: z.string().min(1)
  }).transform(data => data as GetCommentInputDTO)