# Tasks: Finance Tracker App

**Input**: Design documents from `specs/001-finance-tracker/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Project Setup

**Purpose**: Initialize project structure, dependencies, and basic configuration

- [ ] T001 Create frontend folder `frontend/`
- [ ] T002 Initialize Next.js app with TypeScript `frontend/`
- [ ] T003 Install frontend dependencies (Tailwind CSS, Recharts, react-toastify) in `frontend/package.json`
- [ ] T004 Configure Tailwind CSS in `frontend/tailwind.config.js`
- [ ] T005 Setup frontend folder structure (`frontend/pages/`, `frontend/components/`, `frontend/styles/`)
- [ ] T006 Create backend folder `backend/`
- [ ] T007 Setup Python virtual environment in `backend/venv/`
- [ ] T008 Install backend dependencies (FastAPI, Uvicorn, Pydantic, pytest) in `backend/requirements.txt`
- [ ] T009 Setup backend folder structure (`backend/app/`, `backend/tests/`)
- [ ] T010 Configure environment (`frontend/.env.local`, `backend/.env`) and define `NEXT_PUBLIC_API_URL`

## Phase 2: Foundational Setup (Backend & Models)

**Purpose**: Establish core backend infrastructure before feature implementation

- [ ] T011 Implement `TransactionModel` Pydantic model in `backend/app/models.py`
- [ ] T012 Define basic API endpoints (`POST /api/transactions/add`, `GET /api/transactions`, `PUT /api/transactions/{id}`, `DELETE /api/transactions/{id}`) in `backend/app/routes.py` (placeholder functions with in-memory storage)
- [ ] T013 Enable CORS for frontend URL in `backend/app/main.py`

## Phase 3: User Story 1 - Add Transaction (UJ01)

**Goal**: Allow users to add new transactions, which appear instantly in the UI.

### Tests for User Story 1

- [ ] T014 [US1] Write failing unit test for `POST /api/transactions/add` in `backend/tests/test_transactions.py`
- [ ] T015 [US1] Write failing unit test for `TransactionForm` input validation in `frontend/src/components/TransactionForm.test.tsx`

### Implementation for User Story 1

- [ ] T016 [US1] Implement `POST /api/transactions/add` in `backend/app/routes.py` with input validation, ID generation, and in-memory storage.
- [ ] T017 [US1] Create `TransactionForm` component in `frontend/src/components/TransactionForm.tsx` with input fields (date, amount, type, category, optional note) and submission handler.
- [ ] T018 [US1] Handle form submission and API call (or local storage save) in `frontend/src/components/TransactionForm.tsx`.
- [ ] T019 [US1] Display error messages in `TransactionForm` component using `react-toastify` or `alert()` as fallback.
- [ ] T020 [US1] Implement keyboard Enter key submission for `TransactionForm` (desktop support).

## Phase 4: User Story 2 - View & Filter Transactions (UJ02)

**Goal**: Enable users to view a list of transactions and filter them by date or category.

### Tests for User Story 2

- [ ] T021 [US2] Write failing unit test for `GET /api/transactions` with filters in `backend/tests/test_transactions.py`
- [ ] T022 [US2] Write failing unit test for `TransactionList` rendering with filters in `frontend/src/components/TransactionList.test.tsx`

### Implementation for User Story 2

- [ ] T023 [US2] Implement `GET /api/transactions` in `backend/app/routes.py` with optional date/category filters and return list sorted by latest first.
- [ ] T024 [US2] Create `TransactionList` component in `frontend/src/components/TransactionList.tsx` to fetch and render transactions dynamically.
- [ ] T025 [US2] Implement filtering logic (by date/category) in `frontend/src/components/TransactionList.tsx`.
- [ ] T026 [US2] Ensure `TransactionForm` updates the `TransactionList` instantly upon submission.

## Phase 5: User Story 3 - Monthly Dashboard (UJ03)

**Goal**: Display a dashboard with monthly financial summaries and dynamic charts.

### Tests for User Story 3

- [ ] T027 [US3] Write failing unit test for dashboard calculations (income, expenses, balance) in `frontend/src/components/TotalsCard.test.tsx`
- [ ] T028 [US3] Write failing unit test for `Charts` component rendering with data in `frontend/src/components/Charts.test.tsx`

### Implementation for User Story 3

- [ ] T029 [US3] Implement logic for calculating total income, expenses, balance, and category-wise spending in `frontend/src/utils/calculations.ts`.
- [ ] T030 [US3] Create `TotalsCard` component in `frontend/src/components/TotalsCard.tsx` to display calculated totals and balance.
- [ ] T031 [US3] Create `Charts` component in `frontend/src/components/Charts.tsx` to render bar chart (monthly expenses) and pie chart (category distribution) using Recharts.
- [ ] T032 [US3] Implement dynamic chart updates when transactions are added/updated/deleted.
- [ ] T033 [US3] Handle edge case: show placeholder message "No data yet" if no transactions in `frontend/src/components/Charts.tsx` and `frontend/src/components/TotalsCard.tsx`.

## Phase 6: User Story 4 - Edit / Delete Transactions

**Goal**: Allow users to edit and delete existing transactions.

### Tests for User Story 4

- [ ] T034 [US4] Write failing unit test for `PUT /api/transactions/{id}` in `backend/tests/test_transactions.py`
- [ ] T035 [US4] Write failing unit test for `DELETE /api/transactions/{id}` in `backend/tests/test_transactions.py`
- [ ] T036 [US4] Write failing unit test for edit/delete buttons in `TransactionList` in `frontend/src/components/TransactionList.test.tsx`

### Implementation for User Story 4

- [ ] T037 [US4] Implement `PUT /api/transactions/{id}` in `backend/app/routes.py` with validation and update logic.
- [ ] T038 [US4] Implement `DELETE /api/transactions/{id}` in `backend/app/routes.py` with deletion logic.
- [ ] T039 [US4] Add edit and delete buttons to `TransactionList` items in `frontend/src/components/TransactionList.tsx`.
- [ ] T040 [US4] Implement client-side logic for edit/delete buttons to call API and update UI in `frontend/src/components/TransactionList.tsx`.

## Phase 7: Offline & Local-only Mode (UJ05, C08)

**Goal**: Provide offline functionality and support local-only operation when a backend is not available.

### Tests for Offline & Local-only Mode

- [ ] T041 [P] Write failing integration test for local storage save/load in `frontend/tests/integration/local_storage.test.ts`
- [ ] T042 [P] Write failing integration test for offline transaction persistence and sync when online in `frontend/tests/integration/offline_sync.test.ts`

### Implementation for Offline & Local-only Mode

- [ ] T043 [P] Implement local storage save/load for transactions in `frontend/src/utils/localStorage.ts`.
- [ ] T044 [P] Integrate local storage for local-only mode when backend is absent in `frontend/src/utils/api.ts`.
- [ ] T045 [P] Implement logic to detect online/offline status and sync local transactions with backend when online in `frontend/src/utils/sync.ts`.

## Phase 8: Responsive UI (UJ06)

**Goal**: Ensure the application's user interface adapts and functions correctly across various devices and screen sizes.

- [ ] T046 [P] Apply Tailwind CSS breakpoints for mobile-first layout in `frontend/tailwind.config.js` and `frontend/src/styles/globals.css`.
- [ ] T047 [P] Ensure forms, lists, charts are readable and buttons are touch-friendly (min ~44px) across breakpoints in `frontend/src/components/*.tsx`.
- [ ] T048 [P] Verify layout and responsiveness across mobile, tablet, and desktop viewports.

## Phase 9: Environment Variables (UJ07)

**Goal**: Configure environment variables to correctly connect the frontend to the backend.

- [ ] T049 [P] Configure `NEXT_PUBLIC_API_URL` in `frontend/.env.local` and `backend/.env`.
- [ ] T050 [P] Ensure frontend correctly uses `NEXT_PUBLIC_API_URL` or falls back to `http://localhost:8000` for local dev in `frontend/src/utils/api.ts`.

## Phase 10: Testing & Polish (NFR04, C09)

**Goal**: Finalize testing, ensure code quality, and prepare for deployment.

- [ ] T051 [P] Finalize all unit and integration tests for frontend and backend.
- [ ] T052 [P] Ensure 100% unit test coverage for backend and sufficient coverage for frontend.
- [ ] T053 [P] Conduct responsive layout tests and cross-device validation.
- [ ] T054 [P] Code cleanup and refactoring across frontend and backend.
- [ ] T055 [P] Add basic documentation to `README.md`.

## Phase 11: Deployment (UJ07)

**Goal**: Successfully deploy the frontend and backend components of the application.

- [ ] T056 [P] Deploy frontend to Vercel and configure `NEXT_PUBLIC_API_URL`.
- [ ] T057 [P] Deploy backend to a free hosting service (e.g., HuggingFace Spaces/Railway) and verify HTTPS accessibility.

## Dependencies & Execution Order

### Phase Dependencies

- **Project Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational Setup (Phase 2)**: Depends on Project Setup completion - BLOCKS all user stories
- **User Story Phases (Phase 3-6)**: All depend on Foundational Setup completion
  - User stories can then proceed in parallel (if staffed) or sequentially in priority order.
- **Offline & Local-only Mode (Phase 7)**: Can be developed in parallel with core user stories, but depends on basic transaction functionality.
- **Responsive UI (Phase 8)**: Can be developed in parallel, depends on UI components being present.
- **Environment Variables (Phase 9)**: Depends on both frontend and backend setup.
- **Testing & Polish (Phase 10)**: Depends on all implementation tasks being substantially complete.
- **Deployment (Phase 11)**: Depends on all development and testing phases.

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Backend API endpoints before frontend integration
- Models before services
- Services before UI components
- Core implementation before integration

### Parallel Opportunities

- Many tasks within each phase are marked [P] indicating they can run in parallel.
- Different user stories can be worked on in parallel by different team members once Foundational Setup is complete.
- Frontend and Backend development can proceed in parallel for many tasks once initial setup is complete.

## Implementation Strategy

### Incremental Delivery (Per User Story)

1. Complete Phase 1: Project Setup
2. Complete Phase 2: Foundational Setup (CRITICAL - blocks user stories)
3. Complete Phase 3: User Story 1 (Add Transaction)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Proceed to next user story (Phase 4), then validate and repeat.
6. Integrate cross-cutting concerns (Offline, Responsive UI, Environment Variables) as they become relevant or in parallel.
7. Final Phase: Testing & Polish, then Deployment.

## Notes

- This plan emphasizes a Test-Driven Development (TDD) approach.
- File paths are provided to guide placement, but local project structure may require minor adjustments.
- Regular communication and code reviews are essential for integrating parallel workstreams.
