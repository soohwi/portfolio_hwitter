/**
 * types
 * tweet.ts
**/

export interface TweetType {
  id: string;
  fileData?: string;
  tweet: string;
  userId: string;
  userName: string;
  createdAt: number;
}