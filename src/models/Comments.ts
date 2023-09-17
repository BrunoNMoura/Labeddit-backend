export interface CommentDB {
  id: string;
  post_id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  comments: number;
  created_at: string;
  updated_at: string;
}

export interface CommentUpdateDB {
  id: string;
  content: string;
  updated_at: string;
}

export interface CommentModel {
  id: string;
  content: string;
  postId: string;
  likes: number;
  dislikes: number;
  comments: number;
  creator: {
    id: string;
    name: string;
  };
}

export interface CommentResultDB {
  id: string;
  post_id: string;
  content: string;
  likes: number;
  dislikes: number;
  comments: number;
  creator_id: string;
  creator_name: string;
  created_at: string;
  updated_at: string;
}