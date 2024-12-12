import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  label: string; // 按钮显示的文字
  onClick?: () => void; // 点击事件回调
  variant?: 'primary' | 'secondary'; // 按钮样式类型
  disabled?: boolean; // 是否禁用
};

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', disabled = false }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
