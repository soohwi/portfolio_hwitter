/**
 * pages/Profile
 * Profile.tsx
**/

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { addDoc, collection, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { handleFileChange } from "@/util/util";
import { Tweet } from "@/components/tweet";
import type { TweetType } from "@/types/tweet";
import styles from "./Profile.module.scss";

function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(null);
  const [tweets, setTweets] = useState<TweetType[]>([]);

  // Firestore에서 사용자 정보 가져오기
  const fetchUserAvatar = async() => {
    if (!user) return;

    const avatarsCollectionRef = collection(db, "avatars");
    const avatarsQuery = query(avatarsCollectionRef, where("userId", "==", user.uid));
    const avatarsSnapshot = await getDocs(avatarsQuery);

    if (!avatarsQuery.empty) {
      const avatarData = avatarsSnapshot.docs[0].data();

      console.log("Avatar Data Found:", avatarData);// debug
      setAvatar(avatarData.avatar);
    } else {
      console.log("No userId:", user.uid);// debug
      setAvatar(user?.photoURL || null);
    }
  };

  useEffect(() => {
    fetchUserAvatar();
  }, [user]);

  // 아바타 변경 처리
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (files && files.length === 1) {
      handleFileChange(e, async(fileData) => {
        if (!user) return;

        const usersCollectionRef = collection(db, "avatars");
        const avatarQuery = query(
          usersCollectionRef,
          where("userId", "==", user.uid)
        );
        const avatarSnapshot = await getDocs(avatarQuery);

        if (avatarSnapshot.empty) {
          // Firestore에 문서가 없을 때 새 문서 추가
          await addDoc(usersCollectionRef, {
            avatar: fileData,
            userId: user.uid,
          });
        } else {
          // Firestore에 문서가 있을 때 avatar 업데이트
          const docRef = avatarSnapshot.docs[0].ref;
          await updateDoc(docRef, {avatar: fileData});
        }

        setAvatar(fileData);// 상태 업데이트
      });
    }
  };

  // 유저 트윗내용 가져오기
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),// filter user
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
      const {fileData, tweet, userId, userName, createdAt} = doc.data();
      return {
        fileData,
        tweet,
        userId,
        userName,
        createdAt,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profileImgWrap}>
        <label htmlFor="avatar">
          {avatar ? (
            <img className={styles.profileImg} src={avatar} />
          ) : (
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
            </svg>
          )}
        </label>
        <input
          onChange={onAvatarChange}
          id="avatar"
          type="file"
          accept="image/*"
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