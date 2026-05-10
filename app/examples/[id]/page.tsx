import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExampleViewer } from "@/components/examples/example-viewer"
import { EXAMPLES, getExampleById } from "@/lib/examples-data"

export function generateStaticParams() {
  return EXAMPLES.map((ex) => ({ id: ex.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const example = getExampleById(id)
  if (!example) return {}
  return { title: example.title, description: example.description }
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function ExamplePage({ params }: Props) {
  const { id } = await params
  const example = getExampleById(id)

  if (!example) notFound()

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      {/* 뒤로 가기 버튼 */}
      <Button variant="ghost" size="sm" asChild className="-ml-2 mb-6 gap-1.5">
        <Link href="/examples">
          <ArrowLeft className="size-4" />
          예제 목록
        </Link>
      </Button>

      {/* 예제 헤더 */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{example.category}</Badge>
          {example.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{example.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {example.description}
        </p>
      </div>

      {/* 미리보기 + 코드 탭 뷰어 */}
      <ExampleViewer exampleId={example.id} />
    </section>
  )
}
