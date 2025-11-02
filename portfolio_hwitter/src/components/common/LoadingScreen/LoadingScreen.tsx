import styles from './LoadingScreen.module.scss';

export default function LoadingScreen() {
  return (
    <div className={styles.loading}>
      <p>Loading...</p>
    </div>
  );
}