export interface PostDB {
  id: string,  
  creator_id: string,
  content: string,
  likes: number,
  dislikes: number,  
  comments: number
  created_at: string,
  updated_at: string 
}

export interface PostUpdateDB {
  idToEdit: string
  content: string
  updated_at: string 
}

export interface PostResultDB {
  id: string,  
  content: string,
  likes: number,
  dislikes: number,  
  comments: number,
  created_at: string,
  updated_at: string, 
  creator_id: string,
  creator_name: string
}

export interface LikesDislikesDB {
  action_id: string
  user_id: string
  like: number
}

export enum POST_ACTION {
  POST = "posts",
  COMMENT = "comments"
}

export enum LIKED {
  LIKE = "like",
  DISLIKE = "dislike",
  NOLIKED = "no"
}