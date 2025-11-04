/**
 * components/tweet
 * Tweet/TweetContent.tsx
**/

import { useState, useEffect } from "react";
import { Button } from "@/components/common";
import styles from "./Tweet.module.scss";

interface TweetContentProps {
  tweet: string;
  tweetId: string;
  isEditMode: boolean;
  onUpdate: (newTweet: string) => void;
  onCancel: () => void;
}

function TweetContent({tweet, isEditMode, tweetId, onUpdate, onCancel}: TweetContentProps) {
  const [editTweet, setEditTweet] = useState(tweet);

  useEffect(() => {
    setEditTweet(tweet);// 트윗 변경 시 초기화
  }, [tweet]);

  const onEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };

  const onEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(editTweet);
  };

  if (!isEditMode) {
    return <p className={styles.tweetContent}>{tweet}</p>;
  }

  return (
    <form onSubmit={onEditSubmit}>
      <label htmlFor="tweetContent" className="ir-blind">트윗 내용</label>
      <textarea
        id="tweetContent"
        name="tweetContent"
        className={styles.tweetWrite}
        placeholder="오늘 어떤 일이 있으셨나요?"
        value={editTweet}
        onChange={onEditChange}
      />
      <div className={styles.tweetBtns}>
        <Button
          htmlType="submit"
          styleType="primary"
          size="sm"
          value="저장"
          aria-label="편집 내용 저장"
        />
        <Button
          size="sm"
          value="취소"
          onClick={onCancel}
          aria-label="편집 내용 취소"
        />
      </div>
    </form>
  );
}

export default TweetContent;