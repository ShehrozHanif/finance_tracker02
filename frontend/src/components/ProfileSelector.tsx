import React from 'react';
import { Profile } from '../utils/api';

interface ProfileSelectorProps {
  profiles: Profile[];
  selectedProfileId: string | null;
  onProfileChange: (profileId: string) => void;
  onAddProfileClick: () => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  profiles,
  selectedProfileId,
  onProfileChange,
  onAddProfileClick,
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex-1 w-full sm:w-auto">
        <label htmlFor="profile-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Person
        </label>
        <div className="flex gap-2">
          <select
            id="profile-select"
            value={selectedProfileId || ''}
            onChange={(e) => onProfileChange(e.target.value)}
            className="flex-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
            disabled={profiles.length === 0}
          >
            {profiles.length === 0 ? (
              <option value="">No profiles available</option>
            ) : (
              <>
                <option value="">-- Select a person --</option>
                {profiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name}
                  </option>
                ))}
              </>
            )}
          </select>
          <button
            type="button"
            onClick={onAddProfileClick}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
          >
            + Add Person
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;

