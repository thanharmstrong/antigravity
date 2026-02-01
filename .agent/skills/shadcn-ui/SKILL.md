# Shadcn UI Integration & Premium Design Skill

This skill provides comprehensive instructions for using Shadcn UI to build modern, professional, and visually stunning web interfaces.

## Core Capabilities

- **Automatic Component Installation**: Knowledge of how to use `npx shadcn@latest add [component]` to extend the UI library.
- **Theming & Styling**: Mastery of CSS variables in `index.css` to manage global colors, radius, and border styles.
- **Glassmorphism & Effects**: Techniques for implementing premium translucent panels, glows, and subtle animations.
- **Responsive Layouts**: Best practices for grid and flexbox layouts using Tailwind CSS.

## Usage Guidelines

### 1. Component Philosophy
Always prefer adding components via the CLI over manual implementation. This ensures all accessibility (Radix UI) and styling (Tailwind) defaults are correctly set.

### 2. Premium Aesthetics
When building "Antigravity" themed dashboards:
- Use **Dark Mode** as the default.
- Use **Glassmorphism**: `.glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }`
- **Glow Effects**: Use subtle box shadows like `box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);` for emphasized elements.

### 3. Setup Commands
- Initialize: `npx shadcn@latest init`
- Add Button: `npx shadcn@latest add button`
- Add Card: `npx shadcn@latest add card`

## Best Practices
- **Utils**: Always use the `cn()` helper from `src/lib/utils.ts` for conditional class merging.
- **Separation of Concerns**: Keep business logic in pages/containers and keep UI components focused on visual representation.
- **Accessibility**: Never remove the focus ring or aria-labels provided by Shadcn/Radix.

---
*This skill is optimized for the Antigravity workflow.*
