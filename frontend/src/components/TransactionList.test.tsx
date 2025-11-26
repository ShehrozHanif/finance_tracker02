import { render, screen } from "@testing-library/react";
import TransactionList from "./TransactionList"; // Assuming TransactionList will be created here
import { Transaction } from "../utils/api";

describe("TransactionList", () => {
  const sampleTransactions: Transaction[] = [
    {
      id: "1",
      type: "expense",
      category: "Food",
      amount: 10.0,
      date: "2023-11-01",
      note: "Lunch",
    },
    {
      id: "2",
      type: "income",
      category: "Salary",
      amount: 1000.0,
      date: "2023-11-05",
      note: "Monthly",
    },
    {
      id: "3",
      type: "expense",
      category: "Transport",
      amount: 20.0,
      date: "2023-11-10",
      note: "Bus fare",
    },
  ];

  it("should render a list of transactions", () => {
    render(<TransactionList transactions={sampleTransactions} />);

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(
      sampleTransactions.length,
    );
  });

  it("should filter transactions by category", () => {
    render(
      <TransactionList
        transactions={sampleTransactions}
        filter={{ category: "Food" }}
      />,
    );
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.queryByText("Salary")).not.toBeInTheDocument();
  });

  it("should filter transactions by date range", () => {
    render(
      <TransactionList
        transactions={sampleTransactions}
        filter={{ startDate: "2023-11-01", endDate: "2023-11-05" }}
      />,
    );
    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.queryByText("Transport")).not.toBeInTheDocument();
  });

  it("should render edit and delete buttons for each transaction", () => {
    render(<TransactionList transactions={sampleTransactions} />);

    // Check for "Edit" and "Delete" buttons for each transaction item
    const transactionItems = screen.getAllByRole("listitem");
    transactionItems.forEach(() => {
      expect(
        screen.getByRole("button", { name: /Edit/i, hidden: true }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Delete/i, hidden: true }),
      ).toBeInTheDocument();
    });
  });
});
