// 문서 콘텐츠 블록 타입 — 마크다운 없이 구조화된 데이터로 문서를 표현
export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "code"; language: string; content: string }
  | { type: "callout"; variant: "info" | "warning" | "tip"; text: string }
  | { type: "list"; items: readonly string[] }

export interface DocItem {
  readonly slug: string
  readonly title: string
  readonly description: string
  readonly category: string
  readonly content: readonly ContentBlock[]
}

export interface DocNavItem {
  readonly slug: string
  readonly title: string
}

export interface DocCategory {
  readonly title: string
  readonly items: readonly DocNavItem[]
}

export const DOC_CATEGORIES: readonly DocCategory[] = [
  {
    title: "시작하기",
    items: [
      { slug: "introduction", title: "소개" },
      { slug: "installation", title: "설치" },
      { slug: "project-structure", title: "프로젝트 구조" },
    ],
  },
  {
    title: "컴포넌트",
    items: [
      { slug: "components-overview", title: "컴포넌트 개요" },
      { slug: "button", title: "Button" },
      { slug: "card", title: "Card" },
      { slug: "form", title: "Form" },
    ],
  },
  {
    title: "가이드",
    items: [
      { slug: "theming", title: "테마 커스터마이징" },
      { slug: "dark-mode", title: "다크 모드" },
      { slug: "deployment", title: "배포" },
    ],
  },
]

