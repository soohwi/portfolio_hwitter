/**
 * components/auth
 * PasswordBtn/PasswordBtn.tsx
**/

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Input } from "@/components/common/Input/Input";
import { Button } from "@/components/common/Button/Button";
import Modal from "@/components/common/Modal/Modal"
import styles from "./PasswordBtn.module.scss";

export default function PasswordBtn() {
  const [showModal, setShowModal] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => setIsAnimation(true), 10);
  };

  const closeModal = () => {
    setIsAnimation(false);

    // 애니메이션 완료 후 모달닫기
    setTimeout(() => {
      setShowModal(false);
      setEmail("");
    }, 300);
  };

  const handleSend = async () => {
    // 이메일 미입력
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    };

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      alert("이메일 재설정 메일이 발송되었습니다.");
      setEmail("");
      setLoading(false);
      setIsAnimation(false);
      setTimeout(() => setShowModal(false), 300);// 애니메이션 끝나면 닫기
    } catch(error: any) {
      let errorMsg = "이메일 발송에 실패했습니다.";
      if (error.code === 'auth/user-not-found') {
        errorMsg = "등록되지 않은 이메일입니다.";
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = "올바르지 않은 이메일 형식입니다.";
      }
      alert(errorMsg);
      // console.error(error);
    } finally {
      setLoading(false);
    };
  };

  // Enter key로 발송
  useEffect(() => {
    if (!showModal) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !loading) {
        e.preventDefault();
        handleSend();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [showModal, loading, email]);

  // 모달 열릴 때 input에 자동 focus
  useEffect(() => {
    if (showModal && isAnimation) {
      const input = document.querySelector(`.${styles.input}`) as HTMLInputElement;
      input?.focus();
    }
  }, [showModal, isAnimation]);

  // 모달 body
  const modalBody = (
    <Input
      htmlType="email"
      placeholder="이메일을 입력하세요"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );

  // 모달 footer
  const modalFooter = (
    <div className={styles.btnGroup}>
      <Button
        value="취소"
        onClick={closeModal}
      />
      <Button
        styleType="primary"
        value="발송"
        loading={loading}
        loadingText="발송 중..."
        onClick={handleSend}
      />
    </div>
  );

  return (
    <>
      <div className={styles.pwBox}>
        비밀번호를 잊으셨나요?
        <button className={styles.resetPwBtn} onClick={openModal}>비밀번호 재설정</button>
      </div>

      <Modal
        showModal={showModal}
        isAnimation={isAnimation}
        onClose={closeModal}
        title="비밀번호 재설정"
        body={modalBody}
        footer={modalFooter}
      >
      </Modal>
    </>
  );
};