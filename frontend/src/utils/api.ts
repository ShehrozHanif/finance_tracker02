import { saveTransactionsToLocalStorage, loadTransactionsFromLocalStorage, saveProfilesToLocalStorage, loadProfilesFromLocalStorage } from './localStorage';
import { v4 as uuidv4 } from 'uuid'; // For generating IDs in local-only mode

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const IS_LOCAL_ONLY = !API_BASE_URL;

export interface Profile {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  user_id: string; // Profile ID that this transaction belongs to
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string; // YYYY-MM-DD
  note?: string;
}

// Profile API functions
export async function addProfile(profileData: Omit<Profile, 'id'>): Promise<Profile> {
  if (IS_LOCAL_ONLY) {
    let profiles = loadProfilesFromLocalStorage();
    const newProfile: Profile = { ...profileData, id: uuidv4() };
    profiles.push(newProfile);
    saveProfilesToLocalStorage(profiles);
    return newProfile;
  } else {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      // If API call fails, fall back to local storage
      console.warn('API unavailable, saving profile to local storage:', error);
      let profiles = loadProfilesFromLocalStorage();
      const newProfile: Profile = { ...profileData, id: uuidv4() };
      profiles.push(newProfile);
      saveProfilesToLocalStorage(profiles);
      return newProfile;
    }
  }
}

export async function getProfiles(): Promise<Profile[]> {
  if (IS_LOCAL_ONLY) {
    return loadProfilesFromLocalStorage();
  } else {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profiles`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      // If API call fails, fall back to local storage
      console.warn('API unavailable, loading profiles from local storage:', error);
      return loadProfilesFromLocalStorage();
    }
  }
}

export async function addTransaction(transactionData: Omit<Transaction, 'id' | 'user_id'>, userId: string): Promise<Transaction> {
  const transactionWithUserId = { ...transactionData, user_id: userId };
  
  if (IS_LOCAL_ONLY) {
    let transactions = loadTransactionsFromLocalStorage();
    const newTransaction: Transaction = { ...transactionWithUserId, id: uuidv4() };
    transactions.push(newTransaction);
    saveTransactionsToLocalStorage(transactions);
    return newTransaction;
  } else {
    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionWithUserId),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result; // Backend returns Transaction directly
    } catch (error) {
      // If API call fails, fall back to local storage
      console.warn('API unavailable, saving to local storage:', error);
      let transactions = loadTransactionsFromLocalStorage();
      const newTransaction: Transaction = { ...transactionWithUserId, id: uuidv4() };
      transactions.push(newTransaction);
      saveTransactionsToLocalStorage(transactions);
      return newTransaction;
    }
  }
}

export async function getTransactions(userId: string, filters?: { category?: string; startDate?: string; endDate?: string; }): Promise<Transaction[]> {
  if (IS_LOCAL_ONLY) {
    // eslint-disable-next-line prefer-const
    let transactions = loadTransactionsFromLocalStorage();
    // Filter by user_id first
    transactions = transactions.filter(t => t.user_id === userId);
    if (filters?.category) {
      transactions = transactions.filter(t => t.category.toLowerCase().includes(filters.category!.toLowerCase()));
    }
    if (filters?.startDate) {
      transactions = transactions.filter(t => t.date >= filters.startDate!);
    }
    if (filters?.endDate) {
      transactions = transactions.filter(t => t.date <= filters.endDate!);
    }
    transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, latest first
    return transactions;
  } else {
    try {
      const query = new URLSearchParams();
      query.append('user_id', userId); // user_id is required
      if (filters?.category) query.append('category', filters.category);
      if (filters?.startDate) query.append('start_date', filters.startDate);
      if (filters?.endDate) query.append('end_date', filters.endDate);

      const response = await fetch(`${API_BASE_URL}/api/transactions?${query.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result; // Backend directly returns list of transactions
    } catch (error) {
      // If API call fails (network error, backend down, etc.), fall back to local storage
      console.warn('API unavailable, falling back to local storage:', error);
      let transactions = loadTransactionsFromLocalStorage();
      // Filter by user_id first
      transactions = transactions.filter(t => t.user_id === userId);
      if (filters?.category) {
        transactions = transactions.filter(t => t.category.toLowerCase().includes(filters.category!.toLowerCase()));
      }
      if (filters?.startDate) {
        transactions = transactions.filter(t => t.date >= filters.startDate!);
      }
      if (filters?.endDate) {
        transactions = transactions.filter(t => t.date <= filters.endDate!);
      }
      transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return transactions;
    }
  }
}

export async function updateTransaction(transactionData: Transaction): Promise<Transaction> {
  if (IS_LOCAL_ONLY) {
    // eslint-disable-next-line prefer-const
    let transactions = loadTransactionsFromLocalStorage();
    const index = transactions.findIndex(t => t.id === transactionData.id);
    if (index !== -1) {
      transactions[index] = transactionData;
      saveTransactionsToLocalStorage(transactions);
      return transactionData;
    } else {
      throw new Error('Transaction not found in local storage');
    }
  } else {
    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions/${transactionData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result; // Backend returns Transaction directly
    } catch (error) {
      // If API call fails, fall back to local storage
      console.warn('API unavailable, updating in local storage:', error);
      let transactions = loadTransactionsFromLocalStorage();
      const index = transactions.findIndex(t => t.id === transactionData.id);
      if (index !== -1) {
        transactions[index] = transactionData;
        saveTransactionsToLocalStorage(transactions);
        return transactionData;
      } else {
        throw new Error('Transaction not found');
      }
    }
  }
}

export async function deleteTransaction(transactionId: string): Promise<{ message: string }> {
  if (IS_LOCAL_ONLY) {
    let transactions = loadTransactionsFromLocalStorage();
    const initialLength = transactions.length;
    transactions = transactions.filter(t => t.id !== transactionId);
    if (transactions.length < initialLength) {
      saveTransactionsToLocalStorage(transactions);
      return { message: "Transaction deleted successfully from local storage" };
    } else {
      throw new Error('Transaction not found in local storage');
    }
  } else {
    try {
      const response = await fetch(`${API_BASE_URL}/api/transactions/${transactionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result; // Backend returns { message: "..." }
    } catch (error) {
      // If API call fails, fall back to local storage
      console.warn('API unavailable, deleting from local storage:', error);
      let transactions = loadTransactionsFromLocalStorage();
      const initialLength = transactions.length;
      transactions = transactions.filter(t => t.id !== transactionId);
      if (transactions.length < initialLength) {
        saveTransactionsToLocalStorage(transactions);
        return { message: "Transaction deleted successfully from local storage" };
      } else {
        throw new Error('Transaction not found');
      }
    }
  }
}
