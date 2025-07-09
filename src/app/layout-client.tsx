"use client";
import { SettingsConsumer } from "./context/settings/settings-consumer";
import { SettingsProvider } from "./context/settings/settings-provider";
import { ThemeProvider, Theme } from "./ThemeProvider";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SettingsProvider>
            <SettingsConsumer>
                {(settings) => {
                    if (!settings.isInitialized) {
                        return <div>Loading...</div>
                    }
                    console.log("settings", settings);
                    return (
                        <ThemeProvider theme={settings.theme as Theme}>
                            <Header />
                            {children}
                        </ThemeProvider>
                    )
                }}
            </SettingsConsumer>
        </SettingsProvider>
    );
} 