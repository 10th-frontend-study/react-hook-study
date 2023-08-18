import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () =>{
    const { isDart, setIsDark } = useContext(ThemeContext);
    const toggleTheme = () =>{
        setIsDark(!isDart);
    }
    return(
        <header
        className="footer"
        style={{
            backgroundColor : isDart ? 'black' : 'lightgray',
        }}
    >

        <button className="button" onClick={toggleTheme}>
            Dark Mode
        </button>
    </header>
    );
}

export default Footer;