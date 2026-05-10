"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

// mounted 패턴: 서버(SSR)에서는 theme을 알 수 없어 undefined를 반환하므로
// 클라이언트에 마운트된 후에만 아이콘을 렌더링해 hydration mismatch를 방지
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // 마운트 전에는 동일한 크기의 빈 자리를 차지해 레이아웃 밀림 방지
  if (!mounted) {
    return <div className="size-8" />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="테마 전환"
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  )
}
