import { PostTweetForm, TimeLine } from "@/components/tweet";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <PostTweetForm />
      <TimeLine />
    </div>
  );
}