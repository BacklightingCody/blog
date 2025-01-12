// src/interface/Comment.ts
import { User } from './User';

export interface Reply {
  id: number;
  user: User;
  content: CommentContent; // 支持文本或包含文本和图片数组
  likes: number;
  createdAt: number | string;
  replyTo?: string;
}

export interface Comment {
  id: number;
  user: User;
  content: CommentContent; // 支持文本或包含文本和图片数组
  likes: number;
  createdAt: number | string;
  replies?: Reply[];
}

export interface CommentContent {
  text: string; 
  images: string[]; 
}
