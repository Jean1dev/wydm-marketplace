"use client";
import { useTheme } from "./ThemeProvider";
import { useContext } from "react";
import { SettingsContext } from "./context/settings/settings-context";

export default function Header() {
  const { theme } = useTheme();
  const settings = useContext(SettingsContext);
  const handleToggleTheme = () => {
    if (settings && settings.handleUpdate) {
      settings.handleUpdate({ theme: theme === "dark" ? "light" : "dark" });
    }
  };
  return (
    <header className="w-full border-b border-gray-100 dark:border-neutral-800 py-6 px-4 flex items-center justify-between bg-white dark:bg-neutral-900">
      <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100">WYDM</span>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input type="text" placeholder="Search for products..." className="rounded-md border border-gray-200 dark:border-neutral-700 px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-black/10 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-neutral-900" />
          <svg className="absolute right-2 top-2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <button className="text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white" onClick={handleToggleTheme} aria-label="Alternar tema">
          {theme === "dark" ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
          )}
        </button>
        <button className="text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
        </button>
        <button className="text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-13z"/><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></svg>
        </button>
      </div>
    </header>
  );
} 