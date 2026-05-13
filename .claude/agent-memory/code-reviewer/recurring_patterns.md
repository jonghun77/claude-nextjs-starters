---
name: Recurring Patterns and Issues
description: Known recurring issues and patterns found during code reviews of this codebase
type: project
---

## Recurring Issues Observed (first full review, 2026-05-10)

1. **NAV_LINKS duplication** — identical constant defined in both header.tsx and mobile-nav.tsx. Single source of truth needed.

2. **Index keys on stable lists** — docs-content.tsx uses array index `i` and `j` as React keys for content blocks and list items. Data is static so no runtime bug today, but is a bad pattern for learners to copy.

3. **slugify() does not handle Korean/non-ASCII text** — `text.replace(/\s+/g, "-").toLowerCase()` produces anchors like `starterkit이란?-` for Korean headings. Anchor links in TOC will silently not scroll. The same function is duplicated in docs-content.tsx and app/docs/[slug]/page.tsx.

4. **navigator.clipboard errors not caught** — cta.tsx uses `.then()` but no `.catch()`. example-viewer.tsx uses `await` without try/catch. Clipboard API is blocked in insecure contexts (non-HTTPS).

5. **`React.ComponentType` without props type** — example-viewer.tsx uses `Record<string, React.ComponentType>` which silently accepts any component. Should be `React.ComponentType<Record<string, never>>` or a named type.

6. **login-form example uses `console.log` as submit handler** — present in both the docs-data.ts code snippet and the examples-data.ts code snippet. Fine for demo but a pattern learners should not copy directly.

7. **ThemeToggle mounted pattern** — correctly implemented with the `mounted` guard. Good pattern, should be praised in reviews.

8. **generateStaticParams without revalidation config** — pages are statically generated but next.config.ts is empty. Fine for a static site but should be noted.
