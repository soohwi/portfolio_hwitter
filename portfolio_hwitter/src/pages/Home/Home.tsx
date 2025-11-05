/**
 * pages/Home
 * Home.tsx
**/

import { PostTweetForm, TimeLine } from "@/components/tweet";
import styles from "./Home.module.scss";

function Home() {
  return (
    <main className={styles.home}>
      <h1 className="sr-only">홈</h1>
      <PostTweetForm />
      <TimeLine />
    </main>
  );
}

export default Home;