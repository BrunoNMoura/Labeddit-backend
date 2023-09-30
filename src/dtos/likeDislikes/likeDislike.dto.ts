import z from "zod"
import { POST_ACTION } from "../../models/Post"

export interface LikeDislikeInputDTO {
  id: string
  like: boolean
  action: POST_ACTION
  token: string 
}

export const LikeDislikeSchema = z.object({
  id: z.string(
    {
        required_error: "'id' is required",
        invalid_type_error: "'id' must be a string"
    }
  ),//.refine((Id) => Id.length ===36,{message: "id invalid"} ),

  like: z.boolean(
    {
      required_error: "'like' is required",
      invalid_type_error: "'like' must be a boolean" 
    }),   

  action: z.enum([POST_ACTION.COMMENT, POST_ACTION.POST],{
    required_error: "'action' is required",
    invalid_type_error: "'aciton' must be "+POST_ACTION}),

  token: z.string() 
}).transform(data => data as LikeDislikeInputDTO)