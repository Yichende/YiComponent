import { FC, ReactNode, Children, cloneElement, ReactElement } from "react";
import styles from "./Breadcrumb.module.css";
import { BreadcrumbItem, BreadcrumbItemProps } from "./BreadcrumbItem";
import React from "react";

interface BreadcrumbProps {
  children: ReactNode;
  separator?: ReactNode;
  className?: string;
  pixelSize?: number;
  maxItems?: number;
  overflowedIndicator?: ReactNode;
}

interface BreadcrumbComponent extends FC<BreadcrumbProps> {
  Item: typeof BreadcrumbItem;
}

export const Breadcrumb: BreadcrumbComponent = ({
  children,
  separator = "/",
  className = "",
  pixelSize = 2,
  maxItems = 4,
  overflowedIndicator = "...",
}) => {
  const items = Children.toArray(children);
  const totalItems = items.length;
  
  // 处理溢出情况
  let visibleItems: ReactNode[] = [];
  
  if (totalItems <= maxItems) {
    visibleItems = items;
  } else {
    visibleItems = [
      items[0],
      <BreadcrumbItem key="overflowed" separator={separator}>
        {overflowedIndicator}
      </BreadcrumbItem>,
      ...items.slice(totalItems - maxItems + 1)
    ];
  }

  // 为每个子项添加分隔符和位置信息
  const renderItems = visibleItems.map((child, index) => {
    if (!React.isValidElement(child)) return child;
    
    return cloneElement(child as ReactElement<BreadcrumbItemProps>, {
      separator,
      isLast: index === visibleItems.length - 1,
      key: index,
    });
  });

  return (
    <nav 
      className={`${styles.breadcrumb} ${className}`}
      style={{ "--pixel-size": `${pixelSize}px` } as React.CSSProperties}
      aria-label="breadcrumb"
    >
      <ol className={styles.list}>
        {renderItems}
      </ol>
    </nav>
  );
};

Breadcrumb.Item = BreadcrumbItem;