export const DOCS: readonly DocItem[] = [
  {
    slug: "introduction",
    title: "소개",
    description:
      "StarterKit은 Next.js 16 기반의 모던 웹 개발 스타터킷입니다.",
    category: "시작하기",
    content: [
      { type: "h2", text: "StarterKit이란?" },
      {
        type: "p",
        text: "StarterKit은 Next.js 16, TypeScript, TailwindCSS v4, shadcn/ui를 기반으로 구성된 모던 웹 개발 스타터킷입니다. 설정 없이 바로 개발을 시작할 수 있도록 필요한 모든 것이 준비되어 있습니다.",
      },
      { type: "h2", text: "포함된 기술 스택" },
      {
        type: "list",
        items: [
          "Next.js 16 (App Router + React Server Components)",
          "TypeScript 5 (Strict Mode)",
          "TailwindCSS v4 (OKLCH 색상 시스템)",
          "shadcn/ui (접근성 우선 컴포넌트)",
          "next-themes (라이트/다크 모드)",
          "react-hook-form + zod (폼 유효성 검사)",
          "date-fns (날짜 처리)",
        ],
      },
      { type: "h2", text: "주요 특징" },
      {
        type: "p",
        text: "매 프로젝트마다 반복되는 초기 설정을 없애고, 검증된 패턴과 컴포넌트를 바로 활용할 수 있습니다. 모든 컴포넌트는 접근성 기준(WCAG 2.1)을 준수합니다.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "이 문서는 Next.js App Router 기반으로 작성되었습니다. Pages Router 방식과는 구조가 다를 수 있습니다.",
      },
    ],
  },
  {
    slug: "installation",
    title: "설치",
    description: "StarterKit을 설치하고 로컬 개발 환경을 설정합니다.",
    category: "시작하기",
    content: [
      { type: "h2", text: "요구 사항" },
      {
        type: "list",
        items: ["Node.js 18.17 이상", "npm, yarn, 또는 pnpm", "Git"],
      },
      { type: "h2", text: "저장소 클론" },
      {
        type: "code",
        language: "bash",
        content: `git clone https://github.com/yourusername/starterkit.git my-project
cd my-project`,
      },
      { type: "h2", text: "패키지 설치" },
      {
        type: "code",
        language: "bash",
        content: `npm install\n# 또는\npnpm install`,
      },
      { type: "h2", text: "개발 서버 실행" },
      {
        type: "code",
        language: "bash",
        content: `npm run dev`,
      },
      {
        type: "p",
        text: "브라우저에서 http://localhost:3000을 열면 스타터킷 랜딩 페이지를 확인할 수 있습니다.",
      },
      { type: "h2", text: "환경 변수 설정" },
      {
        type: "code",
        language: "bash",
        content: `# .env.local 파일 생성\ncp .env.example .env.local`,
      },
      {
        type: "callout",
        variant: "warning",
        text: ".env.local 파일은 .gitignore에 포함되어 있습니다. 절대 커밋하지 마세요.",
      },
    ],
  },
  {
    slug: "project-structure",
    title: "프로젝트 구조",
    description: "StarterKit의 폴더 구조와 주요 파일을 설명합니다.",
    category: "시작하기",
    content: [
      { type: "h2", text: "디렉토리 구조" },
      {
        type: "code",
        language: "text",
        content: `my-project/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # 루트 레이아웃
│   ├── page.tsx          # 메인 페이지
│   └── globals.css       # 전역 스타일
├── components/
│   ├── layout/           # 헤더, 푸터, 네비게이션
│   ├── sections/         # 페이지 섹션 컴포넌트
│   └── ui/               # shadcn/ui 컴포넌트
├── lib/
│   └── utils.ts          # 유틸리티 함수
└── public/               # 정적 파일`,
      },
      { type: "h2", text: "app/ 폴더" },
      {
        type: "p",
        text: "Next.js 16의 App Router를 사용합니다. layout.tsx는 모든 페이지에 공통으로 적용되는 루트 레이아웃이며, page.tsx가 실제 렌더링되는 페이지입니다.",
      },
      { type: "h2", text: "components/ 폴더" },
      {
        type: "p",
        text: "컴포넌트는 용도에 따라 세 폴더로 나뉩니다. layout/은 헤더와 푸터 같은 레이아웃 컴포넌트, sections/은 랜딩 페이지의 섹션 컴포넌트, ui/는 shadcn/ui에서 가져온 기본 UI 컴포넌트입니다.",
      },
      {
        type: "callout",
        variant: "info",
        text: "새로운 shadcn/ui 컴포넌트를 추가하려면 npx shadcn add [컴포넌트명] 명령을 사용하세요.",
      },
    ],
  },
  {
    slug: "components-overview",
    title: "컴포넌트 개요",
    description: "사용 가능한 UI 컴포넌트 목록과 사용 방법을 소개합니다.",
    category: "컴포넌트",
    content: [
      { type: "h2", text: "shadcn/ui 컴포넌트" },
      {
        type: "p",
        text: "StarterKit은 Radix UI 기반의 shadcn/ui 컴포넌트를 사용합니다. 모든 컴포넌트는 접근성을 기본으로 설계되었으며, TailwindCSS로 쉽게 커스터마이징할 수 있습니다.",
      },
      { type: "h2", text: "포함된 컴포넌트" },
      {
        type: "list",
        items: [
          "Button — 다양한 변형의 버튼",
          "Card — 콘텐츠 그룹화 카드",
          "Dialog — 모달 다이얼로그",
          "Input, Textarea — 텍스트 입력",
          "Select, Checkbox, Radio — 선택 입력",
          "Badge — 레이블/태그",
          "Alert — 알림 메시지",
          "Avatar — 사용자 아바타",
          "Separator — 구분선",
          "Skeleton — 로딩 스켈레톤",
        ],
      },
      { type: "h2", text: "컴포넌트 임포트" },
      {
        type: "code",
        language: "tsx",
        content: `import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <CardHeader>제목</CardHeader>
      <CardContent>
        <Button>클릭</Button>
      </CardContent>
    </Card>
  )
}`,
      },
    ],
  },
  {
    slug: "button",
    title: "Button",
    description: "다양한 용도에 맞는 버튼 컴포넌트입니다.",
    category: "컴포넌트",
    content: [
      { type: "h2", text: "기본 사용법" },
      {
        type: "code",
        language: "tsx",
        content: `import { Button } from "@/components/ui/button"

<Button>기본 버튼</Button>
<Button variant="secondary">보조 버튼</Button>
<Button variant="outline">외곽선 버튼</Button>
<Button variant="ghost">고스트 버튼</Button>
<Button variant="destructive">삭제 버튼</Button>`,
      },
      { type: "h2", text: "크기 변형" },
      {
        type: "code",
        language: "tsx",
        content: `<Button size="sm">작은 버튼</Button>
<Button size="default">기본 버튼</Button>
<Button size="lg">큰 버튼</Button>
<Button size="icon"><Settings /></Button>`,
      },
      { type: "h2", text: "Props" },
      {
        type: "list",
        items: [
          "variant: default | secondary | outline | ghost | destructive | link",
          "size: sm | default | lg | icon",
          "disabled: boolean",
          "asChild: boolean (자식 요소로 렌더링)",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "asChild 속성을 사용하면 Link 컴포넌트를 버튼처럼 스타일링할 수 있습니다. 예: <Button asChild><Link href='/'>홈</Link></Button>",
      },
    ],
  },
  {
    slug: "card",
    title: "Card",
    description: "관련 콘텐츠를 그룹화하는 카드 컴포넌트입니다.",
    category: "컴포넌트",
    content: [
      { type: "h2", text: "기본 사용법" },
      {
        type: "code",
        language: "tsx",
        content: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명 텍스트</CardDescription>
  </CardHeader>
  <CardContent>
    <p>카드 본문 내용입니다.</p>
  </CardContent>
  <CardFooter>
    <Button>확인</Button>
  </CardFooter>
</Card>`,
      },
      { type: "h2", text: "서브 컴포넌트" },
      {
        type: "list",
        items: [
          "Card — 최상위 래퍼",
          "CardHeader — 상단 영역 (제목, 설명)",
          "CardTitle — 카드 제목",
          "CardDescription — 카드 설명",
          "CardContent — 본문 콘텐츠",
          "CardFooter — 하단 영역 (액션 버튼 등)",
          "CardAction — 헤더 우측 액션 영역",
        ],
      },
      { type: "h2", text: "크기 변형" },
      {
        type: "code",
        language: "tsx",
        content: `<Card>기본 크기</Card>
<Card size="sm">작은 카드</Card>`,
      },
    ],
  },
  {
    slug: "form",
    title: "Form",
    description:
      "react-hook-form과 zod를 활용한 폼 구현 패턴입니다.",
    category: "컴포넌트",
    content: [
      { type: "h2", text: "기본 패턴" },
      {
        type: "p",
        text: "StarterKit은 react-hook-form과 zod를 함께 사용하는 패턴을 권장합니다. Input, Label 컴포넌트와 조합하여 유효성 검사를 구현합니다.",
      },
      {
        type: "code",
        language: "tsx",
        content: `"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const schema = z.object({
  email: z.string().email("올바른 이메일을 입력하세요"),
  password: z.string().min(8, "8자 이상 입력하세요"),
})

type FormValues = z.infer<typeof schema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  return (
    <form onSubmit={handleSubmit(console.log)} className="space-y-4">
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full">로그인</Button>
    </form>
  )
}`,
      },
      {
        type: "callout",
        variant: "info",
        text: '폼 컴포넌트는 반드시 "use client" 지시어가 필요합니다. react-hook-form은 클라이언트 사이드 훅을 사용합니다.',
      },
    ],
  },
  {
    slug: "theming",
    title: "테마 커스터마이징",
    description:
      "CSS 변수와 TailwindCSS v4로 테마를 커스터마이징합니다.",
    category: "가이드",
    content: [
      { type: "h2", text: "CSS 변수 기반 테마" },
      {
        type: "p",
        text: "StarterKit은 OKLCH 색상 시스템을 사용합니다. 모든 색상은 globals.css의 CSS 변수로 정의되어 있어 한 곳에서 전체 테마를 변경할 수 있습니다.",
      },
      {
        type: "code",
        language: "css",
        content: `/* app/globals.css */
:root {
  --primary: oklch(0.205 0 0);        /* 기본 강조 색상 */
  --primary-foreground: oklch(0.985 0 0);
  --background: oklch(1 0 0);         /* 배경 색상 */
  --foreground: oklch(0.145 0 0);     /* 텍스트 색상 */
  --muted: oklch(0.97 0 0);           /* 흐린 배경 */
  --border: oklch(0.922 0 0);         /* 경계선 색상 */
}`,
      },
      { type: "h2", text: "OKLCH 색상 시스템" },
      {
        type: "p",
        text: "OKLCH는 HSL보다 지각적으로 균일한 색상 공간입니다. oklch(밝기 채도 색조) 형식으로 색상을 정의합니다. 밝기는 0~1, 채도는 0~0.4, 색조는 0~360입니다.",
      },
      {
        type: "callout",
        variant: "tip",
        text: "oklch.com 사이트에서 원하는 색상의 OKLCH 값을 쉽게 찾을 수 있습니다.",
      },
    ],
  },
  {
    slug: "dark-mode",
    title: "다크 모드",
    description:
      "next-themes를 이용한 다크 모드 구현 방법을 설명합니다.",
    category: "가이드",
    content: [
      { type: "h2", text: "다크 모드 동작 방식" },
      {
        type: "p",
        text: "next-themes 라이브러리를 사용해 라이트/다크 모드를 전환합니다. html 태그에 .dark 클래스를 추가하는 방식으로, CSS 변수의 값을 바꿔 전체 테마가 전환됩니다.",
      },
      { type: "h2", text: "테마 토글 컴포넌트" },
      {
        type: "code",
        language: "tsx",
        content: `"use client"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </Button>
  )
}`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Providers 컴포넌트에서 ThemeProvider로 앱을 감싸야 useTheme 훅을 사용할 수 있습니다.",
      },
    ],
  },
  {
    slug: "deployment",
    title: "배포",
    description:
      "Vercel을 이용한 프로덕션 배포 방법을 설명합니다.",
    category: "가이드",
    content: [
      { type: "h2", text: "Vercel 배포" },
      {
        type: "p",
        text: "Next.js는 Vercel에서 가장 쉽게 배포할 수 있습니다. GitHub 저장소를 연결하면 코드를 푸시할 때마다 자동으로 배포됩니다.",
      },
      { type: "h2", text: "배포 단계" },
      {
        type: "list",
        items: [
          "GitHub에 저장소 푸시",
          "vercel.com에서 New Project 클릭",
          "GitHub 저장소 선택 및 임포트",
          "환경 변수 설정 (필요한 경우)",
          "Deploy 버튼 클릭",
        ],
      },
      { type: "h2", text: "프로덕션 빌드 테스트" },
      {
        type: "code",
        language: "bash",
        content: `# 로컬에서 프로덕션 빌드 테스트
npm run build
npm run start`,
      },
      {
        type: "callout",
        variant: "warning",
        text: "배포 전 반드시 npm run build가 오류 없이 완료되는지 확인하세요.",
      },
    ],
  },
]

export function getDocBySlug(slug: string): DocItem | undefined {
  return DOCS.find((doc) => doc.slug === slug)
}

// 이전/다음 문서 반환
export function getAdjacentDocs(slug: string): {
  prev: DocNavItem | null
  next: DocNavItem | null
} {
  const allItems = DOC_CATEGORIES.flatMap((cat) => cat.items)
  const index = allItems.findIndex((item) => item.slug === slug)
  return {
    prev: index > 0 ? allItems[index - 1] : null,
    next: index < allItems.length - 1 ? allItems[index + 1] : null,
  }
}
