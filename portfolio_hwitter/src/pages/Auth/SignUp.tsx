/**
 * pages/Auth
 * SignUp.tsx
**/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { GithubBtn, PasswordBtn } from "@/components/auth";
import { Button, Input } from "@/components/common";
import styles from "./Auth.module.scss";

function SignUp() {
  const navigate = useNavigate();// react hook
  // useState 묶어서 사용
  const [formData, setFormData] = useState({
    loading: false,
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;

    if (name === 'name') {
      setFormData(prev => ({...prev, name: value}));
    } else if (name === 'email') {
      setFormData(prev => ({...prev, email: value}));
    } else if (name === 'password') {
      setFormData(prev => ({...prev, password: value}));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(prev => ({...prev, error: ""}));

    const {name, email, password} = formData;

    try {
      setFormData(prev => ({...prev, loading: true}));

      // 1. 계정생성
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user);// 유저 정보

      // 2. 유저 이름 저장
      await updateProfile(credentials.user, {
        displayName: name,
      });

      // 3. redirect to the homepage
      navigate("/");
    } catch (e) {
      // setError
      if (e instanceof FirebaseError) {
        // setError(e.message);
        setFormData(prev => ({...prev, error: e.message}));
      }
    } finally {
      // setLoading(false);
      setFormData(prev => ({...prev, loading: false}));
    }
  }

  return (
    <div className={styles.authWrap}>
      <h1 className={styles.authTitle}>Join 𝕏</h1>
      <form className={styles.authForm} onSubmit={onSubmit}>
        <Input
          name="name"
          value={formData.name}
          placeholder="이름을 입력하세요"
          required
          onChange={onChange}
        />
        <Input
          name="email"
          value={formData.email}
          placeholder="이메일을 입력하세요"
          required
          onChange={onChange}
        />
        <Input
          htmlType="password"
          name="password"
          value={formData.password}
          placeholder="비밀번호를 입력하세요"
          required
          onChange={onChange}
        />
        <Button
          htmlType="submit"
          styleType="primary"
          size="full"
          value="계정 생성하기"
          loading={formData.loading}
          loadingText="Loading..."
          aria-label="계정 생성"
        />
      </form>
      {formData.error !== "" ? <p className={styles.textError}>{formData.error}</p> : null}
      <p className={styles.authCheck}>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
      <PasswordBtn />
      <GithubBtn />
    </div>
  );
}

export default SignUp;