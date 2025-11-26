import React, { useState } from 'react';
import { addTransaction, updateTransaction, Transaction } from '../utils/api'; // Import updateTransaction
import { toast } from 'react-toastify'; // Import toast

interface TransactionFormProps {
  onSuccess: () => void; // Add an onSuccess prop to trigger UI updates
  initialData?: Transaction; // Can be a full Transaction (for editing) or undefined (for new)
  userId: string | null; // Current selected user ID
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSuccess, initialData, userId }) => {
  // Initialize state directly from initialData or defaults
  const [type, setType] = useState<'income' | 'expense'>(initialData?.type || 'expense');
  const [category, setCategory] = useState(initialData?.category || '');
  const [amount, setAmount] = useState(initialData?.amount || 0);
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState(initialData?.note || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (amount <= 0) newErrors.amount = 'Amount must be positive';
    if (!category) newErrors.category = 'Category is required';
    if (!type) newErrors.type = 'Type is required';
    if (!date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!userId) {
      toast.error('Please select a person first');
      return;
    }

    const newTransactionData = { type, category, amount, date, note };

    try {
      // Call the API to add/update the transaction
      if (initialData && initialData.id) { // If initialData has an ID, it's an update
        await updateTransaction({ ...newTransactionData, id: initialData.id, user_id: userId });
        toast.success('Transaction updated successfully!');
      } else {
        await addTransaction(newTransactionData, userId);
        toast.success('Transaction added successfully!');
      }
      onSuccess(); // Notify parent component of success
      // Clear form after successful submission if it's a new transaction
      if (!initialData) {
        setCategory('');
        setAmount(0);
        setNote('');
        setDate(new Date().toISOString().split('T')[0]);
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
      toast.error((error as Error).message || 'Failed to submit transaction. Please try again.');
    }
  };

  if (!userId) {
    return (
      <div className="p-4 space-y-4 bg-white shadow rounded-lg">
        <p className="text-gray-500 text-center">Please select a person to add transactions</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white shadow rounded-lg">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="e.g., Food, Transport, Salary"
        />
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="0.00"
        />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note (optional)</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          placeholder="Optional notes about the transaction"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm;