"use client"

import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

// 앱 전체에 필요한 Provider들을 한 곳에서 관리
// next-themes: 다크모드, TooltipProvider: Tooltip 컴포넌트, Toaster: sonner 알림
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        {children}
        <Toaster position="bottom-right" richColors />
      </TooltipProvider>
    </ThemeProvider>
  )
}
