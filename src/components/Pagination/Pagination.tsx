import { FC, useState, useEffect } from "react";
import styles from "./Pagination.module.css";
import { Icon } from '../index'

export interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  size?: "default" | "small";
  onChange?: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Pagination: FC<PaginationProps> = ({
  current = 1,
  total = 0,
  pageSize = 10,
  size = "default",
  onChange,
  showSizeChanger = false,
  showQuickJumper = false,
  disabled = false,
  className = "",
}) => {
  const [internalCurrent, setInternalCurrent] = useState(current);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);
  const [jumperValue, setJumperValue] = useState("");
  
  const totalPages = Math.ceil(total / internalPageSize);
  
  useEffect(() => {
    setInternalCurrent(current);
  }, [current]);
  
  useEffect(() => {
    setInternalPageSize(pageSize);
  }, [pageSize]);
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === internalCurrent || disabled) return;
    
    setInternalCurrent(page);
    onChange?.(page, internalPageSize);
  };
  
  const handleSizeChange = (size: number) => {
    const newTotalPages = Math.ceil(total / size);
    const newCurrent = internalCurrent > newTotalPages ? newTotalPages : internalCurrent;
    
    setInternalPageSize(size);
    setInternalCurrent(newCurrent);
    onChange?.(newCurrent, size);
  };
  
  const handleJumper = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(jumperValue);
      if (!isNaN(page)) {
        if (page >= 1 && page <= totalPages) {
          handlePageChange(page);
        }
      }
      setJumperValue("");
    }
  };
  
  const generatePageItems = () => {
    if (size === "small") return null; // 迷你版不显示页码
    
    const items = [];
    const maxVisible = 5; // 最多显示5个页码
    const halfMax = Math.floor(maxVisible / 2);
    
    let startPage = Math.max(1, internalCurrent - halfMax);
    let endPage = Math.min(totalPages, internalCurrent + halfMax);
    
    if (endPage - startPage < maxVisible - 1) {
      if (internalCurrent <= halfMax) {
        endPage = Math.min(totalPages, maxVisible);
      } else {
        startPage = Math.max(1, totalPages - maxVisible + 1);
      }
    }
    
    // 第一页
    if (startPage > 1) {
      items.push(
        <PaginationItem
          key={1}
          page={1}
          active={1 === internalCurrent}
          onClick={() => handlePageChange(1)}
          disabled={disabled}
          size={size}
        />
      );
      
      if (startPage > 2) {
        items.push(
          <li key="ellipsis-start" className={styles.ellipsis}>
            ...
          </li>
        );
      }
    }
    
    // 中间页码
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem
          key={i}
          page={i}
          active={i === internalCurrent}
          onClick={() => handlePageChange(i)}
          disabled={disabled}
          size={size}
        />
      );
    }
    
    // 最后一页
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <li key="ellipsis-end" className={styles.ellipsis}>
            ...
          </li>
        );
      }
      
      items.push(
        <PaginationItem
          key={totalPages}
          page={totalPages}
          active={totalPages === internalCurrent}
          onClick={() => handlePageChange(totalPages)}
          disabled={disabled}
          size={size}
        />
      );
    }
    
    return items;
  };
  
  // 迷你版显示当前页码和总页数
  const miniInfo = size === "small" ? (
    <div className={styles.miniInfo}>
      {internalCurrent} / {totalPages}
    </div>
  ) : null;
  
  return (
    <div className={`${styles.pagination} ${styles[size]} ${className} ${disabled ? styles.disabled : ''}`}>
      <div className={styles.paginationContainer}>
        <button
          className={`${styles.prev} ${styles.paginationButton}`}
          onClick={() => handlePageChange(internalCurrent - 1)}
          disabled={internalCurrent <= 1 || disabled}
        >
          <span className={styles.buttonContent}>
          <Icon name="chevron-left" size="sm" />
          </span>
        </button>
        
        {miniInfo}
        
        <ul className={styles.pages}>
          {generatePageItems()}
        </ul>
        
        <button
          className={`${styles.next} ${styles.paginationButton}`}
          onClick={() => handlePageChange(internalCurrent + 1)}
          disabled={internalCurrent >= totalPages || disabled}
        >
          <span className={styles.buttonContent}>
          <Icon name="chevron-right" size="sm" />
          </span>
        </button>
        
        {size === "default" && showSizeChanger && (
          <div className={styles.sizeChanger}>
            <span className={styles.sizeLabel}>每页显示</span>
            <select
              value={internalPageSize}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              disabled={disabled}
              className={styles.sizeSelect}
            >
              <option value={5}>5 条</option>
              <option value={10}>10 条</option>
              <option value={20}>20 条</option>
              <option value={50}>50 条</option>
            </select>
          </div>
        )}
        
        {size === "default" && showQuickJumper && (
          <div className={styles.quickJumper}>
            <span className={styles.jumperLabel}>跳至</span>
            <input
              type="text"
              value={jumperValue}
              onChange={(e) => setJumperValue(e.target.value)}
              onKeyDown={handleJumper}
              disabled={disabled}
              className={styles.jumperInput}
            />
            <span className={styles.jumperSuffix}>页</span>
          </div>
        )}
        
        {size === "default" && (
          <div className={styles.total}>
            共 {total} 条
          </div>
        )}
      </div>
    </div>
  );
};

interface PaginationItemProps {
  page: number;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  size?: "default" | "small";
}

const PaginationItem: FC<PaginationItemProps> = ({
  page,
  active,
  onClick,
  disabled = false,
  size = "default"
}) => {
  return (
    <li className={`${styles.pageItem} ${active ? styles.active : ''} ${disabled ? styles.disabled : ''}`}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles.pageButton} ${size === "small" ? styles.small : ''}`}
      >
        {page}
      </button>
    </li>
  );
};