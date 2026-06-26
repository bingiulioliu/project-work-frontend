import { NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";
import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";
import "./header.css";

function Header() {
    const { theme, toggleTheme } = useTheme();
    const { totalItems } = useCart();
    const { wishlist } = useWishlist();

    return (
        <header className="container-header">
            <nav className="navbar navbar-expand-lg quest-navbar">
                <div className="container-fluid px-4 px-lg-5">
                    <NavLink className="navbar-brand brand" to="/">
                        <img
                            src="/img/jason_logo.png"
                            alt="JSON's Quest"
                            className="header-logo"
                        />
                        <div className="brand-text d-none d-sm-block">
                            <span className="brand-title">JSON&apos;s Quest</span>
                            <p className="tagline">Prodotti per la missione quotidiana</p>
                        </div>


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
                        <i className="bi bi-list"></i>
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
                                    <i className="bi bi-house-door nav-icon"></i>
                                    <span>Home</span>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    to="/products"
                                >
                                    <i className="bi bi-shop nav-icon"></i>
                                    <span>Catalogo</span>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    to="/chi-siamo"
                                >
                                    <i className="bi bi-people nav-icon"></i>
                                    <span>Chi siamo</span>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link nav-action active" : "nav-link nav-action"
                                    }
                                    to="/preferiti"
                                    aria-label={`Preferiti: ${wishlist.length} elementi`}
                                >
                                    <i className="bi bi-heart nav-icon"></i>
                                    <span>Preferiti</span>

                                    {wishlist.length > 0 && (
                                        <span className="nav-badge">{wishlist.length}</span>
                                    )}
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link nav-action active" : "nav-link nav-action"
                                    }
                                    to="/cart"
                                    aria-label={`Inventario: ${totalItems} elementi`}
                                >
                                    <i className="bi bi-bag nav-icon"></i>
                                    <span>Inventario</span>

                                    {totalItems > 0 && (
                                        <span className="nav-badge">{totalItems}</span>
                                    )}
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