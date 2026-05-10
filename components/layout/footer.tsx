import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="mt-auto">
      <Separator />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row md:px-6">
        <p>© 2026 StarterKit. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <ExternalLink className="size-4" />
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
