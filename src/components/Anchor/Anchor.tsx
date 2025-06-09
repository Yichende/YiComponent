import { FC, ReactNode, useState, useEffect, useRef } from "react";
import styles from "./Anchor.module.css";
import { AnchorLink } from "./AnchorLink";
import { Icon } from "../Icon/Icon";
import React from "react";

interface AnchorProps {
  children: ReactNode;
  offsetTop?: number;
  pixelSize?: number;
  className?: string;
}

interface AnchorComponent extends FC<AnchorProps> {
  Link: typeof AnchorLink;
}

export const Anchor: AnchorComponent = ({
  children,
  offsetTop = 20,
  pixelSize = 2,
  className = "",
}) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0);

  // 动画
  const [collapsed, setCollapsed] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  // 递归获取所有 href id
  const getAllAnchorIds = (children: ReactNode): string[] => {
    const ids: string[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      const { href, children: subChildren } = child.props;
      if (href) ids.push(href);
      if (subChildren) {
        ids.push(...getAllAnchorIds(subChildren));
      }
    });
    return ids;
  };

  // 获取当前activeLink的DOM元素相对于容器的偏移量和高度
  useEffect(() => {
    if (!activeLink || !linksRef.current) return;

    const activeEl = linksRef.current.querySelector(
      `#link-${activeLink}`
    ) as HTMLElement;
    if (activeEl) {
      const containerTop = linksRef.current.getBoundingClientRect().top;
      const elTop = activeEl.getBoundingClientRect().top;
      const relativeTop = elTop - containerTop;

      setIndicatorTop(relativeTop);
      setIndicatorHeight(activeEl.offsetHeight);
    }
  }, [activeLink]);

  useEffect(() => {
    const ids = getAllAnchorIds(children);

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 创建IntersectionObserver 观察DOM中目标元素是否进入视口
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${offsetTop}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    targets.forEach((target) => {
      observerRef.current?.observe(target);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [children, offsetTop]);

  const handleLinkClick = (href: string) => {
    const target = document.getElementById(href);
    if (target) {
      const offset =
        target.getBoundingClientRect().top + window.scrollY - offsetTop;
      window.scrollTo({ top: offset, behavior: "smooth" });
      setActiveLink(href);
    }
  };

  // 通过cloneElement 递归所有Anchor.Link注入props(active, onClick,children)
  const injectProps = (nodes: ReactNode): ReactNode => {
    return React.Children.map(nodes, (child) => {
      if (!React.isValidElement(child)) return child;

      const href = child.props.href;
      const subChildren = child.props.children;

      return React.cloneElement(child as React.ReactElement<any>, {
        active: activeLink === href,
        onClick: handleLinkClick,
        children: injectProps(subChildren),
      });
    });
  };

  const toggleCollapse = () => {
    if (!collapsed) {
      setIsHiding(true);
      setTimeout(() => {
        setCollapsed(true);
        setIsHiding(false);
      }, 300);
    } else {
      // 展开
      setCollapsed(false);
    }
  };

  return (
    <div
      className={`${styles.anchorWrapper} ${collapsed ? styles.collapsed : ""}`}
      style={{ "--pixel-size": `${pixelSize}px` } as React.CSSProperties}>
      {/* collapsedButton */}
      {collapsed && (
        <div
          className={styles.collapsedButton}
          onClick={toggleCollapse}
        />
      )}

      {(!collapsed || isHiding) && (
        <div
          className={`${styles.anchor} ${className} ${
            isHiding ? styles.hiding : ""
          }`}
          style={{ "--pixel-size": `${pixelSize}px` } as React.CSSProperties}>
          <div className={styles.anchorHeader}>
            <Icon
              name="backburger"
              size="md"
              color="#4e5969"
              onClick={() => toggleCollapse()}
              className={styles.collapseIcon}
            />
          </div>
          <div className={styles.anchorIndicator}>
            <div
              ref={indicatorRef}
              className={`${styles.indicatorLine} ${
                activeLink ? styles.active : ""
              }`}
              style={{
                top: `${indicatorTop}px`,
                height: `${indicatorHeight}px`,
              }}
            />
          </div>
          <div
            className={styles.anchorLinks}
            ref={linksRef}>
            {injectProps(children)}
          </div>
        </div>
      )}
    </div>
  );
};

Anchor.Link = AnchorLink;
