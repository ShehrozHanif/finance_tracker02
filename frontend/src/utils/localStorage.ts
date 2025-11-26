import { Transaction, Profile } from "./api";

const TRANSACTIONS_STORAGE_KEY = "transactions";
const PROFILES_STORAGE_KEY = "profiles";
const SELECTED_PROFILE_KEY = "selectedProfileId";

// Transaction storage functions
export function saveTransactionsToLocalStorage(
  transactions: Transaction[],
): void {
  try {
    const serializedTransactions = JSON.stringify(transactions);
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, serializedTransactions);
  } catch (error) {
    console.error("Error saving transactions to local storage:", error);
  }
}

export function loadTransactionsFromLocalStorage(): Transaction[] {
  try {
    const serializedTransactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (serializedTransactions === null) {
      return [];
    }
    return JSON.parse(serializedTransactions);
  } catch (error) {
    console.error("Error loading transactions from local storage:", error);
    return [];
  }
}

export function clearTransactionsFromLocalStorage(): void {
  try {
    localStorage.removeItem(TRANSACTIONS_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing transactions from local storage:", error);
  }
}

// Profile storage functions
export function saveProfilesToLocalStorage(profiles: Profile[]): void {
  try {
    const serializedProfiles = JSON.stringify(profiles);
    localStorage.setItem(PROFILES_STORAGE_KEY, serializedProfiles);
  } catch (error) {
    console.error("Error saving profiles to local storage:", error);
  }
}

export function loadProfilesFromLocalStorage(): Profile[] {
  try {
    const serializedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (serializedProfiles === null) {
      return [];
    }
    return JSON.parse(serializedProfiles);
  } catch (error) {
    console.error("Error loading profiles from local storage:", error);
    return [];
  }
}

export function clearProfilesFromLocalStorage(): void {
  try {
    localStorage.removeItem(PROFILES_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing profiles from local storage:", error);
  }
}

// Selected profile storage functions
export function saveSelectedProfileId(profileId: string): void {
  try {
    localStorage.setItem(SELECTED_PROFILE_KEY, profileId);
  } catch (error) {
    console.error("Error saving selected profile ID:", error);
  }
}

export function loadSelectedProfileId(): string | null {
  try {
    return localStorage.getItem(SELECTED_PROFILE_KEY);
  } catch (error) {
    console.error("Error loading selected profile ID:", error);
    return null;
  }
}

export function clearSelectedProfileId(): void {
  try {
    localStorage.removeItem(SELECTED_PROFILE_KEY);
  } catch (error) {
    console.error("Error clearing selected profile ID:", error);
  }
}
