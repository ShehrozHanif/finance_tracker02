# Finance Tracker Application

A full-stack personal finance tracking application built with Next.js (frontend) and FastAPI (backend). Track your income and expenses, visualize your financial data with interactive charts, and manage your transactions with ease.

## Features

- ✅ **Add Transactions**: Record income and expenses with categories, amounts, dates, and notes
- ✅ **View & Filter**: Filter transactions by category and date range
- ✅ **Financial Dashboard**: View total income, expenses, and balance at a glance
- ✅ **Interactive Charts**: Visualize monthly expenses and category distribution
- ✅ **Edit & Delete**: Manage existing transactions easily
- ✅ **Offline Support**: Works offline using local storage
- ✅ **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ✅ **Real-time Updates**: UI updates instantly when transactions are added/edited/deleted

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Interactive data visualization
- **React Toastify** - Toast notifications

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **Pytest** - Testing framework

## Project Structure

```
finance-track/
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   │   └── page.tsx   # Main application page
│   │   ├── components/    # React components
│   │   │   ├── TransactionForm.tsx
│   │   │   ├── TransactionList.tsx
│   │   │   ├── TotalsCard.tsx
│   │   │   └── Charts.tsx
│   │   └── utils/         # Utility functions
│   │       ├── api.ts
│   │       ├── calculations.ts
│   │       ├── localStorage.ts
│   │       └── sync.ts
│   ├── package.json
│   └── .env.local         # Environment variables
│
├── backend/               # FastAPI backend application
│   ├── app/
│   │   ├── main.py       # FastAPI app entry point
│   │   ├── models.py     # Pydantic models
│   │   └── routes.py     # API endpoints
│   ├── tests/
│   │   └── test_transactions.py
│   ├── requirements.txt
│   └── .env              # Environment variables
│
└── README.md             # This file
```

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Python** 3.9 or higher
- **pip** package manager

### Installation

#### 1. Clone the Repository

```bash
cd finance-track
```

#### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file (optional):

```bash
cp .env.example .env
```

Edit `.env` if needed:

```env
CORS_ORIGINS=http://localhost:3000
```

#### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# For running with backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# For local-only mode (no backend), comment out or leave empty:
# NEXT_PUBLIC_API_URL=
```

## Running the Application

### Option 1: Full Stack (Frontend + Backend)

#### Terminal 1 - Start Backend:

```bash
cd backend
# Activate virtual environment if not already active
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

uvicorn app.main:app --reload --port 8000
```

The backend will be available at: `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

#### Terminal 2 - Start Frontend:

```bash
cd frontend
npm run dev
```

The frontend will be available at: `http://localhost:3000`

### Option 2: Local-Only Mode (Frontend Only)

If you want to run without the backend, the app will use local storage:

1. In `frontend/.env.local`, comment out or remove `NEXT_PUBLIC_API_URL`:

```env
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

2. Start the frontend:

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000` in your browser.

## Running Tests

### Backend Tests

```bash
cd backend
# Activate virtual environment
pytest
```

### Frontend Tests

```bash
cd frontend
npm test
```

## API Endpoints

### Base URL: `http://localhost:8000/api`

| Method | Endpoint                    | Description                |
|--------|-----------------------------|----------------------------|
| POST   | `/transactions/add`         | Add a new transaction      |
| GET    | `/transactions`             | Get all transactions       |
| GET    | `/transactions?category=X`  | Filter by category         |
| GET    | `/transactions?start_date=X&end_date=Y` | Filter by date range |
| PUT    | `/transactions/{id}`        | Update a transaction       |
| DELETE | `/transactions/{id}`        | Delete a transaction       |

### Transaction Model

```json
{
  "id": "string (UUID)",
  "type": "income | expense",
  "category": "string",
  "amount": "number (positive)",
  "date": "string (YYYY-MM-DD)",
  "note": "string (optional)"
}
```

## Usage Guide

### Adding a Transaction

1. Fill in the transaction form on the left side
2. Select transaction type (Income/Expense)
3. Enter category, amount, and date
4. Optionally add a note
5. Click "Add Transaction"

### Viewing Transactions

- All transactions appear in the list on the right
- Transactions are sorted by date (latest first)
- Each transaction shows category, type, amount, date, and optional note

### Filtering Transactions

1. Use the filter section above the transaction list
2. Enter category name (partial matches work)
3. Select start and/or end date
4. Click "Apply Filters"
5. Click "Clear Filters" to reset

### Editing a Transaction

1. Click the "Edit" button on any transaction
2. The form will populate with the transaction data
3. Make your changes
4. Click "Update Transaction"

### Deleting a Transaction

1. Click the "Delete" button on any transaction
2. Confirm the deletion in the popup
3. The transaction will be removed

### Dashboard & Charts

- **Totals Card**: Shows total income, expenses, and balance
- **Monthly Expenses Chart**: Bar chart of expenses by month
- **Category Distribution**: Pie chart showing expense breakdown by category

## Development

### Building for Production

#### Frontend:

```bash
cd frontend
npm run build
npm start
```

#### Backend:

```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=<your-backend-url>`
4. Deploy

### Backend (Railway/HuggingFace Spaces/Render)

1. Push code to GitHub
2. Connect repository to hosting service
3. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Deploy

## Troubleshooting

### Backend won't start

- Ensure Python virtual environment is activated
- Check all dependencies are installed: `pip install -r requirements.txt`
- Verify port 8000 is not in use

### Frontend won't start

- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version: `node --version` (should be 18+)
- Verify port 3000 is not in use

### API connection errors

- Ensure backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS settings in backend

### Transactions not saving

- Check browser console for errors
- Verify API endpoint is accessible
- If in local-only mode, check browser localStorage

## Features in Detail

### Offline Support

The app automatically detects when the backend is unavailable and switches to local-only mode using browser localStorage. When the backend becomes available again, you can sync your offline transactions.

### Responsive Design

The UI is fully responsive with:
- Mobile-first design approach
- Touch-friendly buttons (44px minimum)
- Adaptive layouts for mobile, tablet, and desktop
- Optimized charts for small screens

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Review the troubleshooting section
- Check the API documentation at `http://localhost:8000/docs`

## Acknowledgments

- Built with Next.js and FastAPI
- Charts powered by Recharts
- UI styled with Tailwind CSS
- Icons and design inspired by modern finance apps

---

**Happy Tracking! 💰**