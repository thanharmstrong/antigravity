# SKILL: MONOREPO MANAGER

## 1. PREVENT NESTED REPOS

- Before adding any new project to `projects/`, always check for existing `.git` folders.
- If a user clones a repo into `projects/`, immediately run: `rm -rf [folder]/.git`.

## 2. SYNC PROTOCOL

- When modifying `web-client`: Remind user that changes will auto-deploy to Vercel on push.
- When modifying `ai-service`: Remind user that GitHub Actions will sync to Hugging Face.
- When modifying `.agent/` or `.cursorrules`: Explicitly ask user to commit and push to save "The Brain".

## 3. TROUBLESHOOTING "FILE REF" ERROR

- If a folder appears as a "white folder" or "submodule" on GitHub:
  1. `git rm -r --cached [path]`
  2. `rm -rf [path]/.git`
  3. `git add [path]/`
  4. `git commit`
