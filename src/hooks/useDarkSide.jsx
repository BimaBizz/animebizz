import { useState, useEffect } from "react";
 
export default function useDarkSide() {
    const [theme, setTheme] = useState(localStorage.DarkMode);
    const colorTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("DarkMode", theme);
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        if (localStorage.theme == "dark")
            localStorage.removeItem("DarkMode");
        else localStorage.setItem("DarkMode", theme);
    }, [theme, colorTheme]);
 
    return [colorTheme, setTheme];
}