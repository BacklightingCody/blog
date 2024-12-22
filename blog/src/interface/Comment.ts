// src/interface/Comment.ts
import { User } from './User';

export interface Reply {
  id: number;
  user: User;
  content: string | { text: string; images: string[] }; // 支持文本或包含文本和图片数组
  likes: number;
  time: number | string;
  replyTo?: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string | { text: string; images: string[] }; // 支持文本或包含文本和图片数组
  likes: number;
  time: number | string;
  replies?: Reply[];
}
