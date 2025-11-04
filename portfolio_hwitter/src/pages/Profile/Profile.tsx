/**
 * pages/Profile
 * Profile.tsx
**/

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { handleFileChange } from "@/util/util";
import { Tweet } from "@/components/tweet";
import type { TweetType } from "@/types/tweet";
import { subscribeToUserTweets } from "@/services/tweetService";
import { getUserAvatar, changeUserAvatar } from "@/services/userService";
import styles from "./Profile.module.scss";

function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState<string | null>(null);
  const [tweets, setTweets] = useState<TweetType[]>([]);

  // Firestore에서 사용자 정보 가져오기
  const fetchAvatar = async() => {
    if (!user) return;
    const avatar = await getUserAvatar(user.uid);
    setAvatar(avatar ?? user.photoURL ?? null);
  };

  // 아바타 변경 처리
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    handleFileChange(e, async (fileData) => {
      await changeUserAvatar(user.uid, fileData);
      setAvatar(fileData);// 상태 업데이트
    });
  };

  useEffect(() => {
    if (!user) return;

    fetchAvatar();

    // 유저 트윗내용 가져오기
    const unsubscribe = subscribeToUserTweets(user.uid, (tweets) => {
      setTweets(tweets);
    });

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className={styles.profile}>
      <div className={styles.profileImgWrap}>
        <label htmlFor="avatar" aria-label="프로필 이미지 변경">
          {avatar ? (
            <img className={styles.profileImg} src={avatar} alt="프로필 이미지"/>
          ) : (
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </svg>
          )}
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={onAvatarChange}
        />
      </div>
      <span className={styles.userName}>{user?.displayName ?? 'Anonymous'}</span>
      <ul className={styles.userHistory}>
        {tweets.map(tweet => <li><Tweet key={tweet.id} {...tweet} /></li>)}
      </ul>
    </div>
  );
}

export default Profile;