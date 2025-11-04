/**
 * components/tweet
 * TimeLine/TimeLine.tsx
**/

import { useEffect, useState } from "react";
import { subscribeToTweets } from "@/services/tweetService";
import { Tweet } from "@/components/tweet";
import type { TweetType } from "@/types/tweet";
import styles from "./TimeLine.module.scss";

function TimeLine() {
  const [tweets, setTweets] = useState<TweetType[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToTweets(setTweets);

    // useEffect cleanup 함수
    return () => unsubscribe();
  }, []);

  return (
    <ul className={styles.timeline}>
      {tweets.map(tweet => <li><Tweet key={tweet.id} {...tweet} /></li>)}
    </ul>
  );
}

export default TimeLine;