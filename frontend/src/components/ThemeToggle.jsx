import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() =>
        localStorage.getItem("theme") === "dark" ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches && !localStorage.getItem("theme"))
    );

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => setDarkMode((v) => !v)}
            aria-label="Toggle Dark Mode"
            title="Toggle Dark/Light mode"
        >
            {darkMode ? (
                <span role="img" aria-label="Dark">🌙</span>
            ) : (
                <span role="img" aria-label="Light">☀️</span>
            )}
        </button>
    );
};

export default ThemeToggle;
