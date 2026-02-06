# ANTIGRAVITY AI MONOREPO

## 🏗 System Architecture

**Type:** Independent Sub-projects Monorepo

**Plaintext**

```
antigravity/ (Root - GitHub)
├── .github/workflows/          # CI/CD (GitHub Actions)
│   └── sync-to-hub.yml         # Auto-sync AI logic to Hugging Face
├── .agent/                     # Agent Skills & Workflows
├── .cursorrules                # System-wide AI Instructions
├── projects/
│   ├── web-client/             # Frontend (Next.js) -> Vercel
│   └── ai-service/             # Backend (Python/Gradio) -> Hugging Face
└── README.md                 
```

---

## 🛠 Manual Configuration Settings

### 1. Vercel (Frontend)

* **Repo Link:** `thanharmstrong/antigravity`
* **Root Directory:** `projects/web-client`
* **Framework Preset:** `Next.js`
* **Environment Variables:** Add via Vercel Dashboard Settings.

### 2. Hugging Face (AI Service)

* **Space Name:** `ai-service`
* **Owner:** `Armstronglin`
* **Access Token:** Create at** **`Settings > Tokens` with** ****Write** permission.

### 3. GitHub (Connection Hub)

* **Action Secret:** * Name:** **`HF_TOKEN`
  * Value: [Your Hugging Face Write Token]
* **Branch Strategy:** *** **`main`: Protected branch. Triggers Hugging Face Sync upon merge.
  * `dev`: Development branch for feature testing.

---

## 🔄 Deployment Workflow

1. **Development:** Work on** **`dev` branch.
2. **Push:** `git push origin dev`
3. **Review:** Open Pull Request from** **`dev` to** **`main`.
4. **Merge:** Merging to** **`main` triggers:
   * **Vercel:** Auto-builds** **`projects/web-client`.
   * **GitHub Actions:** Executes** **`sync-to-hub.yml` to force-push** **`projects/ai-service` to Hugging Face Space.

---

## ⚠️ Maintenance Notes

* **Directory Changes:** Any rename of** **`projects/` subfolders requires updating Vercel Root Directory and GitHub Action paths.
* **Secret Rotation:** If** **`HF_TOKEN` is regenerated, update it immediately in GitHub Repository Secrets.
* **Persistence:** Ensure** **`.agent/` and** **`.cursorrules` are tracked by Git to maintain Agent intelligence across environments.
