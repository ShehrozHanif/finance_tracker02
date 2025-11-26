import React, { useMemo } from "react";
import { Transaction } from "../utils/api"; // Re-use the Transaction interface
import { format } from "date-fns";

interface TransactionListProps {
  transactions: Transaction[]; // Transactions to display
  filter?: {
    category?: string;
    startDate?: string;
    endDate?: string;
  };
  onEdit?: (transaction: Transaction) => void; // Callback for edit button
  onDelete?: (transactionId: string) => void; // Callback for delete button
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  filter,
  onEdit,
  onDelete,
}) => {
  const filteredTransactions = useMemo(() => {
    let tempTransactions = transactions;

    if (filter?.category) {
      tempTransactions = tempTransactions.filter((t) =>
        t.category.toLowerCase().includes(filter.category!.toLowerCase()),
      );
    }
    if (filter?.startDate) {
      tempTransactions = tempTransactions.filter(
        (t) => t.date >= filter.startDate!,
      );
    }
    if (filter?.endDate) {
      tempTransactions = tempTransactions.filter(
        (t) => t.date <= filter.endDate!,
      );
    }
    return tempTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [transactions, filter]); // Dependencies for memoization

  if (filteredTransactions.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">No transactions found.</p>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md mt-4">
      <ul className="divide-y divide-gray-200">
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-indigo-600 truncate">
                {transaction.category} ({transaction.type})
              </div>
              <div className="ml-2 flex-shrink-0 flex items-center space-x-2">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  ${transaction.amount.toFixed(2)}
                </span>
                {onEdit && (
                  <button
                    onClick={() => onEdit(transaction)}
                    className="inline-flex items-center justify-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-xs min-w-[44px] min-h-[44px]"
                    aria-label="Edit"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="inline-flex items-center justify-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-xs min-w-[44px] min-h-[44px]"
                    aria-label="Delete"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  {format(new Date(transaction.date), "MMM d, yyyy")}
                </p>
                {transaction.note && (
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    {transaction.note}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;

