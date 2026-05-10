import type { Metadata } from "next"
import { ExamplesGrid } from "@/components/examples/examples-grid"

export const metadata: Metadata = {
  title: "예제",
  description:
    "실제 사용 사례를 바탕으로 만든 컴포넌트 예제 모음입니다.",
}

export default function ExamplesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          예제
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          실제 사용 사례를 바탕으로 만든 컴포넌트 예제 모음입니다.
          카테고리로 필터링하거나 예제 보기 버튼을 눌러 직접 확인하세요.
        </p>
      </div>
      <ExamplesGrid />
    </section>
  )
}
