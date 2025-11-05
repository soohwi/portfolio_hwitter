/**
 * services
 * tweetService.ts
**/

import { db } from "@/firebase";
import {
  addDoc,
  updateDoc,
  deleteDoc,
  where,
  collection,
  limit,
  onSnapshot,
  orderBy,
  doc,
  query } from "firebase/firestore";
import type { TweetType } from "@/types/tweet";
import type { Unsubscribe } from "firebase/auth";

// 유저가 보고있지 않으면 이벤트 리스너를 꺼야함(계속 켜두면 firebase 요금나감)
export const subscribeToTweets = (
  callback: (tweets: TweetType[]) => void
): Unsubscribe => {
  const tweetsQuery = query(
    collection(db, "tweets"),
    orderBy("createdAt", "desc"),
    limit(25)// 쿼리 제한(요금절약)
  );

  const unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
    const tweets = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as TweetType[];

    callback(tweets);
  });

  return unsubscribe;
};

// 트윗 생성
export const createTweet = async (tweet: Omit<TweetType, "id">) => {// TweetType중 id만 제외
  return await addDoc(collection(db, "tweets"), tweet);
};

// 트윗 업데이트
export const updateTweet = async (id: string, content: string) => {
  return await updateDoc(doc(db, "tweets", id), {tweet: content});
};

// 트윗 삭제
export const deleteTweet = async (id: string) => {
  return await deleteDoc(doc(db, "tweets", id));
};

// 유저 트윗내용 가져오기(실시간)
export const subscribeToUserTweets = (
  userId: string,
  callback: (tweets: TweetType[]) => void
): Unsubscribe => {
  const tweetQuery = query(
    collection(db, "tweets"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(25)
  );

  const unsubscribe = onSnapshot(tweetQuery, (snapshot) => {
    const tweets = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as TweetType[];
    callback(tweets);
  });

  return unsubscribe;
};