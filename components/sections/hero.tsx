import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// 랜딩 페이지의 첫 화면 섹션
// RSC(서버 컴포넌트)로 구성해 불필요한 클라이언트 번들을 줄임
export function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-24 text-center md:px-6 md:py-32">
      {/* 기술 스택 배지 */}
      <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm font-medium">
        Next.js 16 · TypeScript · TailwindCSS v4
      </Badge>

      {/* 메인 헤드라인 */}
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Build faster.{" "}
        <span className="text-primary">Ship smarter.</span>
      </h1>

      {/* 서브 카피 */}
      <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
        검증된 모던 기술 스택으로 구성된 Next.js 스타터킷.
        설정 없이 바로 개발을 시작하세요.
      </p>

      {/* CTA 버튼 */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" asChild>
          <Link href="#features">
            시작하기
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub에서 보기
          </Link>
        </Button>
      </div>
    </section>
  )
}
