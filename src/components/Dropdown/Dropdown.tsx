import { FC, ReactNode, useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";
import { Icon, IconName } from "../index";

interface DropdownProps {
  children: ReactNode;
  trigger: ReactNode;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  className?: string;
  pixelSize?: number;
  disabled?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

export const Dropdown: FC<DropdownProps> = ({
  children,
  trigger,
  position = "bottom-left",
  className = "",
  pixelSize = 2,
  disabled = false,
  onVisibleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // 通知可见性变化
  useEffect(() => {
    onVisibleChange?.(isOpen);
  }, [isOpen, onVisibleChange]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // 计算下拉菜单位置
  const getPositionClass = () => {
    switch (position) {
      case "bottom-right":
        return styles.bottomRight;
      case "top-left":
        return styles.topLeft;
      case "top-right":
        return styles.topRight;
      default:
        return styles.bottomLeft;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${className}`}
      style={{ "--pixel-size": `${pixelSize}px` } as React.CSSProperties}>
      <div
        className={`${styles.trigger} ${disabled ? styles.disabled : ""}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}>
        {trigger}
        <Icon
          name={isOpen ? "arrow-up" : "arrow-down"}
          size="sm"
          className={styles.arrowIcon}
        />
      </div>

      {isOpen && (
        <div className={`${styles.menu} ${getPositionClass()}`}>{children}</div>
      )}
    </div>
  );
};
interface DropdownItemProps {
  children: ReactNode;
  icon?: IconName;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
}

export const DropdownItem: FC<DropdownItemProps> = ({
  children,
  icon,
  onClick,
  href,
  className = "",
  disabled = false,
}) => {
  const content = (
    <>
      <span className={styles.itemIconWrapper}>
        {icon && (
          <Icon name={icon} size="sm" className={styles.itemIcon} />
        )}
      </span>
      <span className={styles.itemText}>{children}</span>
    </>
  );

  // 若有 href 且未禁用，使用 <a>
  if (href && !disabled) {
    return (
      <a
        href={href}
        className={`${styles.item} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={`${styles.item} ${className} ${disabled ? styles.disabled : ""}`}
      onClick={disabled ? undefined : onClick}
    >
      {content}
    </div>
  );
};