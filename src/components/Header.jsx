import { NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";
import "./header.css";

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="container-header">
            <nav className="navbar navbar-expand-lg quest-navbar">
                <div className="container-fluid px-4 px-lg-5">
                    <NavLink className="navbar-brand brand" to="/">
                        <img
                            src=""
                            alt="JSON's Quest"
                            className="header-logo"
                        />

                        
                    </NavLink>

                    <button
                        className="navbar-toggler quest-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                        aria-controls="mainNav"
                        aria-expanded="false"
                        aria-label="Apri menu"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav ms-auto align-items-lg-center nav-links">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    to="/"
                                    end
                                >
                                    Piazza
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    to="/chi-siamo"
                                >
                                    Chi siamo
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    to="/products"
                                >
                                    Catalogo
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    to="/carrello"
                                >
                                    Carrello 🛒
                                </NavLink>
                            </li>

                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;