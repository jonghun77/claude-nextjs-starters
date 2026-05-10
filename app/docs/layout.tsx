import { DocsSidebar } from "@/components/docs/docs-sidebar"

// 문서 페이지 전용 레이아웃 — 루트 layout의 <main> 안에서 렌더링됨
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl">
      {/* 좌측 사이드바: 데스크탑(lg+)에서만 표시 */}
      <DocsSidebar />
      {/* 본문 영역: 사이드바와 우측 TOC 사이 */}
      <div className="flex min-w-0 flex-1">{children}</div>
    </div>
  )
}
