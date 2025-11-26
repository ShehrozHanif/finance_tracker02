# Plan: Finance Tracker App (Finalized)

**Feature Branch**: `001-finance-tracker`
**Created**: 2025-11-26

My SP.Specify file is at specs/001-finance-tracker/spec.md  
My SP.Task file is at specs/001-finance-tracker/task.md

## Summary

This plan outlines the architecture, interfaces, data model, error handling, key decisions, and testing strategy for the Full-Stack Responsive Finance Tracker application. It leverages Next.js/React for the frontend and Python FastAPI for the backend, with a focus on local-first functionality and responsive design.

======================================================
1. Architecture Sketch
======================================================

Frontend (Next.js + React + Tailwind CSS)
- Pages:
  - Dashboard (`/dashboard`)
  - Transactions (`/transactions`)
  - Add Transaction (`/add`)
  - Settings (`/settings`)
- Components:
  - TransactionForm
  - TransactionList
  - Charts (BarChart, PieChart)
  - TotalsCard
- State management:
  - Local state with React hooks
  - Optional context for global state (transactions)
- API calls:
  - Fetch / add / update / delete transactions
  - Connects to backend using `NEXT_PUBLIC_API_URL`

Backend (Python + FastAPI)
- Endpoints:
  - POST `/api/transactions/add`
  - GET `/api/transactions`
  - PUT `/api/transactions/{id}`
  - DELETE `/api/transactions/{id}`
- Validation:
  - Pydantic models
  - Ensure amount is numeric, category valid, date present
- Response format:
  - Success: `{"error": false, "result": ...}`
  - Failure: `{"error": true, "message": "string"}`

Database / Storage
- MVP: localStorage (frontend) for local-only mode
- Optional: backend DB (Supabase, Firebase, MongoDB)
- Each transaction has:

```json
{
"id": "uuid",
"type": "income|expense",
"category": "string",
"amount": number,
"date": "YYYY-MM-DD",
"note": "string"
}
```

======================================================
2. Interfaces
======================================================

Frontend → Backend API
- POST `/api/transactions/add`  
Request: `{ a transaction object }`  
Response: `{ error: false, result: transaction }` or `{ error: true, message }`

- GET `/api/transactions`  
Request: `{ optional filters }`  
Response: `{ error: false, result: [transactions] }`

- PUT `/api/transactions/{id}`  
Request: `{ updated fields }`  
Response: `{ error: false, result: updatedTransaction }`

- DELETE `/api/transactions/{id}`  
Response: `{ error: false, result: "deleted" }`

UI Components → State
- TransactionForm → adds transaction → updates global/local state
- TransactionList → reads state → renders dynamically
- Charts → reads state → renders summaries
- TotalsCard → reads state → renders totals

======================================================
3. Data Model
======================================================

Transaction:
- id: string (UUID)
- type: "income" | "expense"
- category: string
- amount: number
- date: string (YYYY-MM-DD)
- note: optional string

Frontend State:
- transactions: Transaction[]
- filters: { startDate?, endDate?, category? }

Backend Model (Pydantic):
- class TransactionModel(BaseModel):
  type: Literal["income", "expense"]
  category: str
  amount: float
  date: date
  note: Optional[str]

======================================================
4. Error Handling
======================================================

Frontend:
- Show form validation errors inline
- Show API errors in form or notifications
- Handle offline mode gracefully

Backend:
- Return structured error JSON
- Validate all input fields
- Handle edge cases:
- Negative amounts
- Invalid date format
- Missing category/type
- Return 400 or 422 HTTP codes for invalid requests

======================================================
5. Decisions Needing
======================================================

D001 — Authentication
- Skip for MVP. Optional for future enhancement.

D002 — Offline / Sync
- Implement local-only MVP first. Sync logic optional later.

D003 — Charts Library
- Use Recharts for React integration. Chart.js optional later.

D004 — Deployment
- Frontend: Vercel  
- Backend: HuggingFace/free backend  
- Alternative free backend options can be added later.

