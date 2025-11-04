/**
 * components/tweet
 * Tweet/TweetActions.tsx
**/

import styles from "./Tweet.module.scss";
import { Button } from "@/components/common";

interface TweetActionsProps {
  canEdit: boolean;
  isEditMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

function TweetActions({canEdit, isEditMode, onEdit, onDelete}: TweetActionsProps) {
  if (!canEdit || isEditMode) return null;

  return (
    <div className={styles.tweetBtns}>
      <Button
        size="sm"
        value="편집"
        onClick={onEdit}
        aria-label="트윗 편집"
      />
      <Button
        size="sm"
        styleType="negative"
        value="삭제"
        onClick={onDelete}
        aria-label="트윗 삭제"
      />
    </div>
  );
}

export default TweetActions;