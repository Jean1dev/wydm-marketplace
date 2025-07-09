import { createContext } from 'react';

export const defaultSettings = {
  theme: 'light',
}

type SettingsState = typeof defaultSettings & {
  isInitialized: boolean;
  handleUpdate: (update: Record<string, unknown>) => void;
};

export const initialState: SettingsState = {
  ...defaultSettings,
  isInitialized: false,
  handleUpdate: () => {},
}

export const SettingsContext = createContext<SettingsState>(initialState);