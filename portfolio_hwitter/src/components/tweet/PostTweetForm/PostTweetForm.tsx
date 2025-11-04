/**
 * components/tweet
 * PostTweetForm/PostTweetForm.tsx
**/

import { useState } from "react";
import { auth } from "@/firebase";
import { createTweet } from "@/services/tweetService";
import { handleFileChange } from "@/util/util";
import { Button } from "@/components/common";
import styles from "./PostTweetForm.module.scss";

function PostTweetForm() {
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<string | undefined>(undefined);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  }

  // base64 인코딩(firebase storage 유료화로 해당방법 사용)
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, (fileData) => {
      setFile(fileData);
    });
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user || loading || tweet === "" || tweet.length > 180) return;

    try {
      setLoading(true);
      await createTweet({
        tweet,
        createdAt: Date.now(),
        userName: user.displayName || "Anonymous",
        userId: user.uid,
        ...(file && {fileData: file}),// file이 있을때만 포함
      });
      setTweet("");
      setFile(undefined);
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTweet("");
      setFile(undefined);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="tweetContent" className="ir-blind">트윗 내용</label>
      <textarea
        id="tweetContent"
        name="tweetContent"
        className={styles.tweetContent}
        placeholder="오늘 어떤 일이 있으셨나요?"
        rows={5}
        maxLength={180}
        required
        value={tweet}
        onChange={onChange}
      ></textarea>
      <div className={styles.tweetAddPhoto}>
        <label
          htmlFor="file"
          className={styles.btnAdd}
        >
          {file ? "Photo Added ✅" : "Add Photo"}
        </label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={onFileChange}
        />
      </div>
      <Button
        htmlType="submit"
        styleType="primary"
        size="full"
        value="Post Tweet"
        loading={loading}
        loadingText="Posting..."
        aria-label="트위터 올리기"
      />
    </form>
  );
}

export default PostTweetForm;