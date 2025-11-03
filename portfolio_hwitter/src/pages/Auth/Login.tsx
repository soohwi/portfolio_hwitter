/**
 * pages/Auth
 * Login.tsx
**/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GithubBtn, PasswordBtn } from "@/components/auth";
import { Button, Input } from "@/components/common";
import styles from "./Auth.module.scss";

function Login() {
  const navigate = useNavigate();// react hook
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    if (loading || email === "" || password === "") return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // redirect to the homepage
      navigate("/");
    } catch (e) {
      // setError
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.authWrap}>
      <h1 className={styles.authTitle}>Log into 𝕏</h1>
      <form className={styles.authForm} onSubmit={onSubmit}>
        <Input
          name="email"
          value={email}
          placeholder="이메일을 입력하세요"
          required
          onChange={onChange}
        />
        <Input
          htmlType="password"
          name="password"
          value={password}
          placeholder="비밀번호를 입력하세요"
          required
          onChange={onChange}
        />
        <Button
          htmlType="submit"
          styleType="primary"
          size="full"
          value="로그인"
          loading={loading}
          loadingText="Loading..."
          aria-label="로그인"
        />
      </form>
      {error !== "" ? <p className={styles.textError}>{error}</p> : null}
      <p className={styles.authCheck}>계정이 없으신가요? <Link to="/SignUp">계정 생성하기</Link></p>
      <PasswordBtn />
      <GithubBtn />
    </div>
  );
}

export default Login;