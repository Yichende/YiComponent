import {
  FC,
  useState,
  ReactNode,
  ChangeEvent,
  createContext,
  useContext,
  Children
} from "react";
import styles from "./Checkbox.module.css";
import { Icon } from "../index";

export interface CheckboxProps {
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  className?: string;
}

export interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  disabled?: boolean;
  onChange?: (values: string[]) => void;
  children: ReactNode;
  options?: string[];
  className?: string;
  direction?: "horizontal" | "vertical";
  selectAllLabel?: ReactNode;
  withSelectAll?: boolean;
}

interface CheckboxContextType {
  values: string[];
  disabled?: boolean;
  toggleValue: (val: string) => void;
  allOptions: string[];
}

const CheckboxContext = createContext<CheckboxContextType | null>(null);

// Group 组件
export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  value,
  defaultValue = [],
  disabled,
  onChange,
  children,
  options = [],
  className = "",
  direction = "horizontal",
  selectAllLabel = "全选",
  withSelectAll = false
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const currentValues = isControlled ? value! : internalValue;

  const toggleValue = (val: string) => {
    const newValues = currentValues.includes(val)
      ? currentValues.filter(v => v !== val)
      : [...currentValues, val];

    if (!isControlled) setInternalValue(newValues);
    onChange?.(newValues);
  };

  const allOptions = options.length ? options : Children.toArray(children)
    .filter((child: any) => child?.props?.value)
    .map((child: any) => child.props.value);

  const isAllChecked = allOptions.every(opt => currentValues.includes(opt));
  const isPartialChecked = !isAllChecked && allOptions.some(opt => currentValues.includes(opt));

  const handleSelectAll = () => {
    const newValues = isAllChecked
      ? [] // 点击后取消所有
      : [...allOptions]; // 点击后全选

    if (!isControlled) setInternalValue(newValues);
    onChange?.(newValues);
  };

  return (
    <CheckboxContext.Provider value={{ values: currentValues, disabled, toggleValue, allOptions }}>
      <div className={`${styles.checkboxGroup} ${styles[direction]} ${className}`}>
        {withSelectAll && (
          <Checkbox
            value="__all__"
            checked={isAllChecked}
            indeterminate={isPartialChecked}
            onChange={handleSelectAll as any}
          >
            {selectAllLabel}
          </Checkbox>
        )}
        {children}
      </div>
    </CheckboxContext.Provider>
  );
};

// 单个 Checkbox
export const Checkbox: FC<CheckboxProps> & { Group: typeof CheckboxGroup } = ({
  value = "",
  checked,
  defaultChecked,
  disabled,
  indeterminate = false,
  onChange,
  children,
  className = ""
}) => {
  const context = useContext(CheckboxContext);
  const isInGroup = !!context;

  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked || false);
  const isChecked = isInGroup
    ? context.values.includes(value)
    : checked !== undefined
    ? checked
    : internalChecked;

  const isDisabled = isInGroup ? context.disabled || disabled : disabled;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    if (value === "__all__") {
      // 特殊处理全选项
      onChange?.(e);
      return;
    }

    if (isInGroup) {
      context.toggleValue(value);
    } else {
      if (checked === undefined) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    }
  };

  return (
    <label
      className={`${styles.checkbox} 
        ${isChecked ? styles.checked : ""} 
        ${indeterminate ? styles.indeterminate : ""}
        ${isDisabled ? styles.disabled : ""} 
        ${className}
        ${(value === '__all__' && checked )? styles.selectAll : ''}`}
    >
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
      />
      <span className={styles.checkboxBox}>
        {indeterminate ? (
          <span className={styles.checkboxIcon}>-</span>
        ) : isChecked ? (
          <span className={styles.checkboxIcon}>
            <Icon name="check" size="sm" />
          </span>
        ) : null}
      </span>
      {children && <span className={styles.checkboxLabel}>{children}</span>}
    </label>
  );
};

Checkbox.Group = CheckboxGroup;
