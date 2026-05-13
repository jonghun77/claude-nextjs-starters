import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocsContent } from "@/components/docs/docs-content"
import { DocsToc, type TocItem } from "@/components/docs/docs-toc"
import { DocsMobileNav } from "@/components/docs/docs-sidebar"
import {
  DOCS,
  getDocBySlug,
  getAdjacentDocs,
  type ContentBlock,
} from "@/lib/docs-data"
import { slugify } from "@/lib/utils"

// 빌드 타임에 모든 문서 페이지를 정적 생성
export function generateStaticParams() {
  return DOCS.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getDocBySlug(slug)
  if (!doc) return {}
  return { title: doc.title, description: doc.description }
}

// h2, h3 블록에서 우측 목차(TOC) 아이템 추출
function extractTocItems(content: readonly ContentBlock[]): TocItem[] {
  const items: TocItem[] = []
  for (const block of content) {
    if (block.type === "h2" || block.type === "h3") {
      items.push({
        id: slugify(block.text),
        text: block.text,
        level: block.type === "h2" ? 2 : 3,
      })
    }
  }
  return items
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const doc = getDocBySlug(slug)

  if (!doc) notFound()

  const { prev, next } = getAdjacentDocs(slug)
  const tocItems = extractTocItems(doc.content)

  return (
    <>
      {/* 본문 — min-w-0으로 flex 오버플로우 방지 */}
      <article className="min-w-0 flex-1 px-4 py-10 md:px-8 lg:px-12">
        {/* 모바일 목차 버튼 */}
        <DocsMobileNav />

        {/* 브레드크럼 */}
        <nav
          aria-label="breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/docs" className="hover:text-foreground">
            문서
          </Link>
          <span>/</span>
          <span>{doc.category}</span>
          <span>/</span>
          <span className="text-foreground">{doc.title}</span>
        </nav>

        {/* 페이지 제목 */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {doc.description}
          </p>
        </div>

        {/* 문서 본문 */}
        <DocsContent content={doc.content} />

        {/* 이전/다음 문서 네비게이션 */}
        <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
          {prev ? (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/docs/${prev.slug}`} className="flex items-center gap-2">
                <ChevronLeft className="size-4" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">이전</p>
                  <p className="font-medium">{prev.title}</p>
                </div>
              </Link>
            </Button>
          ) : (
            <div />
          )}
          {next ? (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/docs/${next.slug}`} className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">다음</p>
                  <p className="font-medium">{next.title}</p>
                </div>
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </article>

      {/* 우측 목차 — xl 이상에서만 표시 */}
      <DocsToc items={tocItems} />
    </>
  )
}
