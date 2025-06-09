import React, { FC } from "react"
import styles from "./Icon.module.css"

export type IconName = string

interface IconProps {
  name: IconName
  size?: "sm" | "md" | "lg" | "xl"
  color?: string
  className?: string
  pixelSize?: number
  onClick?: () => void
  animation?: boolean
}

// 动态导入所有 svg 文件（作为字符串）
const modules = import.meta.glob('@icons/*.svg', {
  as: 'raw',
  eager: true,
})

const icons: Record<string, string> = {}

for (const path in modules) {
  const match = path.match(/\/([^/]+)\.svg$/)
  if (match) {
    const name = match[1]
    icons[name] = modules[path] as string
  }
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

export const Icon: FC<IconProps> = ({
  name,
  size = "md",
  color = "currentColor",
  className = "",
  pixelSize = 1,
  onClick,
  animation = false
}) => {
  const iconSvg = icons[name]
  const iconSize = sizeMap[size]

  return iconSvg ? (
    <div
      className={`${styles.iconContainer} ${className} ${animation ? styles.animation : ''}`}
      onClick={onClick}
      style={
        {
          "--pixel-size": `${pixelSize}px`,
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          cursor: onClick ? "pointer" : "inherit",
          color
        } as React.CSSProperties
      }
      dangerouslySetInnerHTML={{ __html: iconSvg }}
    >
    </div>
  ) : (
    <div
      className={`${styles.iconContainer} ${className} ${styles.placeholder}`}
      style={
        {
          "--pixel-size": `${pixelSize}px`,
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          cursor: onClick ? "pointer" : "default",
        } as React.CSSProperties
      }
    />
  )
}
