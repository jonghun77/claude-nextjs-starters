export interface Example {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly category: string
  readonly tags: readonly string[]
  readonly gradient: string
}

export const EXAMPLE_CATEGORIES = [
  "전체",
  "폼",
  "레이아웃",
  "피드백",
] as const

export type ExampleCategory = (typeof EXAMPLE_CATEGORIES)[number]

export const EXAMPLES: readonly Example[] = [
  {
    id: "button-showcase",
    title: "버튼 쇼케이스",
    description:
      "다양한 변형(variant)과 크기(size)의 버튼 컴포넌트를 한눈에 볼 수 있는 예제입니다.",
    category: "레이아웃",
    tags: ["Button", "UI", "Variants"],
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "login-form",
    title: "로그인 폼",
    description:
      "react-hook-form과 zod로 구현한 유효성 검사가 포함된 로그인 폼입니다.",
    category: "폼",
    tags: ["Form", "Validation", "react-hook-form"],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "stats-dashboard",
    title: "통계 대시보드",
    description:
      "주요 지표를 카드로 시각화하는 통계 대시보드 레이아웃입니다.",
    category: "레이아웃",
    tags: ["Card", "Dashboard", "Stats"],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "dialog-modal",
    title: "다이얼로그 모달",
    description:
      "확인, 삭제 경고 등 다양한 용도의 모달 다이얼로그 패턴입니다.",
    category: "피드백",
    tags: ["Dialog", "Modal", "Alert"],
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "user-profile",
    title: "사용자 프로필",
    description:
      "아바타, 통계, 팔로우 버튼이 포함된 사용자 프로필 카드 컴포넌트입니다.",
    category: "레이아웃",
    tags: ["Avatar", "Card", "Badge"],
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: "toast-notifications",
    title: "토스트 알림",
    description:
      "성공, 오류, 경고, 로딩 등 다양한 상태의 토스트 알림 예제입니다.",
    category: "피드백",
    tags: ["Toast", "Notification", "Sonner"],
    gradient: "from-amber-500 to-yellow-500",
  },
]

// 예제 상세 페이지용 코드 스니펫
export const EXAMPLE_CODE: Record<string, string> = {
  "button-showcase": `import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function ButtonShowcase() {
  return (
    <div className="space-y-6 p-6">
      {/* 변형(Variant) */}
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          변형(Variant)
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <Separator />

      {/* 크기(Size) */}
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          크기(Size)
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <Separator />

      {/* 비활성화 상태 */}
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          비활성화(Disabled)
        </p>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Default</Button>
          <Button variant="outline" disabled>Outline</Button>
        </div>
      </div>
    </div>
  )
}`,

  "login-form": `"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const schema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력하세요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
})

type FormValues = z.infer<typeof schema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>계정에 로그인하여 계속하세요</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(console.log)}>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}`,

  "stats-dashboard": `import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from "lucide-react"

const STATS = [
  { label: "총 매출", value: "₩24,521,000", change: "+12.5%", up: true, icon: DollarSign },
  { label: "신규 사용자", value: "3,247", change: "+8.1%", up: true, icon: Users },
  { label: "주문 수", value: "1,893", change: "-2.3%", up: false, icon: ShoppingCart },
  { label: "페이지 조회", value: "128,400", change: "+23.7%", up: true, icon: Eye },
]

export function StatsDashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">오늘의 현황</h3>
        <p className="text-sm text-muted-foreground">지난 24시간 기준 통계</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  {stat.up
                    ? <TrendingUp className="size-3.5 text-emerald-500" />
                    : <TrendingDown className="size-3.5 text-red-500" />
                  }
                  <span className={\`text-xs font-medium \${stat.up ? "text-emerald-600" : "text-red-500"}\`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">지난주 대비</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}`,

  "dialog-modal": `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Trash2 } from "lucide-react"

export function DialogExamples() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      {/* 기본 다이얼로그 */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">기본 다이얼로그</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>다이얼로그 제목</DialogTitle>
            <DialogDescription>
              여기에 다이얼로그 설명을 작성합니다.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">본문 내용입니다.</p>
          <DialogFooter>
            <Button variant="outline">취소</Button>
            <Button>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="size-4" />
            삭제 확인
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-destructive" />
              정말 삭제하시겠습니까?
            </DialogTitle>
            <DialogDescription>
              이 작업은 되돌릴 수 없습니다. 데이터가 영구적으로 삭제됩니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">취소</Button>
            <Button variant="destructive">삭제</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}`,

  "user-profile": `import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export function UserProfile() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Avatar className="size-16">
            <AvatarFallback className="text-2xl">이</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">이철수</h3>
            <p className="text-sm text-muted-foreground">
              시니어 프론트엔드 개발자
            </p>
          </div>
          <div className="flex gap-2">
            <Badge>React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="outline">Next.js</Badge>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">128</p>
            <p className="text-xs text-muted-foreground">프로젝트</p>
          </div>
          <div>
            <p className="text-2xl font-bold">4.2k</p>
            <p className="text-xs text-muted-foreground">팔로워</p>
          </div>
          <div>
            <p className="text-2xl font-bold">892</p>
            <p className="text-xs text-muted-foreground">팔로잉</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button className="flex-1">팔로우</Button>
          <Button variant="outline" className="flex-1">메시지</Button>
        </div>
      </CardContent>
    </Card>
  )
}`,

  "toast-notifications": `"use client"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ToastDemo() {
  return (
    <div className="space-y-4 p-6">
      <p className="text-sm text-muted-foreground">
        버튼을 눌러 다양한 토스트 알림을 확인하세요.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => toast.success("작업이 성공적으로 완료되었습니다.")}
        >
          성공
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("오류가 발생했습니다. 다시 시도해주세요.")}
        >
          오류
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("주의: 이 작업은 되돌릴 수 없습니다.")}
        >
          경고
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("새로운 업데이트가 있습니다.")}
        >
          정보
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(
              new Promise((resolve) => setTimeout(resolve, 2000)),
              { loading: "처리 중...", success: "완료!", error: "실패" }
            )
          }
        >
          로딩
        </Button>
      </div>
      <Alert>
        <AlertDescription>
          Toast 알림은 Sonner 라이브러리를 사용합니다.
          layout.tsx의 Providers에서 Toaster가 등록되어 있어야 합니다.
        </AlertDescription>
      </Alert>
    </div>
  )
}`,
}

export function getExampleById(id: string): Example | undefined {
  return EXAMPLES.find((ex) => ex.id === id)
}
