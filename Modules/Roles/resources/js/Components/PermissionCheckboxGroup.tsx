import React from 'react';
import type { Permission } from '../types';

interface PermissionCheckboxGroupProps {
    permissions: Permission[];
    selectedPermissions: string[];
    onChange: (permissions: string[]) => void;
    error?: string;
}

export default function PermissionCheckboxGroup({
    permissions,
    selectedPermissions,
    onChange,
    error,
}: PermissionCheckboxGroupProps) {
    const handleToggle = (name: string) => {
        if (selectedPermissions.includes(name)) {
            onChange(selectedPermissions.filter((p) => p !== name));
        } else {
            onChange([...selectedPermissions, name]);
        }
    };

    const handleSelectAll = () => {
        onChange(permissions.map((p) => p.name));
    };

    const handleDeselectAll = () => {
        onChange([]);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Permissions ({selectedPermissions.length}/{permissions.length} selected)
                </span>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleSelectAll}
                        className="text-xs text-[#f9322c] hover:underline focus:outline-none"
                    >
                        Select all
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                        type="button"
                        onClick={handleDeselectAll}
                        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                    >
                        Deselect all
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {permissions.map((permission) => {
                    const isChecked = selectedPermissions.includes(permission.name);
                    return (
                        <label
                            key={permission.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer select-none ${
                                isChecked
                                    ? 'border-[#f9322c]/40 bg-[#f9322c]/5 dark:bg-[#f9322c]/10 dark:border-[#f9322c]/50'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggle(permission.name)}
                                className="mt-0.5 rounded border-gray-300 text-[#f9322c] focus:ring-[#f9322c] dark:bg-gray-900 dark:border-gray-700"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                                    {permission.name.replace(/_/g, ' ')}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Guard: {permission.guard_name}
                                </span>
                            </div>
                        </label>
                    );
                })}
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>}
        </div>
    );
}
