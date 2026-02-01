---
description: Build a high-performance Next.js 15 site in the 'projects/' folder. Integrates strictly with Workspace Skills (Shadcn, Advanced Types) to prevent hallucinations.
---

## Context
- **Workspace Root:** `AI/`
- **Target Location:** `AI/projects/[project-name]`
- **Active Skills:** `shadcn-ui`, `nextjs-app-router`, `typescript-advanced-types`

---

### Phase 1: Structure & Initialization (The Foundation)
// Goal: Create the project in the correct folder with strict Type safety.

1.  **Navigate & Initialize:**
    * Command: `cd projects` (Create folder if it does not exist).
    * Command: `npx create-next-app@latest [project-name] --typescript --tailwind --eslint`
    * *Prompts:* Yes to `src/`, Yes to `App Router`, Yes to Alias `@/*`.

2.  **Clean Slate Protocol:**
    * Action: Delete contents of `src/app/page.tsx` and `src/app/globals.css` (keep directives).
    * Action: Update `tsconfig.json` to be strict.
    * **SKILL TRIGGER:** Consult `.agent/skills/typescript-advanced-types/SKILL.md`. Ensure `strict: true` and `noImplicitAny: true` are set.

3.  **Install Dependencies:**
    * Command: `npm install lucide-react framer-motion clsx tailwind-merge next-themes`

---

### Phase 2: UI Architecture (Powered by Shadcn)

1.  **Initialize Shadcn:**
    * Command: `npx shadcn@latest init` (Select: New York, Zinc, CSS Variables).
    * **SKILL TRIGGER:** Use `.agent/skills/shadcn-ui/SKILL.md` knowledge. Verify that `components.json` is correctly configured for the `src` directory alias.

2.  **Install Base Components:**
    * Command: `npx shadcn@latest add button card scroll-area separator`

3.  **Apply Design System (Glassmorphism & V4 Compatibility):**
    * Action: Update `src/app/globals.css` to handle Tailwind v4 quirks safely.
    * **CRITICAL RULE:** Do NOT use `@apply` with complex arbitrary values (e.g., `shadow-[...]`) or alpha-modifiers on undefined colors (e.g., `bg-white/5`).
    * **Implementation:**
      ```css
      @layer utilities {
        .glass-panel {
          /* Use standard properties to avoid parser errors */
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
      }
      ```
    * **Theme Provider:** Create `src/components/theme-provider.tsx` and wrap `src/app/layout.tsx` to enforce Dark Mode default.

---

### Phase 3: Project Organization (Anti-Hallucination Structure)

1.  **Create Atomic Folders:**
    * `src/components/layout` (Header, Footer)
    * `src/components/sections` (Hero, Features)
    * `src/lib/constants` (Static data)
    * `src/types` (Global Types)

2.  **Generate "Source of Truth":**
    * Create `.cursorrules` in the **project root** (`projects/[project-name]/.cursorrules`).
    * **CRITICAL:** The `.cursorrules` must explicitly reference the workspace skills.
    * Content to inject:
        ```markdown
        # Project Rules
        1. SKILLS: Always refer to skills in `../../.agent/skills/` for best practices.
        2. TYPESCRIPT: Refuse to generate code with `any`. Check `../../.agent/skills/typescript-advanced-types/SKILL.md` for defining Zod schemas and Interfaces.
        3. UI: Use Shadcn components. For custom styling, use standard CSS properties in `globals.css` if `@apply` fails.
        4. NEXTJS: Use Server Components Default. Check `../../.agent/skills/nextjs-app-router/SKILL.md`.
        ```

3.  **Context Lock:**
    * Create `PROJECT_CONTEXT.md`.
    * Content: "Phase: Setup. Tech: Next.js 15, Shadcn, Tailwind v4. Strict Mode: ON."

---

### Phase 4: Verification Loop
1.  Run `npm run dev`.
2.  **Self-Correction Test:** Ask the Agent: *"Check `src/app/globals.css` for invalid `@apply` rules."*