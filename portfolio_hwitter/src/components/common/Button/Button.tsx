/**
 * components/common
 * Button/Button.tsx
**/

import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  value: string;
  loading?: boolean;
  loadingText?: string;
  htmlType?: 'button' | 'submit';
  styleType?: 'primary' | 'negative';
  size?: 'sm' | 'md' | 'full';
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  value,
  loading = false,
  loadingText = 'Loading...',
  htmlType = 'button',
  styleType = '',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
}) => {
  // 클래스명 조합
  const buttonClass = [
    styles.btn,
    styles[styleType],
    styles[size],
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  // 일반 버튼
  if (htmlType === 'button') {
    return (
      <button
        type={htmlType}
        className={buttonClass}
        disabled={disabled || loading}
        onClick={onClick}
      >
        <span>{value}</span>
      </button>
    );
  }

  // 기능 버튼 (submit, file 등)
  return (
    <div className={`${buttonClass} ${styles.btnSubmit}`}>
      <span>{loading ? loadingText : value}</span>
      <input type="submit" value={loading ? loadingText : value}/>
    </div>
  )
}
