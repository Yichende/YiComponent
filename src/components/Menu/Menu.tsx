import { FC, ReactNode, useState, Children, ReactElement, cloneElement } from "react";
import styles from "./Menu.module.css";
import { MenuItem, MenuItemProps } from "./MenuItem";
import { SubMenu, SubMenuProps } from "./SubMenu";
import React from "react"

interface MenuProps {
  children: ReactNode;
  mode?: "horizontal" | "vertical";
  className?: string;
  pixelSize?: number;
  activeKey?: string;
  onSelect?: (key: string) => void;
}

interface MenuComponent extends FC<MenuProps> {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
}

export const Menu: MenuComponent = ({
  children,
  mode = "horizontal",
  className = "",
  pixelSize = 2,
  activeKey = "",
  onSelect,
}) => {
  const [activeItem, setActiveItem] = useState(activeKey);
  
  const handleItemClick = (key: string) => {
    setActiveItem(key);
    onSelect?.(key);
  };
  
  // 为每个子项添加激活状态和点击事件
  const renderChildren = Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    
    const key = child.key || index.toString();
    const isActive = activeItem === key;
    
    // 处理 MenuItem
    if (child.type === MenuItem) {
      return cloneElement(child as ReactElement<MenuItemProps>, {
        active: isActive,
        onClick: () => handleItemClick(key),
      });
    }
    
    // 处理 SubMenu
    if (child.type === SubMenu) {
      return cloneElement(child as ReactElement<SubMenuProps>, {
        mode,
        key,
      });
    }
    
    return child;
  });
  
  const modeClass = mode === "horizontal" ? styles.horizontal : styles.vertical;
  
  return (
    <ul 
      className={`${styles.menu} ${modeClass} ${className}`}
      style={{ "--pixel-size": `${pixelSize}px` } as React.CSSProperties}
    >
      {renderChildren}
    </ul>
  );
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;