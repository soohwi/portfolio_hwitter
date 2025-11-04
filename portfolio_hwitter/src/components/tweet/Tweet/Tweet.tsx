/**
 * components/tweet
 * Tweet/Tweet.tsx
**/

import { useState } from "react";
import { auth } from "@/firebase";
import { deleteTweet, updateTweet } from "@/services/tweetService";
import type { TweetType } from "@/types/tweet";
import TweetHeader from "./TweetHeader";
import TweetActions from "./TweetActions";
import TweetContent from "./TweetContent";
import styles from "./Tweet.module.scss";

function Tweet({userName, fileData, tweet, userId, id}: TweetType) {
  const user = auth.currentUser;
  const [isEditMode, setIsEditMode] = useState(false);

  const canEdit = user?.uid === userId;

  const handleDelete = async () => {
    const ok = confirm("해당 트윗을 삭제하시겠습니까?");
    if (!ok) return;
    await deleteTweet(id);
  };

  const handleUpdate = async (newTweet: string) => {
    await updateTweet(id, newTweet);
    setIsEditMode(false);
  };

  return (
    <div className={styles.tweetWrap}>
      <div className={styles.tweet}>
        <TweetHeader userName={userName} />
        <TweetContent
          tweet={tweet}
          tweetId={id}
          isEditMode={isEditMode}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditMode(false)}
        />
        <TweetActions
          canEdit={canEdit}
          isEditMode={isEditMode}
          onEdit={() => setIsEditMode(true)}
          onDelete={handleDelete}
        />
      </div>
      {fileData && (
        <div className={styles.tweetPhoto}>
          <img src={fileData} alt="트윗 업로드 이미지" />
        </div>
      )}
    </div>
  );
}

export default Tweet;