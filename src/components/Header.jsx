import { NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme";

function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
                <div className="container">
                    <NavLink className="navbar-brand fw-semibold" to="/">
                        JSON&apos;s Quest
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Piazza
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">
                                    Zaino
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/missions">
                                    Missioni
                                </NavLink>
                            </li>

                            <li className="nav-item ms-2">
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={toggleTheme}
                                    aria-label="Cambia tema"
                                >
                                    {theme === "light" ? "🌙" : "☀️"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
