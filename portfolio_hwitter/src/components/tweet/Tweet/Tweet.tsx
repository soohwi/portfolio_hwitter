/**
 * components/tweet
 * Tweet/Tweet.tsx
**/

import { useState } from "react";
import { auth, db } from "@/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import type { TweetType } from "@/types/tweet";
import { Button } from "@/components/common";
import styles from "./Tweet.module.scss";

function Tweet({userName, fileData, tweet, userId, id}: TweetType) {
  const user = auth.currentUser;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);

  const onDelete = async () => {
    const ok = confirm("해당 트윗을 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;

    try {
      await deleteDoc(doc(db, "tweets", id))
    } catch (error) {
      console.log(error);
    }
  };

  const onEditCancel = () => {
    setEditTweet(tweet);
    setIsEditMode(false);
  };

  const onEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };

  const onEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "tweets", id), {
        tweet: editTweet
      });
      setEditTweet("");
      setIsEditMode(false);
    } catch(error) {
      console.log(error);
    } finally {
      setEditTweet("");
      setIsEditMode(false);
    }
  };

  const onEdit = () => {
    setEditTweet(tweet);
    setIsEditMode(true);
  };

  return (
    <div className={styles.tweetWrap}>
      <div className={styles.tweet}>
        <p className={styles.userName}>{userName}</p>
        {isEditMode ? (
          <form onSubmit={onEditSubmit}>
            <textarea
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
              />
              <Button
                size="sm"
                value="취소"
                onClick={onEditCancel}
              />
            </div>
          </form>
        ) : <p className={styles.tweetContent}>{tweet}</p>}
        {user?.uid === userId && !isEditMode ? (
          <div className={styles.tweetBtns}>
            <Button
              size="sm"
              value="편집"
              onClick={onEdit}
            />
            <Button
              size="sm"
              styleType="negative"
              value="삭제"
              onClick={onDelete}
            />
          </div>
        ) : null}
      </div>
      {fileData ? (
        <div className={styles.tweetPhoto}>
          <img src={fileData} />
        </div>
      ) : null}
    </div>
  );
}

export default Tweet;