/**
 * pages/Home
 * Home.tsx
**/

import { PostTweetForm, TimeLine } from "@/components/tweet";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.home}>
      <PostTweetForm />
      <TimeLine />
    </div>
  );
}

export default Home;