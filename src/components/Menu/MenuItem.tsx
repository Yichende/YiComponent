import { FC, ReactNode } from "react";
import styles from "./Menu.module.css";
import { Icon, IconName } from "../index";

export interface MenuItemProps {
  children: ReactNode;
  icon?: IconName;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const MenuItem: FC<MenuItemProps> = ({
  children,
  icon,
  disabled = false,
  active = false,
  onClick,
  className = "",
}) => {
  return (
    <li
      className={`${styles.menuItem} ${className} ${
        active ? styles.active : ""
      } ${disabled ? styles.disabled : ""}`}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}>
      <div className={`${styles.itemContent}`} >
        {icon && (
          <Icon
            name={icon}
            size="sm"
            className={styles.itemIcon}
          />
        )}
        <span className={styles.itemText}>{children}</span>
      </div>
    </li>
  );
};
