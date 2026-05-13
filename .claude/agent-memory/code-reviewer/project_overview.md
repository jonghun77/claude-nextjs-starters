---
name: Project Overview
description: Architecture and tech stack of the claude-nextjs-starters project
type: project
---

Next.js 16 App Router starter kit with Korean-language UI.

Stack: Next.js 16.2.6, React 19, TypeScript 5 (strict mode), TailwindCSS v4, shadcn/ui (Radix UI), next-themes, sonner, react-hook-form + zod, lucide-react.

**Why:** Educational/template project for students learning modern Next.js patterns.

**How to apply:** Reviews should focus on patterns that learners will copy — correctness and clarity matter more than micro-optimization. Flag anything that would teach bad habits.

Key structure:
- app/ — App Router pages (docs/[slug], examples/[id], root)
- components/docs/, components/examples/, components/layout/, components/sections/, components/ui/
- lib/docs-data.ts — structured content data (no markdown/CMS)
- lib/examples-data.ts — example metadata + code snippets as strings
- lib/utils.ts — cn() helper only
