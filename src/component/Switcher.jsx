import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../hooks/useDarkSide";
 
export default function Switcher() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
 
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };
 
    return (
        <>
            <DarkModeSwitch
            className="bg-red-600"
                style={{ padding: "10", borderRadius: "30%", backgroundColor: localStorage.getItem('Tema') }}
                moonColor="#ffffff"
                sunColor="#FFFFFF"
                checked={darkSide}
                onChange={toggleDarkMode}
                size={40}
            />
        </>
    );
}