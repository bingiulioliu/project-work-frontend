import { NavLink } from "react-router";
import useTheme from "../../hooks/useTheme";
import "./header.css";

function Header() {
    const { theme, toggleTheme } = useTheme();
    return (
        <header className="container-header">
            <nav className="navbar navbar-expand-lg">
                <div className="container d-flex flex-column align-items-center">

                    <div className="text-center my-2">
                        <NavLink className="navbar-brand brand m-0" to="/">
                            JSON'S QUEST
                        </NavLink>
                        <p className="tagline">i nostri prodotti per la Missione Quotidiana</p>
                    </div>
                    <button
                        className="navbar-toggler quest-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                        aria-controls="mainNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse w-100" id="mainNav">
                        <ul className="navbar-nav mx-auto align-items-center nav-links">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/chi-siamo">Chi Siamo</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/catalogo">Catalogo</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/carrello">Carrello 🛒</NavLink>
                            </li>
                            <li className="nav-item ms-lg-4 mt-3 mt-lg-0">
                                <button
                                    className="btn-theme-ritual"
                                    onClick={toggleTheme}
                                    aria-label="Cambia atmosfera"
                                >
                                    {theme === 'light' ? '🌙' : '☀️'}
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
