import { FC, ReactNode, Children, cloneElement, ReactElement } from "react";
import styles from "./Breadcrumb.module.css";
import { BreadcrumbItem, BreadcrumbItemProps } from "./BreadcrumbItem";
import { Dropdown, DropdownItem } from "../index";
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
  overflowedIndicator = "更多",
}) => {
  const items = Children.toArray(children) as ReactElement<BreadcrumbItemProps>[];
  const totalItems = items.length;

  // 若不超出最大项数
  if (totalItems <= maxItems) {
    const rendered = items.map((child, index) =>
      React.isValidElement(child)
        ? cloneElement(child, {
            separator,
            isLast: index === totalItems - 1,
            key: index,
          })
        : child
    );

    return (
      <nav
        className={`${styles.breadcrumb} ${className}`}
        style={{ "--pixel-size": `${pixelSize}px` } as React.CSSProperties}
        aria-label="breadcrumb"
      >
        <ol className={styles.list}>{rendered}</ol>
      </nav>
    );
  }

  // 当前页面（始终显示）
  const lastItem = items[totalItems - 1];

  // 当 maxItems = 1，只显示下拉 + 当前项
  if (maxItems === 1) {
    const overflowed = items.slice(0, totalItems - 1);
    const visibleItems: ReactNode[] = [
      <li key="overflowed" className={styles.item}>
        <Dropdown
          trigger={<span className={styles.overflowDropdown}>{overflowedIndicator}</span>}
          position="bottom-left"
        >
          {overflowed.map((item, index) => (
            <DropdownItem
              key={index}
              onClick={item.props.onClick}
              icon={item.props.icon}
            >
              {item.props.children}
            </DropdownItem>
          ))}
        </Dropdown>
        <span className={styles.separator}>{separator}</span>
      </li>,
      cloneElement(lastItem, {
        separator,
        isLast: true,
        key: "last",
      }),
    ];

    return (
      <nav
        className={`${styles.breadcrumb} ${className}`}
        style={{ "--pixel-size": `${pixelSize}px` } as React.CSSProperties}
        aria-label="breadcrumb"
      >
        <ol className={styles.list}>{visibleItems}</ol>
      </nav>
    );
  }

  // 若 maxItems > 1，显示前若干项 + 下拉 + 当前项
  const numMiddleVisible = maxItems - 2; // 除首末外可见项数量
  const startItems = items.slice(0, 1 + numMiddleVisible); // 首项 + 可见中间项
  const overflowed = items.slice(1 + numMiddleVisible, totalItems - 1); // 中间溢出项

  const visibleItems: ReactNode[] = [];

  // 渲染前项（首 + 中间可见项）
  visibleItems.push(
    ...startItems.map((item, index) =>
      cloneElement(item, {
        separator,
        isLast: false,
        key: `start-${index}`,
      })
    )
  );

  // 渲染下拉（如有溢出）
  if (overflowed.length > 0) {
    visibleItems.push(
      <li key="overflowed" className={styles.item}>
        <Dropdown
          trigger={<span className={styles.overflowDropdown}>{overflowedIndicator}</span>}
          position="bottom-left"
        >
          {overflowed.map((item, index) => (
            <DropdownItem
              key={index}
              onClick={item.props.onClick}
              icon={item.props.icon}
              href={item.props.href}
            >
              {item.props.children}
            </DropdownItem>
          ))}
        </Dropdown>
        <span className={styles.separator}>{separator}</span>
      </li>
    );
  }

  // 添加当前项（始终在最后）
  visibleItems.push(
    cloneElement(lastItem, {
      separator,
      isLast: true,
      key: "last",
    })
  );

  return (
    <nav
      className={`${styles.breadcrumb} ${className}`}
      style={{ "--pixel-size": `${pixelSize}px` } as React.CSSProperties}
      aria-label="breadcrumb"
    >
      <ol className={styles.list}>{visibleItems}</ol>
    </nav>
  );
};

Breadcrumb.Item = BreadcrumbItem;
