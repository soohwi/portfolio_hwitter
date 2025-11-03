/**
 * components/tweet
 * TimeLine/TimeLine.tsx
**/

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import type { Unsubscribe } from "firebase/auth";
import { Tweet } from "@/components/tweet";
import styles from "./TimeLine.module.scss";

export interface ITweet {
  id: string;
  fileData?: string;
  tweet: string;
  userId: string;
  userName: string;
  createdAt: number;
}

export default function TimeLine() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    // 유저가 보고있지 않으면 이벤트 리스너를 꺼야함(계속 켜두면 firebase 요금나감)
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)// 쿼리 제한(요금절약)
      );

      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const {fileData, tweet, userId, userName, createdAt} = doc.data();
          return {
            fileData,
            tweet,
            userId,
            userName,
            createdAt,
            id: doc.id,
          };
        });

        setTweets(tweets);
      });
    }

    fetchTweets();

    // useEffect cleanup 함수
    return () => {
      unsubscribe && unsubscribe();
    }
  }, []);

  return (
    <ul className={styles.timeline}>
      {tweets.map(tweet => <li><Tweet key={tweet.id} {...tweet} /></li>)}
    </ul>
  );
}