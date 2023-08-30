import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";


const Content = () => {
    const { isDart } = useContext(ThemeContext);
    const user = useContext(UserContext);

    return (
        <header
            className="content"
            style={{
                backgroundColor: isDart ? 'black' : 'white',
                color: isDart ? 'white' : 'black'
            }}
        >

            <h1>{user}님, 좋은하루 되세요!</h1>
        </header>
    );
}

export default Content;