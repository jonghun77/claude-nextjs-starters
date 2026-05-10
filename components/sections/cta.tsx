"use client"

import { toast } from "sonner"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

// 설치 명령어 - 개발자가 클론 후 실행할 명령어
const INSTALL_COMMAND = "npx create-next-app@latest --example my-app"

// CTA(Call to Action) 섹션
// 'use client': 클릭 시 sonner toast를 보여주기 위해 클라이언트 컴포넌트로 선언
export function Cta() {
  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_COMMAND).then(() => {
      toast.success("명령어가 복사되었습니다!", {
        description: "터미널에 붙여넣기해서 프로젝트를 시작하세요.",
      })
    })
  }

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* 카드형 CTA 블록 */}
        <div className="rounded-2xl border border-border bg-muted/30 px-8 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="mt-4 text-muted-foreground">
            아래 명령어를 복사해 프로젝트를 시작하세요.
          </p>

          {/* 명령어 표시 + 복사 버튼 */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <code className="rounded-lg bg-background px-4 py-2.5 font-mono text-sm border border-border">
              {INSTALL_COMMAND}
            </code>
            <Button onClick={handleCopy} variant="default" size="default">
              <Copy className="size-4" />
              명령어 복사
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
