/**
 * components/common
 * LoadingScreen/LoadingScreen.tsx
**/

import styles from './LoadingScreen.module.scss';

function LoadingScreen() {
  return (
    <div className={styles.loading}>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingScreen;