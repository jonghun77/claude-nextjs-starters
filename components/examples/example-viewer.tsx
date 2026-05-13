"use client"

import { useState } from "react"
import { Eye, Code2, Copy, Check } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { EXAMPLE_CODE } from "@/lib/examples-data"
import {
  ButtonShowcaseDemo,
  LoginFormDemo,
  StatsDashboardDemo,
  DialogModalDemo,
  UserProfileDemo,
  ToastNotificationsDemo,
} from "./demos"

// 예제 id → 실제 데모 컴포넌트 매핑
const DEMO_MAP: Record<string, React.ComponentType<Record<string, never>>> = {
  "button-showcase": ButtonShowcaseDemo,
  "login-form": LoginFormDemo,
  "stats-dashboard": StatsDashboardDemo,
  "dialog-modal": DialogModalDemo,
  "user-profile": UserProfileDemo,
  "toast-notifications": ToastNotificationsDemo,
}

interface ExampleViewerProps {
  exampleId: string
}

// 미리보기 / 코드 탭 전환 + 코드 복사 기능
export function ExampleViewer({ exampleId }: ExampleViewerProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)

  const DemoComponent = DEMO_MAP[exampleId]
  const code = EXAMPLE_CODE[exampleId] ?? ""

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("복사에 실패했습니다.")
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* 탭 헤더 */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2">
        <div className="flex gap-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                tab === t
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "preview" ? (
                <>
                  <Eye className="size-3.5" />
                  미리보기
                </>
              ) : (
                <>
                  <Code2 className="size-3.5" />
                  코드
                </>
              )}
            </button>
          ))}
        </div>

        {/* 코드 탭일 때만 복사 버튼 표시 */}
        {tab === "code" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="gap-1.5 text-xs"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "복사됨" : "복사"}
          </Button>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="min-h-80">
        {tab === "preview" ? (
          <div className="bg-background">
            {DemoComponent ? (
              <DemoComponent />
            ) : (
              <div className="flex h-80 items-center justify-center text-sm text-muted-foreground">
                준비 중입니다.
              </div>
            )}
          </div>
        ) : (
          <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
            <code className="font-mono text-foreground">{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
