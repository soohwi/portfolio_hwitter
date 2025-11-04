/**
 * services
 * userService.ts
**/

import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  updateDoc,
  where } from "firebase/firestore";

// 아바타 불러오기(Firestore에서 사용자 정보 가져오기)
export const getUserAvatar = async (userId: string): Promise<string | null> => {
  const avatarsRef = collection(db, "avatars");
  const avatarsQuery = query(avatarsRef, where("userId", "==", userId));
  const snapshot = await getDocs(avatarsQuery);

  if (!snapshot.empty) {
    const avatarData = snapshot.docs[0].data();

    // console.log("Avatar Data Found:", avatarData);// debug
    return avatarData.avatar ?? null;
  } else {
     console.log("No userId:", userId);// debug
  }

  return null;
};

// 아바타 저장 or 수정
export const changeUserAvatar = async (userId: string, fileData: string) => {
  const avatarsRef = collection(db, "avatars");
  const avatarsQuery = query(avatarsRef, where("userId", "==", userId));
  const snapshot = await getDocs(avatarsQuery);

  if (snapshot.empty) {
    // Firestore에 문서가 없을 때 새 문서 추가
    await addDoc(avatarsRef, { userId, avatar: fileData });
  } else {
    // Firestore에 문서가 있을 때 avatar 업데이트
    const docRef = snapshot.docs[0].ref;
    await updateDoc(docRef, { avatar: fileData });
  }
};