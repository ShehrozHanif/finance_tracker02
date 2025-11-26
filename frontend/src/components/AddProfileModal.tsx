'use client';

import React, { useState } from 'react';
import { Profile } from '../utils/api';
import { toast } from 'react-toastify';

interface AddProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileAdded: (profile: Profile) => void;
  addProfile: (profileData: Omit<Profile, 'id'>) => Promise<Profile>;
}

const AddProfileModal: React.FC<AddProfileModalProps> = ({
  isOpen,
  onClose,
  onProfileAdded,
  addProfile,
}) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const newProfile = await addProfile({ name: name.trim() });
      toast.success('Profile added successfully!');
      onProfileAdded(newProfile);
      setName('');
      onClose();
    } catch (error) {
      console.error('Error adding profile:', error);
      toast.error((error as Error).message || 'Failed to add profile. Please try again.');
      setError((error as Error).message || 'Failed to add profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setName('');
      setError('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Person</h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border px-3 py-2"
              placeholder="Enter person's name"
              disabled={isSubmitting}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Person'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfileModal;

