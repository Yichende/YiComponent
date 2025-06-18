import { FC, ReactNode, useState, useRef, Children } from "react";
import styles from "./Menu.module.css";
import { Icon, IconName } from "../index";
import { Menu } from "./Menu";
import React from "react";

export interface SubMenuProps {
  title: ReactNode;
  icon?: IconName;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  mode?: "horizontal" | "vertical";
}

export const SubMenu: FC<SubMenuProps> = ({
  title,
  icon,
  children,
  disabled = false,
  className = "",
  mode = "horizontal",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const subMenuRef = useRef<HTMLLIElement>(null);

  const toggleSubMenu = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // 垂直模式下的子菜单位置
  // const verticalPositionClass = mode === "vertical" ? styles.verticalSubMenu : '';

  return (
    <li
      ref={subMenuRef}
      className={`${styles.subMenu} ${className} ${
        disabled ? styles.disabled : ""
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}>
      <div
        className={styles.subMenuTitle}
        onClick={mode === "vertical" ? toggleSubMenu : undefined}>
        <div className={`${styles.itemContent}`}>
          {icon && (
            <Icon
              name={icon}
              size="sm"
              className={styles.itemIcon}
            />
          )}
          <span className={styles.itemText}>{title}</span>
        </div>
        <Icon
          name={isOpen ? "arrow-up" : "arrow-down"}
          size="sm"
          className={`${styles.arrowIcon} ${
            mode === "vertical" ? styles.verticalArrow : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className={`${styles.subMenuContent} open`}>
          <Menu
            mode="vertical"
            className={styles.nestedMenu}>
            {Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) return child;

              const childElement = child as React.ReactElement<{
                className?: string;
                style?: React.CSSProperties;
              }>;

              return React.cloneElement(childElement, {
                className: `${childElement.props.className ?? ""} ${
                  styles.animatedItem
                }`,
                style: {
                  ...(childElement.props.style || {}),
                  animationDelay: `${index * 0.05}s`,
                },
              });
            })}
          </Menu>
        </div>
      )}
    </li>
  );
};
