# Project Setup Summary & Issues

## 1. Tailwind CSS Version
**Issue:** The project was initialized with Tailwind CSS v4 (Alpha/Beta).
**Impact:** `tailwind.config.ts` does not exist in v4 by default. Theme configuration is handled via CSS variables in `src/app/globals.css`.

## 2. Component/Lint Warnings
**Issue:** Next.js Lint warns about using `<img>` tags in `src/components/ImageCombiner.tsx`.
**Decision:** Kept `<img>` tags for performance with Client-side Data URLs.

## 3. Build Errors in Globals.css
**Issue A:** `CssSyntaxError: Cannot apply unknown utility class shadow-[...]`
**Reason:** Tailwind v4 parser struggles with complex bracket syntax inside `@apply`.
**Fix:** Moved shadow definition to standard CSS `box-shadow`.

**Issue B:** `Error: Cannot apply unknown utility class bg-white/5`
**Reason:** Tailwind v4's `@apply` directives have stricter parsing for alpha-modifiers (e.g., `/5`) when used with colors that might not be explicitly defined in the way the parser expects in the new engine.
**Fix:** Replaced the entire `@apply` line for `.glass-panel` with standard CSS properties (`background-color`, `backdrop-filter`, `border`).

## 4. Current Status
The site is fully functional. The "Combine Images" feature uses HTML5 Canvas to merge images side-by-side entirely in the browser (Client-Side).
