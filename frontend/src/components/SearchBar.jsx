import React from 'react';
const SearchBar = ({ value, onChange, placeholder = "Search hackathons..." }) => (
    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 shadow-sm">
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none px-2 py-1 text-gray-800 dark:text-gray-100"
        />
        <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    </div>
);

export default SearchBar;
