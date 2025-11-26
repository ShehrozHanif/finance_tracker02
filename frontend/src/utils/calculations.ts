import { Transaction } from "./api";

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categorySpending: { [category: string]: number };
}

export function calculateFinancialSummary(
  transactions: Transaction[],
): FinancialSummary {
  let totalIncome = 0;
  let totalExpenses = 0;
  const categorySpending: { [category: string]: number } = {};

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
      categorySpending[transaction.category] =
        (categorySpending[transaction.category] || 0) + transaction.amount;
    }
  });

  const balance = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, balance, categorySpending };
}

export interface MonthlySpending {
  month: string; // YYYY-MM
  expenses: number;
}

export function calculateMonthlySpending(
  transactions: Transaction[],
): MonthlySpending[] {
  const monthlyData: { [month: string]: number } = {};

  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      const month = transaction.date.substring(0, 7); // YYYY-MM
      monthlyData[month] = (monthlyData[month] || 0) + transaction.amount;
    }
  });

  const result: MonthlySpending[] = Object.entries(monthlyData)
    .map(([month, expenses]) => ({ month, expenses }))
    .sort((a, b) => a.month.localeCompare(b.month)); // Sort by month

  return result;
}
