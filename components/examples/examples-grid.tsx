"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  EXAMPLES,
  EXAMPLE_CATEGORIES,
  type ExampleCategory,
} from "@/lib/examples-data"

// 예제 목록 + 카테고리 필터 (클라이언트 인터랙션)
export function ExamplesGrid() {
  const [active, setActive] = useState<ExampleCategory>("전체")

  const filtered =
    active === "전체"
      ? EXAMPLES
      : EXAMPLES.filter((ex) => ex.category === active)

  return (
    <div>
      {/* 카테고리 필터 탭 */}
      <div className="mb-8 flex flex-wrap gap-2">
        {EXAMPLE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              active === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 예제 카드 그리드 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((example) => (
          <div
            key={example.id}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
          >
            {/* 썸네일 — 그라디언트 배경 + 첫 글자 */}
            <div
              className={cn(
                "flex h-40 items-center justify-center bg-gradient-to-br",
                example.gradient
              )}
            >
              <span className="text-4xl font-bold text-white/70">
                {example.title[0]}
              </span>
            </div>

            {/* 카드 정보 */}
            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-semibold">{example.title}</h3>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  {example.category}
                </Badge>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {example.description}
              </p>
              {/* 태그 목록 */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {example.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button asChild size="sm" className="w-full gap-1.5">
                <Link href={`/examples/${example.id}`}>
                  예제 보기
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
