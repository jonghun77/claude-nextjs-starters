import { AlertCircle, Lightbulb, Info } from "lucide-react"
import { cn, slugify } from "@/lib/utils"
import type { ContentBlock } from "@/lib/docs-data"

interface DocsContentProps {
  content: readonly ContentBlock[]
}

// 구조화된 콘텐츠 블록을 렌더링하는 서버 컴포넌트
export function DocsContent({ content }: DocsContentProps) {
  return (
    <div className="space-y-5">
      {content.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={slugify(block.text)}
                className="mt-10 scroll-mt-20 border-b border-border pb-2 text-xl font-bold tracking-tight first:mt-0"
              >
                {block.text}
              </h2>
            )

          case "h3":
            return (
              <h3
                key={i}
                id={slugify(block.text)}
                className="mt-6 scroll-mt-20 text-base font-semibold"
              >
                {block.text}
              </h3>
            )

          case "p":
            return (
              <p
                key={i}
                className="leading-7 text-muted-foreground"
              >
                {block.text}
              </p>
            )

          case "list":
            return (
              <ul key={i} className="space-y-2 pl-1">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/50" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )

          case "code":
            return (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-border"
              >
                {/* 언어 레이블 */}
                <div className="border-b border-border bg-muted/50 px-4 py-1.5">
                  <span className="font-mono text-xs text-muted-foreground">
                    {block.language}
                  </span>
                </div>
                {/* 코드 블록 */}
                <pre className="overflow-x-auto bg-muted/20 p-4 text-sm leading-relaxed">
                  <code className="font-mono text-foreground">
                    {block.content}
                  </code>
                </pre>
              </div>
            )

          case "callout": {
            const iconMap = {
              info: Info,
              tip: Lightbulb,
              warning: AlertCircle,
            }
            const colorMap = {
              info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800/40 dark:text-blue-200",
              tip: "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800/40 dark:text-emerald-200",
              warning:
                "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800/40 dark:text-amber-200",
            }
            const Icon = iconMap[block.variant]
            return (
              <div
                key={i}
                className={cn(
                  "flex gap-3 rounded-lg border p-4 text-sm",
                  colorMap[block.variant]
                )}
              >
                <Icon className="mt-0.5 size-4 shrink-0" />
                <p className="leading-relaxed">{block.text}</p>
              </div>
            )
          }

          default:
            return null
        }
      })}
    </div>
  )
}
