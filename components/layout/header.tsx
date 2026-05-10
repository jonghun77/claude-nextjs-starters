import Link from "next/link"
import { Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { MobileNav } from "@/components/layout/mobile-nav"

interface NavLink {
  readonly href: string
  readonly label: string
  readonly external?: boolean
}

// 데스크탑 네비게이션 링크 목록
const NAV_LINKS: NavLink[] = [
  { href: "#features", label: "기능" },
  { href: "/docs", label: "문서" },
  { href: "/examples", label: "예제" },
  { href: "https://github.com", label: "GitHub", external: true },
]

// sticky top-0: 스크롤해도 상단에 고정
// bg-background/80 backdrop-blur-sm: 반투명 글래스모피즘 효과
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Layers className="size-5 text-primary" />
          <span>StarterKit</span>
        </Link>

        {/* 데스크탑 네비게이션: md 이상에서만 표시 */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Button key={link.href} variant="ghost" size="sm" asChild>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* 우측 액션: 테마 토글 + 모바일 메뉴 */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
