from datetime import date
from typing import Dict, List, Optional

from fastapi import APIRouter, HTTPException, Query

from .models import Profile, Transaction

router = APIRouter()

# In-memory storage for MVP
profiles_db: Dict[str, Profile] = {}
transactions_db: Dict[str, Transaction] = {}


# Profile endpoints
@router.post("/profiles", response_model=Profile)
async def add_profile(profile: Profile):
    if profile.id in profiles_db:
        raise HTTPException(
            status_code=400, detail="Profile with this ID already exists"
        )
    profiles_db[profile.id] = profile
    return profile


@router.get("/profiles", response_model=List[Profile])
async def get_profiles():
    return list(profiles_db.values())


# Transaction endpoints
@router.post("/transactions/add", response_model=Transaction)
async def add_transaction(transaction: Transaction):
    # Validate that the user_id exists
    if transaction.user_id not in profiles_db:
        raise HTTPException(
            status_code=400, detail="Profile with this user_id does not exist"
        )
    if transaction.id in transactions_db:
        raise HTTPException(
            status_code=400, detail="Transaction with this ID already exists"
        )
    transactions_db[transaction.id] = transaction
    return transaction


@router.get("/transactions", response_model=List[Transaction])
async def get_transactions(
    user_id: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
):
    # Filter by user_id first (required for multi-profile support)
    if not user_id:
        raise HTTPException(
            status_code=400, detail="user_id query parameter is required"
        )
    
    # Validate that the user_id exists
    if user_id not in profiles_db:
        raise HTTPException(
            status_code=404, detail="Profile with this user_id does not exist"
        )
    
    filtered_transactions = [
        t for t in transactions_db.values() if t.user_id == user_id
    ]

    if category:
        filtered_transactions = [
            t for t in filtered_transactions if t.category == category
        ]

    if start_date:
        filtered_transactions = [
            t for t in filtered_transactions if t.date >= start_date
        ]

    if end_date:
        filtered_transactions = [
            t for t in filtered_transactions if t.date <= end_date
        ]

    # Sort by date, latest first
    filtered_transactions.sort(key=lambda t: t.date, reverse=True)

    return filtered_transactions


@router.put("/transactions/{transaction_id}", response_model=Transaction)
async def update_transaction(transaction_id: str, transaction: Transaction):
    if transaction_id not in transactions_db:
        raise HTTPException(status_code=404, detail="Transaction not found")
    if transaction_id != transaction.id:
        raise HTTPException(
            status_code=400,
            detail="Transaction ID in path and body must match",
        )
    # Validate that the user_id exists
    if transaction.user_id not in profiles_db:
        raise HTTPException(
            status_code=400, detail="Profile with this user_id does not exist"
        )
    transactions_db[transaction_id] = transaction
    return transaction


@router.delete("/transactions/{transaction_id}", response_model=Dict[str, str])
async def delete_transaction(transaction_id: str):
    if transaction_id not in transactions_db:
        raise HTTPException(status_code=404, detail="Transaction not found")
    del transactions_db[transaction_id]
    return {"message": "Transaction deleted successfully"}
