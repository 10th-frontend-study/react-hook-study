import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

const Header = () => {
    const { isDart } = useContext(ThemeContext);
    const user = useContext(UserContext);
    return (
        <header
            className="header"
            style={{
                backgroundColor : isDart ? 'black' : 'lightgray',
                color : isDart ? 'white' : 'black'
            }}
        >

            <h1>Welcome {user}!</h1>
        </header>
    );
}

export default Header;