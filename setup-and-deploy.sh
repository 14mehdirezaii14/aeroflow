#!/usr/bin/env bash
#
# AeroFlow — One-command setup & deployment script
# -------------------------------------------------
# 1. Initializes a local Git repository (default branch: main)
# 2. Creates a conventional initial commit
# 3. Creates a GitHub repository and links it as remote (via GitHub CLI)
# 4. Deploys directly to Vercel (via Vercel CLI) or links the repo
#
# Prerequisites:
#   - Git installed and authenticated
#   - GitHub CLI (`gh`) installed and authenticated (`gh auth login`)
#   - Vercel CLI (`vercel`) installed, and a `VERCEL_TOKEN`
#
# Usage:
#   ./setup-and-deploy.sh --repo aeroflow --public --deploy
#

set -euo pipefail

# ─── Config ─────────────────────────────────────────────────────
REPO_NAME="aeroflow"
VISIBILITY="--public"
DO_DEPLOY=false

# ─── Parse arguments ────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo)
      REPO_NAME="${2:-aeroflow}"
      shift 2
      ;;
    --public)
      VISIBILITY="--public"
      shift
      ;;
    --private)
      VISIBILITY="--private"
      shift
      ;;
    --deploy)
      DO_DEPLOY=true
      shift
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

echo "▶ AeroFlow setup — repo: ${REPO_NAME} | deploy: ${DO_DEPLOY}"

# ─── 1. Initialize Git ──────────────────────────────────────────
if [[ ! -d .git ]]; then
  echo "▶ Initializing Git repository on branch 'main'…"
  git init -b main
else
  echo "✓ Git repository already initialized."
fi

# ─── 2. Conventional initial commit ─────────────────────────────
git add --all
if git diff --cached --quiet; then
  echo "✓ Nothing to commit (working tree clean)."
else
  echo "▶ Creating conventional initial commit…"
  git commit -m "feat: initial scaffold of AeroFlow e-commerce platform

- Next.js 15 App Router, React 19, TypeScript (strict)
- RTL Persian UI with Tailwind CSS + shadcn/ui
- TanStack Query v5 data layer with typed API client
- Forms & Zod schemas with Persian validation messages
- CI/CD automation (GitHub Actions + Vercel)"

fi

# ─── 3. Create GitHub repository + link remote ──────────────────
if command -v gh >/dev/null 2>&1; then
  if ! gh repo view "${REPO_NAME}" >/dev/null 2>&1; then
    echo "▶ Creating GitHub repository '${REPO_NAME}'…"
    gh repo create "${REPO_NAME}" "${VISIBILITY}" --source=. --remote=origin --push
  else
    echo "✓ GitHub repo '${REPO_NAME}' already exists; ensuring remote…"
    git remote add origin "git@github.com:$(gh api user -q .login)/${REPO_NAME}.git" 2>/dev/null || true
    git push -u origin main || true
  fi
else
  echo "⚠ GitHub CLI not found — skip GitHub repo creation."
fi

# ─── 4. Deploy to Vercel ────────────────────────────────────────
if [[ "${DO_DEPLOY}" == true ]]; then
  if command -v vercel >/dev/null 2>&1; then
    echo "▶ Deploying to Vercel (production)…"
    vercel --prod --yes
  else
    echo "⚠ Vercel CLI not found — install via 'npm i -g vercel' and re-run with --deploy."
  fi
else
  echo "ℹ Skipping deploy (use --deploy to deploy directly)."
  echo "ℹ Alternatively, import the GitHub repo into Vercel from the dashboard."
fi

echo "✅ Setup complete."
