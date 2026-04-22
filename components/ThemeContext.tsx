import React, { createContext, useContext, useEffect, useState } from 'react';

type AccentColor = 'blue' | 'green' | 'rose' | 'violet' | 'amber';

interface ThemeContextType {
    theme: 'light'; // Forced light mode
    accentColor: AccentColor;
    setAccentColor: (color: AccentColor) => void;
    toggleTheme: () => void; // Dummy
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accentColor, setAccentColorState] = useState<AccentColor>('blue');
    const theme = 'light';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('dark');
        root.classList.add('light');
        localStorage.setItem('theme', 'light');

        const savedAccent = localStorage.getItem('accentColor') as AccentColor;
        if (savedAccent && ['blue', 'green', 'rose', 'violet', 'amber'].includes(savedAccent)) {
            setAccentColorState(savedAccent);
            root.setAttribute('data-accent', savedAccent);
        } else {
            root.setAttribute('data-accent', 'blue');
        }
    }, []);

    const setAccentColor = (color: AccentColor) => {
        setAccentColorState(color);
        localStorage.setItem('accentColor', color);
        window.document.documentElement.setAttribute('data-accent', color);
    };

    const toggleTheme = () => { }; // Keep dummy function so other components don't break

    return (
        <ThemeContext.Provider value={{ theme, accentColor, setAccentColor, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
