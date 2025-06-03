import { FC, ReactNode } from "react";
import styles from "./Button.module.css";
import { Icon, IconName } from '../Icon/Icon';

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
  icon?: IconName;
  iconPosition?: "left" | "right";
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
  icon,
  iconPosition = "left",
}) => {

  // 根据按钮尺寸设置图标尺寸
  const iconSizeMap = {
    sm: "sm",
    md: "sm",
    lg: "md",
  } as const;
  const iconSize = iconSizeMap[size];

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
          <>
            {icon && iconPosition === "left" && (
              <Icon 
                name={icon} 
                size={iconSize} 
                className={styles.iconLeft} 
                pixelSize={1}
              />
            )}
            {children}
            {icon && iconPosition === "right" && (
              <Icon 
                name={icon} 
                size={iconSize} 
                className={styles.iconRight} 
                pixelSize={1}
              />
            )}
          </>
        )}
      </span>
    </button>
  );
};
