import { 
  FC, 
  ReactNode, 
  useState, 
  createContext, 
  useContext, 
  ChangeEvent 
} from "react";
import styles from "./Radio.module.css";
import { Icon } from "../index";

export interface RadioProps {
  value: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  className?: string;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical";
}

interface RadioContextProps {
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

interface RadioComponent extends FC<RadioProps> {
  Group: typeof RadioGroup;
  Button: typeof RadioButton;
}

const RadioContext = createContext<RadioContextProps>({});

export const RadioGroup: FC<RadioGroupProps> = ({
  value: groupValue,
  defaultValue,
  disabled: groupDisabled,
  onChange,
  children,
  className = "",
  direction = "horizontal",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  
  const value = groupValue !== undefined ? groupValue : internalValue;
  
  const handleChange = (val: string) => {
    if (groupValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  };
  
  const contextValue: RadioContextProps = {
    value,
    disabled: groupDisabled,
    onChange: handleChange
  };
  
  return (
    <RadioContext.Provider value={contextValue}>
      <div 
        className={`${styles.radioGroup} ${styles[direction]} ${className}`}
      >
        {children}
      </div>
    </RadioContext.Provider>
  );
};

export const Radio: RadioComponent = ({
  value,
  disabled,
  checked,
  onChange,
  children,
  className = "",
}) => {
  const context = useContext(RadioContext);
  const isInGroup = context !== null && Object.keys(context).length > 0;
  
  const [internalChecked, setInternalChecked] = useState(false);
  
  const isChecked = isInGroup 
    ? context.value === value 
    : checked !== undefined 
      ? checked 
      : internalChecked;
      
  const isDisabled = isInGroup 
    ? context.disabled || disabled 
    : disabled;
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    
    if (!isInGroup) {
      if (checked === undefined) {
        setInternalChecked(true);
      }
      onChange?.(e);
    } else {
      context.onChange?.(value);
    }
  };
  
  return (
    <label 
      className={`${styles.radio} 
        ${isChecked ? styles.checked : ''}
        ${isDisabled ? styles.disabled : ''}
        ${className}`}
    >
      <input
        type="radio"
        className={styles.radioInput}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
      />
      <span className={styles.radioInner}>
        {isChecked && (
          <span className={styles.radioDot}>
            <Icon name="check" size="sm" />
          </span>
        )}
      </span>
      {children && <span className={styles.radioLabel}>{children}</span>}
    </label>
  );
};

export const RadioButton: FC<RadioProps> = ({
  value,
  disabled,
  checked,
  onChange,
  children,
  className = "",
}) => {
  const context = useContext(RadioContext);
  const isInGroup = context !== null && Object.keys(context).length > 0;
  
  const [internalChecked, setInternalChecked] = useState(false);
  
  const isChecked = isInGroup 
    ? context.value === value 
    : checked !== undefined 
      ? checked 
      : internalChecked;
      
  const isDisabled = isInGroup 
    ? context.disabled || disabled 
    : disabled;
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    
    if (!isInGroup) {
      if (checked === undefined) {
        setInternalChecked(true);
      }
      onChange?.(e);
    } else {
      context.onChange?.(value);
    }
  };
  
  return (
    <label 
      className={`${styles.radioButton} 
        ${isChecked ? styles.checked : ''}
        ${isDisabled ? styles.disabled : ''}
        ${className}`}
    >
      <input
        type="radio"
        className={styles.radioInput}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
      />
      <span className={styles.buttonContent}>
        {children}
      </span>
    </label>
  );
};

Radio.Group = RadioGroup;
Radio.Button = RadioButton;