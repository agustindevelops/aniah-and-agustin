import { useContext, createContext } from "react";

export const defaultTheme = {
  season: "christmas",
  colors: { accent: "blue-100", border: "blue-200" },
};

const ThemeContext = createContext(defaultTheme);

export const ThemeProvider = ({ children, theme = defaultTheme }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
