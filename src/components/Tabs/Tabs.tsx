import {
  FC,
  ReactNode,
  useState,
  useEffect,
  Children,
  isValidElement,
  ReactElement,
  useRef,
} from "react";
import styles from "./Tabs.module.css";
import { Icon, IconName } from "../index";

export interface TabsProps {
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  tabPosition?: "top" | "bottom" | "left" | "right";
  type?: "line" | "card";
  size?: "default" | "small";
  centered?: boolean;
  children: ReactNode;
  className?: string;
}

export interface TabPaneProps {
  tab: ReactNode;
  key: string;
  disabled?: boolean;
  icon?: IconName;
  children: ReactNode;
  className?: string;
}

interface TabsComponent extends FC<TabsProps> {
  TabPane: FC<TabPaneProps>;
}

export const Tabs: TabsComponent = ({
  defaultActiveKey,
  activeKey: propActiveKey,
  onChange,
  tabPosition = "top",
  type = "line",
  size = "default",
  centered = false,
  children,
  className = "",
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    propActiveKey || defaultActiveKey || getFirstTabKey(children)
  );
  const tabListRef = useRef<HTMLDivElement>(null);

  const activeKey =
    propActiveKey !== undefined ? propActiveKey : internalActiveKey;

  useEffect(() => {
    const tabList = tabListRef.current;
    if (!tabList) return;

    const onWheel = (e: WheelEvent) => {
      if (tabList.scrollWidth > tabList.clientWidth) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          tabList.scrollLeft += e.deltaY;
        }
      }
    };

    tabList.addEventListener("wheel", onWheel, { passive: false });
    return () => tabList.removeEventListener("wheel", onWheel);
  }, []);

  const handleTabClick = (key: string) => {
    if (propActiveKey === undefined) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  };

  const renderTabs = () => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return null;

      const { key, props } = child as ReactElement<TabPaneProps>;
      const tabKey = key as string;

      return (
        <div
          className={`${styles.tab} 
            ${activeKey === tabKey ? styles.active : ""}
            ${props.disabled ? styles.disabled : ""}
            ${size === "small" ? styles.small : ""}`}
          onClick={() => !props.disabled && handleTabClick(tabKey)}>
          {props.icon && (
            <Icon
              name={props.icon}
              size="sm"
              className={styles.tabIcon}
            />
          )}
          <span
            className={styles.tabText}
            title={typeof props.tab === "string" ? props.tab : undefined}>
            {props.tab}
          </span>
        </div>
      );
    });
  };

  const renderContent = () => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child;

      const { key, props } = child as ReactElement<TabPaneProps>;
      const tabKey = key as string;

      if (tabKey === activeKey) {
        return (
          <div className={`${styles.tabPane} ${props.className || ""}`}>
            {props.children}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div
      className={`${styles.tabs} 
        ${styles[tabPosition]} 
        ${styles[type]} 
        ${styles[size]} 
        ${centered ? styles.centered : ""} 
        ${className}`}>
      <div
        ref={tabListRef}
        className={styles.tabList}>
        {renderTabs()}
      </div>
      <div className={styles.tabContent}>{renderContent()}</div>
    </div>
  );
};

// 辅助函数：获取第一个标签的key
function getFirstTabKey(children: ReactNode): string {
  const firstChild = Children.toArray(children).find((child) =>
    isValidElement(child)
  ) as ReactElement<TabPaneProps> | undefined;

  return (firstChild?.key as string) || "1";
}

// TabPane 组件
export const TabPane: FC<TabPaneProps> = ({ children }) => {
  return <>{children}</>;
};

Tabs.TabPane = TabPane;
