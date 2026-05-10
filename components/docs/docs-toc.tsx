"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface TocItem {
  id: string
  text: string
  level: number
}

interface DocsTocProps {
  items: TocItem[]
}

// 스크롤 위치에 따라 현재 섹션을 하이라이트하는 우측 목차
export function DocsToc({ items }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (items.length === 0) return

    // rootMargin: 상단 80px(헤더), 하단 40% 제외하여 뷰포트 상단 근처 섹션 감지
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -40% 0px" }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="hidden w-44 shrink-0 xl:block">
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto px-4 py-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          이 페이지
        </p>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-sm leading-relaxed transition-colors",
                  item.level === 3 && "pl-3",
                  activeId === item.id
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
