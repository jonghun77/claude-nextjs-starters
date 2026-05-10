"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { DOC_CATEGORIES } from "@/lib/docs-data"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// 사이드바 네비게이션 링크 목록 (공통)
function SidebarNav({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname()
  const currentSlug = pathname.split("/").pop() ?? ""

  return (
    <nav className="space-y-6">
      {DOC_CATEGORIES.map((category) => (
        <div key={category.title}>
          {/* 카테고리 레이블 */}
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {category.title}
          </p>
          <ul className="space-y-0.5">
            {category.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/docs/${item.slug}`}
                  onClick={onLinkClick}
                  className={cn(
                    "flex items-center rounded-md px-3 py-1.5 text-sm transition-colors",
                    currentSlug === item.slug
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

// 데스크탑 사이드바 — lg 이상에서만 표시
export function DocsSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-border lg:block">
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto px-4 py-8">
        <SidebarNav />
      </div>
    </aside>
  )
}

// 모바일 문서 네비게이션 버튼 — lg 미만에서만 표시
export function DocsMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Menu className="size-4" />
            문서 목차
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle className="text-left text-sm">문서 목차</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <SidebarNav onLinkClick={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