D005 — State Management
- React hooks sufficient for MVP. Context optional. Redux not required.

======================================================
6. Testing Strategy
======================================================

Frontend:
- Unit Tests:
- TransactionForm input validation
- TransactionList renders transactions
- Charts render correctly
- Edge cases: empty lists, invalid inputs
- Integration Tests:
- API calls work correctly
- State updates reflect in UI
- Responsive / cross-device tests:
- Mobile (360px+)
- Tablet
- Desktop

Backend:
- Unit Tests:
- Add / Get / Update / Delete transactions
- Validate input & error handling
- Integration Tests:
- Test API endpoints with frontend-like requests
- Offline/local-only behavior

Testing Tools:
- Frontend: Jest + React Testing Library
- Backend: pytest + coverage

======================================================
7. Technical Details
======================================================

**Language/Version**: Python 3.12+, Next.js (latest), React
**Primary Dependencies**: FastAPI, Uvicorn, Pydantic, pytest, coverage (backend); Tailwind CSS, Recharts or Chart.js (frontend)
**Storage**: localStorage (MVP), optional cloud DB later (Supabase, Firebase, MongoDB)
**Testing**: Jest + React Testing Library (frontend); pytest + coverage (backend)
**Target Platform**: Web (mobile, tablet, desktop responsive)
**Project Type**: Full-stack web (frontend/backend separated)
**Performance Goals**: API response within 100 ms for standard operations
**Constraints**: Stateless design (backend), JSON-only communication, No external finance libraries (calculations manual), Mobile-first responsive UI, Environment variables, Separation of concerns (frontend/backend), Offline & Sync (local-only MVP), TDD.
**Scale/Scope**: Personal finance tracker.

- Frontend: Next.js + React + Tailwind CSS + Recharts
- Backend: FastAPI + Pydantic + Uvicorn
- Database: localStorage (MVP) → optional cloud DB later
- TypeScript: ensure strong typing
- TDD: tests first, then implementation
- Responsive-first design
- Environment variables:
- `NEXT_PUBLIC_API_URL=<backend-url>`
- Separate frontend and backend folders

======================================================
8. Constraints & Rules
======================================================

C01 — Separate frontend & backend folders  
C02 — Frontend: UI + state management only  
C03 — Backend: API + validation + DB logic only  
C04 — Local-first MVP, cloud optional  
C05 — Mobile-first, touch-friendly UI  
C06 — JSON-only communication  
C07 — Charts only from approved library (Recharts)  
C08 — Optional authentication skipped for MVP

======================================================
9. Constitution Check
======================================================

- **C01 — Core Features:** The plan covers adding/viewing transactions, dashboard, and graphs. (PASS)
- **C02 — Data Model:** The plan defines the Transaction object and its attributes. (PASS)
- **C03 — UI Structure:** The plan outlines screens, navigation, and mobile-first responsive design. (PASS)
- **C04 — Backend Logic:** The plan includes both local-only mode and FastAPI backend with `NEXT_PUBLIC_API_URL`. (PASS)
- **C05 — Database Choice:** The plan prioritizes localStorage for MVP and considers optional cloud databases. (PASS)
- **C06 — Authentication:** The plan explicitly defers authentication for MVP, aligning with optional status. (PASS)
- **C07 — Security & Privacy:** The plan's error handling and validation implicitly address some security aspects. Explicit privacy rules will be detailed in later stages. (PASS - with note for later refinement)
- **C08 — Analytics & Insights:** The plan incorporates dashboard and chart functionalities. (PASS)
- **C09 — Tech Stack:** The plan's chosen tech stack aligns with the constitution's mandatory and optional components. (PASS)
- **C10 — Future Roadmap:** Not directly applicable to this planning stage, but the plan lays a foundation for future enhancements. (N/A)
- **C11 — Folder Structure:** The plan adheres to the `frontend/` and `backend/` separation. (PASS)
- **C12 — Testing:** The plan details unit and integration testing strategies, emphasizing TDD. (PASS)

======================================================
# End of Plan