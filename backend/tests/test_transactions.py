import uuid
from datetime import date

from fastapi.testclient import TestClient

from backend.app import routes
from backend.app.main import app
from backend.app.models import Transaction

client = TestClient(app)


def test_add_transaction_failure():
    # Test case: Missing required field (category)
    response = client.post(
        "/api/transactions/add",
        json={
            "type": "expense",
            "amount": 50.0,
            "date": "2023-11-26",
            "note": "Missing category",
        },
    )
    assert response.status_code == 422  # Expecting a validation error


def test_add_transaction_success():
    # Test case: Valid transaction
    transaction_id = str(uuid.uuid4())
    response = client.post(
        "/api/transactions/add",
        json={
            "id": transaction_id,
            "type": "income",
            "category": "Salary",
            "amount": 2000.0,
            "date": "2023-11-26",
            "note": "Monthly salary",
        },
    )
    assert response.status_code == 200
    assert response.json()["id"] == transaction_id
    assert response.json()["type"] == "income"
    assert response.json()["category"] == "Salary"
    assert response.json()["amount"] == 2000.0


def test_get_transactions_with_filters_failing():
    # Clear existing transactions in db for a clean test
    routes.db.clear()

    # Add some sample transactions
    client.post(
        "/api/transactions/add",
        json={
            "id": "1",
            "type": "expense",
            "category": "Food",
            "amount": 10.0,
            "date": "2023-11-01",
        },
    )
    client.post(
        "/api/transactions/add",
        json={
            "id": "2",
            "type": "income",
            "category": "Salary",
            "amount": 1000.0,
            "date": "2023-11-05",
        },
    )
    client.post(
        "/api/transactions/add",
        json={
            "id": "3",
            "type": "expense",
            "category": "Transport",
            "amount": 20.0,
            "date": "2023-11-10",
        },
    )
    client.post(
        "/api/transactions/add",
        json={
            "id": "4",
            "type": "expense",
            "category": "Food",
            "amount": 15.0,
            "date": "2023-11-15",
        },
    )

    # Test filtering by category "Food"
    response = client.get("/api/transactions?category=Food")
    assert response.status_code == 200
    transactions = response.json()
    assert len(transactions) == 2  # Expecting 2 "Food" transactions
    assert all(t["category"] == "Food" for t in transactions)

    # Test filtering by date range (e.g., between 2023-11-01 and 2023-11-10)
    response = client.get("/api/transactions?start_date=2023-11-01&end_date=2023-11-10")
    assert response.status_code == 200
    transactions = response.json()
    assert len(transactions) == 2  # Expecting transactions 1 and 3
    assert all(
        t["date"] >= "2023-11-01" and t["date"] <= "2023-11-10" for t in transactions
    )

    # Test combined filters (e.g., category "Food" and date before 2023-11-10)
    response = client.get("/api/transactions?category=Food&end_date=2023-11-10")
    assert response.status_code == 200
    transactions = response.json()
    assert len(transactions) == 1  # Expecting transaction 1
    assert transactions[0]["id"] == "1"


def test_update_transaction_failure_not_found():
    # Test case: Update a transaction that does not exist
    response = client.put(
        "/api/transactions/non-existent-id",
        json={
            "id": "non-existent-id",
            "type": "expense",
            "category": "Food",
            "amount": 10.0,
            "date": "2023-11-01",
        },
    )
    assert response.status_code == 404


def test_update_transaction_success():
    # Add a transaction first
    transaction_id = str(uuid.uuid4())
    client.post(
        "/api/transactions/add",
        json={
            "id": transaction_id,
            "type": "expense",
            "category": "Old Category",
            "amount": 100.0,
            "date": "2023-10-01",
        },
    )

    # Update the transaction
    updated_amount = 150.0
    updated_category = "New Category"
    response = client.put(
        f"/api/transactions/{transaction_id}",
        json={
            "id": transaction_id,
            "type": "expense",
            "category": updated_category,
            "amount": updated_amount,
            "date": "2023-10-01",
        },
    )
    assert response.status_code == 200
    assert response.json()["amount"] == updated_amount
    assert response.json()["category"] == updated_category

    # Verify the update by fetching the transaction
    get_response = client.get("/api/transactions")
    assert get_response.status_code == 200
    transactions = get_response.json()
    updated_transaction = next(
        (t for t in transactions if t["id"] == transaction_id), None
    )
    assert updated_transaction is not None
    assert updated_transaction["amount"] == updated_amount
    assert updated_transaction["category"] == updated_category


def test_delete_transaction_failure_not_found():
    # Test case: Delete a transaction that does not exist
    response = client.delete("/api/transactions/non-existent-id")
    assert response.status_code == 404


def test_delete_transaction_success():
    # Add a transaction first
    transaction_id = str(uuid.uuid4())
    client.post(
        "/api/transactions/add",
        json={
            "id": transaction_id,
            "type": "expense",
            "category": "Food",
            "amount": 10.0,
            "date": "2023-11-01",
        },
    )

    # Delete the transaction
    response = client.delete(f"/api/transactions/{transaction_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Transaction deleted successfully"

    # Verify deletion by trying to get all transactions
    get_response = client.get("/api/transactions")
    assert get_response.status_code == 200
    transactions = get_response.json()
    assert not any(t["id"] == transaction_id for t in transactions)
