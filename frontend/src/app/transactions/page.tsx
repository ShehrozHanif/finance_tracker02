'use client';

import React, { useState, useEffect, useCallback } from 'react';
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';
import TotalsCard from '../../components/TotalsCard';
import Charts from '../../components/Charts';
import ProfileSelector from '../../components/ProfileSelector';
import AddProfileModal from '../../components/AddProfileModal';
import {
  Transaction,
  Profile,
  deleteTransaction,
  getTransactions,
  getProfiles,
  addProfile,
} from '../../utils/api';
import {
  saveSelectedProfileId,
  loadSelectedProfileId,
} from '../../utils/localStorage';
import { toast } from 'react-toastify';

interface Filter {
  category?: string;
  startDate?: string;
  endDate?: string;
}

const TransactionsPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<Filter>({});
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Load profiles on mount
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const loadedProfiles = await getProfiles();
        setProfiles(loadedProfiles);
        
        // Load selected profile from localStorage
        const savedProfileId = loadSelectedProfileId();
        if (savedProfileId && loadedProfiles.some(p => p.id === savedProfileId)) {
          setSelectedProfileId(savedProfileId);
        } else if (loadedProfiles.length > 0) {
          // Auto-select first profile if available
          setSelectedProfileId(loadedProfiles[0].id);
          saveSelectedProfileId(loadedProfiles[0].id);
        }
      } catch (error) {
        console.error('Error loading profiles:', error);
        toast.error('Failed to load profiles.');
      }
    };
    loadProfiles();
  }, []);

  const fetchTransactions = useCallback(async () => {
    if (!selectedProfileId) {
      setTransactions([]);
      return;
    }

    try {
      const data = await getTransactions(selectedProfileId, {
        category: filter.category,
        startDate: filter.startDate,
        endDate: filter.endDate,
      });
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions.');
    }
  }, [selectedProfileId, filter]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleProfileChange = (profileId: string) => {
    setSelectedProfileId(profileId);
    saveSelectedProfileId(profileId);
    setEditingTransaction(null); // Clear editing when switching profiles
  };

  const handleProfileAdded = (newProfile: Profile) => {
    setProfiles([...profiles, newProfile]);
    setSelectedProfileId(newProfile.id);
    saveSelectedProfileId(newProfile.id);
    setIsAddProfileModalOpen(false);
  };



  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await deleteTransaction(transactionId);
      toast.success('Transaction deleted successfully!');
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error((error as Error).message || 'Failed to delete transaction.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Transactions</h1>

      <ProfileSelector
        profiles={profiles}
        selectedProfileId={selectedProfileId}
        onProfileChange={handleProfileChange}
        onAddProfileClick={() => setIsAddProfileModalOpen(true)}
      />

      <AddProfileModal
        isOpen={isAddProfileModalOpen}
        onClose={() => setIsAddProfileModalOpen(false)}
        onProfileAdded={handleProfileAdded}
        addProfile={addProfile}
      />

      {selectedProfileId ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
              <TransactionForm
                key={editingTransaction?.id || 'new'} // Add key prop to force re-mount
                onSuccess={() => {
                  fetchTransactions();
                  setEditingTransaction(null); // Clear editing state after successful update/add
                }}
                initialData={editingTransaction || undefined}
                userId={selectedProfileId}
              />
            </div>

            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Transactions</h2>
              <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Filter by category"
                  className="flex-1 p-2 border rounded-md"
                  onChange={(e) => handleFilterChange({ ...filter, category: e.target.value })}
                />
                <input
                  type="date"
                  className="p-2 border rounded-md"
                  onChange={(e) => handleFilterChange({ ...filter, startDate: e.target.value })}
                />
                <input
                  type="date"
                  className="p-2 border rounded-md"
                  onChange={(e) => handleFilterChange({ ...filter, endDate: e.target.value })}
                />
              </div>
              <TransactionList
                transactions={transactions}
                filter={filter}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <TotalsCard transactions={transactions} />
            <Charts transactions={transactions} />
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">Please select or add a person to view transactions</p>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
