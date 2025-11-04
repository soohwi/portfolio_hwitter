/**
 * components/tweet
 * Tweet/TweetHeader.tsx
**/

import styles from "./Tweet.module.scss";

interface TweetHeaderProps {
  userName: string;
}

function TweetHeader({userName}: TweetHeaderProps) {
  return <p className={styles.userName}>{userName}</p>;
}

export default TweetHeader;