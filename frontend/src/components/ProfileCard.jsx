import React from "react";

const ProfileCard = ({
    name,
    avatarUrl,
    tagline,
    badges = [],
    hackathons = 0,
    github,
    linkedin,
}) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center gap-2">
        <img
            src={avatarUrl}
            alt={name}
            className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-gray-500 text-sm">{tagline}</p>
        <div className="flex gap-1 mt-2">
            {badges.map(badge => (
                <span key={badge} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                    {badge}
                </span>
            ))}
        </div>
        <div className="flex mt-3 gap-4">
            {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" title="GitHub">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6" />
                </a>
            )}
            {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-6 h-6" />
                </a>
            )}
        </div>
        <span className="mt-3 text-sm text-blue-700">{hackathons} hackathons</span>
    </div>
);

export default ProfileCard;
