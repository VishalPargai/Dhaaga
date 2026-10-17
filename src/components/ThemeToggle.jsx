import React from 'react';

export default function ThemeToggle({ isDark, toggleTheme, className = '' }) {
  return (
    <label
      className={`switch ${className}`}
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <span className="slider"></span>
    </label>
  );
}
