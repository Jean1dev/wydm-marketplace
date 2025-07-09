import { useState, useEffect } from "react";
import { initialState, SettingsContext } from "./settings-context";

const STORAGE_KEY = 'settings.wydm.marketplace';

const restoreSettings = () => {
    let value = null;

    try {
        const restored = window.localStorage.getItem(STORAGE_KEY);

        if (restored) {
            value = JSON.parse(restored);
        }
    } catch (err) {
        console.error(err);
    }

    return value;
};



const storeSettings = (value: Record<string, unknown>) => {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (err) {
        console.error(err);
    }
};

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState(initialState);

    useEffect(() => {
        const restored = restoreSettings();
        if (restored) {
            setSettings(restored);
            return
        }

        setSettings(prev => ({ ...prev, isInitialized: true }))
    }, []);

    const handleUpdate = (update: Record<string, unknown>) => {
        const newSettings = { ...settings, ...update };
        setSettings(newSettings);
        storeSettings(newSettings);
    };

    return (
        <SettingsContext.Provider value={{ ...settings, handleUpdate }}>
            {children}
        </SettingsContext.Provider>
      );
}