export interface CommentType {
  hasLiked: any;
  likeCount: number;
  id: string;
  author: {
    name: string;
    id: string;
    image: string | null;
  };
  createdAt: string;
  likedBy: string[];
  content: string;
}
