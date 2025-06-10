import { FC, ReactNode } from "react";
import styles from "./Breadcrumb.module.css";
import { Icon, IconName } from "../index";
import { Link as RouterLink } from "react-router-dom";

export interface BreadcrumbItemProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  isLast?: boolean;
  icon?: IconName;
  separator?: ReactNode;
}

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
  children,
  href,
  onClick,
  isLast = false,
  icon,
  separator = "/",
}) => {
  const content = (
    <span className={styles.itemContent}>
      {icon && (
        <Icon
          name={icon}
          size="sm"
          className={styles.itemIcon}
        />
      )}
      {children}
    </span>
  );

  const renderLink = () => {
    if (isLast) {
      return <span className={`${styles.link} ${styles.current}`}>{content}</span>;
    }

    if (href?.startsWith("/")) {
      // 内部路由跳转
      return (
        <RouterLink
          to={href}
          className={styles.link}
          onClick={onClick}>
          {content}
        </RouterLink>
      );
    }

    if (href) {
      // 外部链接跳转
      return (
        <a
          href={href}
          className={styles.link}
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              onClick();
            }
          }}>
          {content}
        </a>
      );
    }

    // 无 href，仅执行点击事件
    return (
      <button
        className={styles.link}
        onClick={onClick}>
        {content}
      </button>
    );
  };

  return (
    <li className={styles.item}>
      <span>{renderLink()}</span>
      {!isLast && <span className={styles.separator}>{separator}</span>}
    </li>
  );
};
