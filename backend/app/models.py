import uuid
from datetime import date
from typing import Literal, Optional

from pydantic import BaseModel, Field


class Profile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
                "name": "John Doe",
            }
        }


class Transaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str  # Profile ID that this transaction belongs to
    type: Literal["income", "expense"]
    category: str
    amount: float = Field(..., gt=0)  # Amount must be greater than 0
    date: date
    note: Optional[str] = Field(None, max_length=255)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
                "user_id": "b2c3d4e5-f6g7-8901-2345-678901bcdefg",
                "type": "expense",
                "category": "Food",
                "amount": 50.75,
                "date": "2023-11-26",
                "note": "Groceries at local supermarket",
            }
        }
