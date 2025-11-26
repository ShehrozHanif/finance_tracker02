import React from "react";
import { Transaction } from "../utils/api";
import { calculateFinancialSummary } from "../utils/calculations";

interface TotalsCardProps {
  transactions: Transaction[];
}

const TotalsCard: React.FC<TotalsCardProps> = ({ transactions }) => {
  const { totalIncome, totalExpenses, balance } =
    calculateFinancialSummary(transactions);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Financial Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center p-3 border rounded-md">
          <p className="text-sm font-medium text-gray-500">Total Income:</p>
          <p className="text-lg font-bold text-green-600">
            ${totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-3 border rounded-md">
          <p className="text-sm font-medium text-gray-500">Total Expenses:</p>
          <p className="text-lg font-bold text-red-600">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-3 border rounded-md">
          <p className="text-sm font-medium text-gray-500">Balance:</p>
          <p className="text-lg font-bold text-blue-600">
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalsCard;
