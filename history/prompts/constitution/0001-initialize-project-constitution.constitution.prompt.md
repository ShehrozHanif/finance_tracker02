---
id: 0001
title: Initialize project constitution
stage: constitution
date: 2025-11-26
surface: agent
model: gemini-1.5-flash-latest
feature: none
branch: master
user: Shehroz Hanif
command: /sp.constitution
labels:
  - constitution
  - project-setup
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---
## Prompt
```text
/sp.constitution 
/sp.constitution

# Constitution: Finance Tracker App

======================================================
1. PURPOSE
======================================================
Build a full-stack finance tracker application with:
- Local-only or backend-supported transaction storage.
- React/Next.js frontend with mobile, tablet, and desktop responsive design.
- Optional charts and insights.
- Optional authentication and cloud backup.
- Deployment to Vercel (frontend) and optional backend host if used.
- Frontend and backend code strictly separated into `frontend/` and `backend/` folders.

======================================================
2. CORE RULES
======================================================
C01 — Core Features
- Add transaction: date, amount, type, category, optional note.
- View transactions: list, filter by date/category.
- Dashboard: monthly totals, balance, category-wise spend.
- Graphs: bar chart for monthly, pie chart for category.

C02 — Data Model
- Transaction object: id, type, category, amount, date, note.
- Income vs Expense logic clearly separated.

C03 — UI Structure
- Screens: Dashboard, Transactions, Add Transaction, Settings.
- Navigation: bottom tab or top bar.
- Mobile-first responsive design; must adapt for tablet and desktop screens.

C04 — Backend Logic
- Local-only: use localStorage / IndexedDB.
- Backend: Python with FastAPI providing API endpoints for transactions and optional authentication.
- Frontend must read backend URL from environment variable: `NEXT_PUBLIC_API_URL`.

C05 — Database Choice
- Beginner: localStorage, IndexedDB, Supabase, or Firebase.
- Advanced: PostgreSQL, MongoDB, MySQL.
- Must choose one before implementation.

C06 — Authentication
- Optional: signup/login/google login if backend used.
- Personal tracker can skip login.

C07 — Security & Privacy
- Sensitive data handling: encryption optional.
- Offline-only or cloud sync per user choice.
- Privacy rules must be defined.

C08 — Analytics & Insights
- Spending patterns, monthly comparison, category behavior.

C09 — Tech Stack
- Frontend (mandatory): Next.js + React + Tailwind CSS + Recharts/Chart.js
- Backend (mandatory if backend mode used): Python + FastAPI
- Deployment: Vercel frontend, optional backend host (e.g., Render/HuggingFace/other free option)

C10 — Future Roadmap
- AI expense categorization, multi-user support, export, notifications.

C11 — Folder Structure
- Frontend files reside in `frontend/`
- Backend files reside in `backend/`
- No mixing of frontend and backend files.

C12 — Testing
- Unit tests for frontend logic: add transaction, dashboard calculations, filters.
- Unit tests for backend API endpoints (if backend exists).
- Integration tests for API communication.
- TDD approach recommended.

======================================================
3. SUCCESS METRICS
======================================================
SM01 — Users can add, view, filter transactions
SM02 — Dashboard shows correct monthly totals
SM03 — Charts display correct data
SM04 — Responsive UI works on mobile, tablet, and desktop
SM05 — Backend endpoints work correctly if deployed
SM06 — App respects privacy & security rules
SM07 — All unit and integration tests pass before deployment
```

## Response
The agent updated the project constitution file (`.specify/memory/constitution.md`) with the content provided by the user. It also added a Sync Impact Report, versioning information (v1.0.0), and governance details, including ratification and amendment procedures. The agent identified that `plan-template.md` requires manual review for alignment with the new constitution.

## Outcome/Impact
The project now has a formalized constitution with clearly defined purpose, core rules, success metrics, and governance. This provides a foundational document for all future development.

## Tests Summary
none

## Files Summary
- .specify/memory/constitution.md was created/modified.

## Next Prompts
The user should review the `plan-template.md` to ensure its "Constitution Check" section aligns with the new principles.

## Reflection Note
The agent successfully processed a multi-step request, including summarizing user-provided content, reading multiple template files for consistency checks, and writing a new constitution with versioning and an impact report. The process demonstrated the ability to adapt to user input that deviates from the expected template-filling format for the `/sp.constitution` command.
```