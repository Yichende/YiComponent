import { FC, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "warning";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const YiButton: FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
  type = "button",
  variant = "primary",
  className = "",
  size = "md",
}) => {
  const isDisabled = disabled || isLoading;
  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      aria-disabled={isDisabled}
      aria-busy={isLoading}>
      <span
        className={`${styles.content} ${
          isLoading ? styles.loadingContent : ""
        }`}>
        {isLoading ? (
          <>
            <span
              className={styles.loader}
              aria-hidden="true">
              <span /> {/* 第三个点 */}
            </span>
            {loadingText}
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
};
