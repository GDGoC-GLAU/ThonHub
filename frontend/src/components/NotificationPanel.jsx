import React from "react";

const NotificationPanel = ({ notifications = [], onClear }) => (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-bold text-gray-800 dark:text-white">Notifications</h4>
            <button
                onClick={onClear}
                className="text-xs text-blue-600 hover:underline"
            >
                Clear All
            </button>
        </div>
        <div className="space-y-2">
            {notifications.length === 0 ? (
                <p className="text-gray-400">No notifications</p>
            ) : (
                notifications.map((n, i) => (
                    <div
                        key={i}
                        className="p-2 bg-blue-50 dark:bg-blue-900 rounded text-xs text-gray-700 dark:text-gray-100"
                    >
                        {n}
                    </div>
                ))
            )}
        </div>
    </div>
);

export default NotificationPanel;
