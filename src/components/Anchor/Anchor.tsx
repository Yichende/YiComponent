import { FC, ReactNode, useState, useEffect, useRef } from "react";
import styles from "./Anchor.module.css";
import { AnchorLink } from "./AnchorLink";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 获取所有锚点目标元素
  const getTargetElements = () => {
    if (!containerRef.current) return [];
    
    const links = containerRef.current.querySelectorAll('a[href^="#"]');
    const targets = Array.from(links).map(link => {
      const href = link.getAttribute('href')?.substring(1);
      return href ? document.getElementById(href) : null;
    }).filter(Boolean) as HTMLElement[];
    
    return targets;
  };

  // 初始化 IntersectionObserver
  useEffect(() => {
    const targets = getTargetElements();
    if (targets.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
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

    targets.forEach(target => {
      observerRef.current?.observe(target);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [children, offsetTop]);

  // 处理链接点击
  const handleLinkClick = (href: string) => {
    const target = document.getElementById(href);
    if (target) {
      // 平滑滚动到目标位置
      window.scrollTo({
        top: target.offsetTop - offsetTop,
        behavior: "smooth"
      });
      setActiveLink(href);
    }
  };

  // 克隆子元素并添加active状态
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          active: activeLink === (child.props as any).href,
          onClick: handleLinkClick
        } as any);
      }
      return child;
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.anchor} ${className}`}
      style={{
        '--pixel-size': `${pixelSize}px`,
      } as React.CSSProperties}
    >
      <div className={styles.anchorIndicator}>
        <div className={`${styles.indicatorLine} ${activeLink ? styles.active : ''}`}></div>
      </div>
      <div className={styles.anchorLinks}>
        {renderChildren()}
      </div>
    </div>
  );
};

Anchor.Link = AnchorLink;