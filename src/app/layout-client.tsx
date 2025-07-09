"use client";
import { SettingsConsumer } from "./context/settings/settings-consumer";
import { SettingsProvider } from "./context/settings/settings-provider";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SettingsProvider>
            <SettingsConsumer>
                {(settings) => {
                    if (!settings.isInitialized) {
                        return <div>Loading...</div>
                    }

                    return (
                        <>
                            <Header />
                            {children}
                        </>
                    )
                }}
            </SettingsConsumer>
        </SettingsProvider>
    );
} 