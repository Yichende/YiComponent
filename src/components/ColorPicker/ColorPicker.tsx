import React, { FC, useState, useRef, useEffect } from "react";
import styles from "./ColorPicker.module.css";
import { Icon } from "../index";

export interface ColorPickerProps {
  value?: string;
  size?: 'sm' | 'md' | 'lg';
  defaultValue?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  disabled?: boolean;
  className?: string;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  value,
  size = 'md',
  defaultValue = "#4a90e2",
  onChange,
  presets = [
    "#4a90e2", "#e24a4a", "#52c41a", "#fadb14", 
    "#fa8c16", "#722ed1", "#13c2c2", "#000000",
    "#f5222d", "#eb2f96", "#1890ff", "#52c41a",
    "#faad14", "#722ed1", "#13c2c2", "#bfbfbf"
  ],
  disabled = false,
  className = ""
}) => {
  const [internalColor, setInternalColor] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [inputValue, setInputValue] = useState(defaultValue);
  
  const colorPickerRef = useRef<HTMLDivElement>(null);
  
  const currentColor = value !== undefined ? value : internalColor;
  
  useEffect(() => {
    setInputValue(currentColor);
    
    // 将颜色转换为HSL以更新滑块
    const hsl = hexToHSL(currentColor);
    if (hsl) {
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
    }
  }, [currentColor]);
  
  // 点击外部关闭面板
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };
  
  const handleColorChange = (color: string) => {
    if (disabled) return;
    
    if (value === undefined) {
      setInternalColor(color);
    }
    onChange?.(color);
  };
  
  const handlePresetClick = (color: string) => {
    handleColorChange(color);
    setIsOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    // 验证并应用有效的十六进制颜色
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val)) {
      handleColorChange(val);
    }
  };
  
  const handleInputBlur = () => {
    // 如果输入值无效，恢复为当前颜色
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(inputValue)) {
      setInputValue(currentColor);
    }
  };
  
  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    setHue(newHue);
    const newColor = hslToHex(newHue, saturation, lightness);
    handleColorChange(newColor);
  };
  
  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSaturation = parseInt(e.target.value);
    setSaturation(newSaturation);
    const newColor = hslToHex(hue, newSaturation, lightness);
    handleColorChange(newColor);
  };
  
  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLightness = parseInt(e.target.value);
    setLightness(newLightness);
    const newColor = hslToHex(hue, saturation, newLightness);
    handleColorChange(newColor);
  };
  
  // 工具函数：十六进制转HSL
  const hexToHSL = (hex: string) => {
    let r = 0, g = 0, b = 0;
    
    // 3位十六进制
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } 
    // 6位十六进制
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    
    // 转换为0-1的范围
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };
  
  // 工具函数：HSL转十六进制
  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // 灰度
    } else {
      const hueToRGB = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hueToRGB(p, q, h / 360 + 1/3);
      g = hueToRGB(p, q, h / 360);
      b = hueToRGB(p, q, h / 360 - 1/3);
    }
    
    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  
  return (
    <div 
      ref={colorPickerRef}
      className={`${styles.colorPicker} ${styles[size]} ${className} ${disabled ? styles.disabled : ''}`}
    >
      <div 
        className={styles.trigger}
        onClick={handleTriggerClick}
        aria-disabled={disabled}
      >
        <div 
          className={styles.colorPreview}
          style={{ backgroundColor: currentColor }}
        />
        <span className={styles.colorValue}>{currentColor.toUpperCase()}</span>
        <Icon 
          name={isOpen ? "arrow-up" : "arrow-down"} 
          size="sm" 
          className={styles.arrowIcon}
        />
      </div>
      
      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.colorDisplay}>
            <div 
              className={styles.currentColor}
              style={{ backgroundColor: currentColor }}
            />
            <div className={styles.colorInfo}>
              <div className={styles.colorHex}>{currentColor.toUpperCase()}</div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={styles.colorInput}
                maxLength={7}
                disabled={disabled}
              />
            </div>
          </div>
          
          <div className={styles.sliders}>
            <div className={styles.sliderGroup}>
              <label className={styles.sliderLabel}>H</label>
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={handleHueChange}
                className={styles.slider}
                disabled={disabled}
              />
              <span className={styles.sliderValue}>{hue}</span>
            </div>
            
            <div className={styles.sliderGroup}>
              <label className={styles.sliderLabel}>S</label>
              <input
                type="range"
                min="0"
                max="100"
                value={saturation}
                onChange={handleSaturationChange}
                className={styles.slider}
                disabled={disabled}
              />
              <span className={styles.sliderValue}>{saturation}%</span>
            </div>
            
            <div className={styles.sliderGroup}>
              <label className={styles.sliderLabel}>L</label>
              <input
                type="range"
                min="0"
                max="100"
                value={lightness}
                onChange={handleLightnessChange}
                className={styles.slider}
                disabled={disabled}
              />
              <span className={styles.sliderValue}>{lightness}%</span>
            </div>
          </div>
          
          <div className={styles.presets}>
            <h4 className={styles.presetsTitle}>预设颜色</h4>
            <div className={styles.presetsGrid}>
              {presets.map((color, index) => (
                <div
                  key={index}
                  className={styles.presetColor}
                  style={{ backgroundColor: color }}
                  onClick={() => handlePresetClick(color)}
                  title={color.toUpperCase()}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};