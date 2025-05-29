import { FC, ReactNode } from "react";
import styles from "./Anchor.module.css";

interface AnchorLinkProps {
  href: string;
  title: ReactNode;
  children?: ReactNode;
  active?: boolean;
  onClick?: (href: string) => void;
}

export const AnchorLink: FC<AnchorLinkProps> = ({
  href,
  title,
  children,
  active = false,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(href);
  };

  return (
    <div className={`${styles.linkContainer} ${active ? styles.active : ""}`}>
      <a
        href={`#${href}`}
        className={styles.link}
        onClick={handleClick}
        aria-current={active ? "location" : undefined}>
        <span className={styles.linkBullet}></span>
        {title}
      </a>
      {children && <div className={styles.linkChildren}>{children}</div>}
    </div>
  );
};
