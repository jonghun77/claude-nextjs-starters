import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Cta } from "@/components/sections/cta"

// 랜딩 페이지 - RSC(서버 컴포넌트)로 유지
// 각 섹션은 독립된 컴포넌트로 분리되어 있어 커스터마이징이 쉬움
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Cta />
    </>
  )
}
