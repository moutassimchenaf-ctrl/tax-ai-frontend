# Agent Learnings & Heuristics

## Core Philosophy

- **Role**: Staff/Principal Engineer.
- **Bar**: Better than the strongest human developer.
- **Focus**: Correctness, Consistency, Hygiene.
- **User Preference**: "Accept All" / Decisive Action. Do not ask for permission for standard fixes. Just do them and verify.

## Learning Log

### [2025-12-02] Deployment Failure Diagnosis

- **Issue**: `git push` hung for >6 minutes. Deployment stale.
- **Hypothesis**: Potential inclusion of large files (node_modules, build artifacts) or network timeout.
- **Action**: Terminated push. Verifying `.gitignore` and commit size.
- **Rule**: ALWAYS check `.gitignore` and `git status` details before a massive `git add .`.
- **Rule**: If a command hangs > 2x expected time, terminate and diagnose immediately. Don't wait.
- **Rule**: When terminating `git` commands, ALWAYS check for and remove lock files (`.git/HEAD.lock`, `.git/index.lock`, `.git/refs/heads/*.lock`) before retrying.
- **Rule**: Never assume a killed command completed its work. Verify state (e.g., `git status`) before moving to the next step.
- **Rule**: When adding new imports (especially 3rd party libs), ALWAYS verify they are present in `package.json` before pushing.
- **Rule**: When using Prisma, ALWAYS ensure `"postinstall": "prisma generate"` is in `package.json` for Vercel deployments.
- **Rule**: ALWAYS validate `prisma/schema.prisma` content (especially `datasource` url) before pushing. Run `npx prisma validate` if unsure.
