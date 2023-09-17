import z from "zod"

export interface CreateCommentInputDTO {
    postId: string,
    content: string,
    token: string 
}
export interface CreateCommentOutputDTO{
  message:string
}
export const CreatePostSchema = z.object({
    postId: z.string(
        {
          required_error: "'id' is required",
          invalid_type_error: "'id' must be a string"
        }
      ).min(1, "'id' inválido deve ter ao menos um caracter"),
    content: z.string(
    {
      required_error: "'content' is required",
      invalid_type_error: "'content' must be a string" 
    }
  ).min(1, "'content' must be at least one character"),

  token: z.string() 
}).transform(data => data as CreateCommentInputDTO)