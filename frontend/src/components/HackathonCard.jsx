import React from "react";

const HackathonCard = ({
    title,
    description,
    date,
    tags,
    onJoin,
    organizer,
    imageUrl,
}) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row mb-8">
        {imageUrl && (
            <img src={imageUrl} alt={title} className="md:w-40 w-full h-40 object-cover" />
        )}
        <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <span className="text-xs text-gray-500">{date}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{description}</p>
            <div className="mb-2 flex flex-wrap gap-2">
                {tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">{tag}</span>
                ))}
            </div>
            <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-gray-500">Organized by: {organizer}</span>
                <button
                    onClick={onJoin}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Join
                </button>
            </div>
        </div>
    </div>
);

export default HackathonCard;
