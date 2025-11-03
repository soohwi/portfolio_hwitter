/**
 * components/common
 * Input/Input.tsx
**/

import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  htmlType?: string;
  name?: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  htmlType = 'text',
  name,
  value,
  placeholder = '',
  disabled = false,
  required = false,
  className = '',
  onChange,
}) => {
  return (
    <div className={`${styles.input} ${className}`}>
      <input
        type={htmlType}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}