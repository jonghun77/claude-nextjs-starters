export interface NavLink {
  readonly href: string
  readonly label: string
  readonly external?: boolean
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: "#features", label: "기능" },
  { href: "/docs", label: "문서" },
  { href: "/examples", label: "예제" },
  { href: "https://github.com", label: "GitHub", external: true },
]
