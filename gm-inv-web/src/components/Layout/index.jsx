import React from "react";
import Navbar from '../Navbar';

export const Layout = (props) => {
    return (
        //For navbar
        <div>
            <div>{props.children}</div>
            <Navbar />
        </div>
    );
};

export default Layout;
