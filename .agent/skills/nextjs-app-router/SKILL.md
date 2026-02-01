---
name: nextjs-app-router
description: Best practices for Next.js 15 App Router, Server Components, and Server Actions. Enforces modern architecture and performance optimization.
---

# Next.js 15 App Router Mastery

## Core Philosophy
- **Server First**: All components are Server Components by default.
- **Client Second**: Add `'use client'` ONLY when you need:
  - Event listeners (`onClick`, `onChange`)
  - React Hooks (`useState`, `useEffect`, `useRouter`)
  - Browser-only APIs (`window`, `localStorage`)
- **Fetch Standard**: Use standard `fetch` or direct DB calls in Server Components.

## 1. Data Fetching & State
### ✅ DO (Server Components)
```tsx
// src/app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await db.query.users.findMany(); // Direct DB access allowed
  return <div>{data.map(u => <UserCard key={u.id} user={u} />)}</div>;
}
```

### ❌ DON'T (Old React Pattern)
```tsx
// ❌ Avoid this in App Router unless absolutely necessary
"use client";
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => { fetch('/api/users').then(...) }, []);
  if (!data) return <Skeleton />;
}
```

## 2. Server Actions (Mutations)
Stop creating `pages/api` routes. Use Server Actions for mutations.

```tsx
// src/actions/subscribe-action.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function subscribeUser(formData: FormData) {
  const validated = schema.parse({ email: formData.get("email") });
  
  await db.insert.subscribers(validated);
  revalidatePath("/"); // Update UI
}
```

## 3. Component Architecture
- **Global Layouts**: `src/app/layout.tsx` (Use strict caching here).
- **Route Groups**: Use `(group)` folders to organize routes without affecting URL structure (e.g., `src/app/(auth)/login/page.tsx` -> `/login`).
- **Parallel Routes**: Use `@folder` for dashboards/modals.

## 4. Performance & SEO
- **Images**: ALWAYS use `next/image` with strictly defined width/height or `fill`.
- **Fonts**: Use `next/font` (Google Fonts) to prevent Layout Shift.
- **Metadata**:
```tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Antigravity',
    default: 'Antigravity Dashboard',
  },
  description: 'Premium AI Dashboard',
};
```

## 5. Security Check
- Never pass sensitive keys (process.env.SECRET) to Client Components.
- Always validate Server Action inputs using Zod (see `typescript-advanced-types`).
