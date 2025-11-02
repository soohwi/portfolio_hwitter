import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import styles from "./GithubBtn.module.scss";

export default function GithubButton() {
  const navigate = useNavigate();

  const signInGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button type="button" className={styles.button} onClick={signInGithub}>
      <span className={styles.logo}><img src="/logo_github.svg" alt="Github Logo"/></span>
      <span className={styles.text}>Github로 계속하기</span>
    </button>
  );
}