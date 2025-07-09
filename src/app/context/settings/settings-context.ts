import { createContext } from 'react';

export const defaultSettings = {
  theme: 'light',
}

export const initialState = {
  ...defaultSettings,
  isInitialized: false,
  handleUpdate: (_: any) => {},
}

export const SettingsContext = createContext(initialState);