import { render, screen } from "@testing-library/react";
import TotalsCard from "./TotalsCard"; // Assuming TotalsCard will be created here
import { Transaction } from "../utils/api";

describe("TotalsCard", () => {
  const sampleTransactions: Transaction[] = [
    {
      id: "1",
      type: "income",
      category: "Salary",
      amount: 2000.0,
      date: "2023-11-01",
      note: "",
    },
    {
      id: "2",
      type: "expense",
      category: "Food",
      amount: 50.0,
      date: "2023-11-02",
      note: "",
    },
    {
      id: "3",
      type: "expense",
      category: "Transport",
      amount: 30.0,
      date: "2023-11-03",
      note: "",
    },
    {
      id: "4",
      type: "income",
      category: "Bonus",
      amount: 100.0,
      date: "2023-11-04",
      note: "",
    },
  ];

  it("should display correct total income, expenses, and balance", () => {
    render(<TotalsCard transactions={sampleTransactions} />);

    expect(screen.getByText("Total Income:")).toBeInTheDocument();
    expect(screen.getByText("2100.00")).toBeInTheDocument(); // 2000 + 100

    expect(screen.getByText("Total Expenses:")).toBeInTheDocument();
    expect(screen.getByText("80.00")).toBeInTheDocument(); // 50 + 30

    expect(screen.getByText("Balance:")).toBeInTheDocument();
    expect(screen.getByText("2020.00")).toBeInTheDocument(); // 2100 - 80
  });

  it("should display zero totals when no transactions are provided", () => {
    render(<TotalsCard transactions={[]} />);

    expect(screen.getByText("Total Income:")).toBeInTheDocument();
    expect(screen.getByText("0.00")).toBeInTheDocument();

    expect(screen.getByText("Total Expenses:")).toBeInTheDocument();
    expect(screen.getByText("0.00")).toBeInTheDocument();

    expect(screen.getByText("Balance:")).toBeInTheDocument();
    expect(screen.getByText("0.00")).toBeInTheDocument();
  });
});
