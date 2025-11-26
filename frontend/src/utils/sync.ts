import { Transaction, addTransaction } from './api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { saveTransactionsToLocalStorage, loadTransactionsFromLocalStorage, clearTransactionsFromLocalStorage } from './localStorage';
import { toast } from 'react-toastify';

const OFFLINE_TRANSACTIONS_KEY = 'offlineTransactions';

// Function to save transactions when offline
export function saveOfflineTransaction(transactionData: Omit<Transaction, 'id'>): void {
  const offlineTransactions = JSON.parse(localStorage.getItem(OFFLINE_TRANSACTIONS_KEY) || '[]');
  offlineTransactions.push(transactionData);
  localStorage.setItem(OFFLINE_TRANSACTIONS_KEY, JSON.stringify(offlineTransactions));
  toast.info('Transaction saved offline.');
}

// Function to sync transactions when online
export async function syncOfflineTransactions(): Promise<void> {
  if (navigator.onLine) {
    const offlineTransactions: Omit<Transaction, 'id'>[] = JSON.parse(localStorage.getItem(OFFLINE_TRANSACTIONS_KEY) || '[]');

    if (offlineTransactions.length > 0) {
      toast.info(`Syncing ${offlineTransactions.length} offline transactions...`);
      for (const transaction of offlineTransactions) {
        try {
          await addTransaction(transaction); // Use the existing addTransaction API function
        } catch (error) {
          console.error('Error syncing offline transaction:', transaction, error);
          toast.error(`Failed to sync some transactions. Error: ${(error as Error).message}`);
          // Decide whether to keep failed transactions in local storage or retry later
        }
      }
      clearTransactionsFromLocalStorage(); // Clear all synced transactions
      localStorage.removeItem(OFFLINE_TRANSACTIONS_KEY); // Clear offline transactions queue
      toast.success('Offline transactions synced successfully!');
    }
  }
}

// Listen for online/offline status changes
export function initializeOfflineSync(): void {
  window.addEventListener('online', syncOfflineTransactions);
  // Initial sync attempt if already online
  syncOfflineTransactions();
}

export function cleanupOfflineSync(): void {
  window.removeEventListener('online', syncOfflineTransactions);
}