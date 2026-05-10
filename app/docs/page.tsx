import { redirect } from "next/navigation"

// 첫 번째 문서(소개)로 자동 이동
export default function DocsPage() {
  redirect("/docs/introduction")
}
