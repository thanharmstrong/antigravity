---
description: FULL-STACK AI MONOREPO SETUP
---

## STEP 1: WORKSPACE STRUCTURE
1. Initialize root git: `cd AI && git init`
2. Create directory: `mkdir projects`
3. Add `.gitignore` to root (as defined in .cursorrules).

## STEP 2: PROJECT INITIALIZATION (ANTI-NESTED GIT)
1. For Web: `cd projects && npx create-next-app@latest web-client`
2. For AI: `mkdir ai-service && cd ai-service && touch app.py requirements.txt`
3. IMPORTANT: Delete any hidden `.git` folders inside `projects/web-client` and `projects/ai-service`.
4. Run: `git add .` from root AI/ to ensure all files are tracked as a single repo.

## STEP 3: VERCEL CONNECTION
1. Push root repo to GitHub.
2. Link to Vercel: Set "Root Directory" to `projects/web-client`.
3. Framework: Next.js.

## STEP 4: HUGGING FACE SYNC (GITHUB ACTIONS)
1. Create `.github/workflows/sync-to-hub.yml`.
2. Add `HF_TOKEN` to GitHub Repository Secrets.
3. Configure the YAML to target `projects/ai-service/`.