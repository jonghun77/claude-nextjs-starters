import {
  Zap,
  Shield,
  Palette,
  Layers,
  Moon,
  Package,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// 기능 카드 한 개의 데이터 구조
interface Feature {
  readonly icon: LucideIcon
  readonly title: string
  readonly description: string
}

// 6개 기능 카드 데이터
const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Next.js 16",
    description: "App Router와 React Server Components로 최적의 성능을 제공합니다.",
  },
  {
    icon: Shield,
    title: "TypeScript",
    description: "Strict mode로 타입 안전성을 보장해 버그를 사전에 방지합니다.",
  },
  {
    icon: Palette,
    title: "TailwindCSS v4",
    description: "OKLCH 색상 시스템과 CSS 변수 기반 테마로 일관된 디자인을 구현합니다.",
  },
  {
    icon: Layers,
    title: "shadcn/ui",
    description: "Radix UI 기반의 접근성 우선 컴포넌트가 바로 사용할 수 있게 설치되어 있습니다.",
  },
  {
    icon: Moon,
    title: "다크 모드",
    description: "next-themes로 시스템 설정을 감지하고 라이트/다크 모드를 지원합니다.",
  },
  {
    icon: Package,
    title: "유틸리티 라이브러리",
    description: "react-hook-form, zod, date-fns 등 검증된 라이브러리가 설치되어 있습니다.",
  },
]

// 기능 소개 섹션
// id="features": Header의 "기능" 앵커 링크 대상
export function Features() {
  return (
    <section id="features" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            필요한 모든 것이 준비되어 있습니다
          </h2>
          <p className="mt-4 text-muted-foreground">
            바로 시작할 수 있도록 구성된 스타터킷
          </p>
        </div>

        {/* 반응형 그리드: 모바일 1열 → 태블릿 2열 → 데스크탑 3열 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="border-border bg-background transition-colors hover:bg-accent/30"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
