import { z } from "zod"

export interface UpdateCommentInputDTO {
  content: string,
  token: string,
}

export const UpdateCommentSchema = z.object(
  {
    content: z.string().min(1),
    token: z.string().min(1),
  }).transform(data => data as UpdateCommentInputDTO)