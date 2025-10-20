import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/Logo.png";
import "./Logo.css";

function Logo() {
    return (
        <Link to="/" className="logo-link">
            <img src={LogoImg} alt="Logo" className="logo" />
        </Link>
    );
}

export default Logo;
