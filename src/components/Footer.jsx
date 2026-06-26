import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
    return (
        <footer className="quest-footer">
            <div className="container">
                <div className="row gy-4 align-items-start">
                    <div className="col-12 col-lg-5">
                        <Link to="/" className="footer-brand">
                            <img
                                src="/img/jason_logo.png"
                                alt="JSON's Quest"
                                className="footer-logo"
                            />

                            <div>
                                <span className="footer-brand-title">JSON&apos;s Quest</span>
                                <p className="footer-tagline">
                                    Prodotti per la Missione Quotidiana
                                </p>
                            </div>
                        </Link>

                        <p className="footer-description">
                            Un catalogo fantasy per avventurieri e cercatori di artefatti
                            utili nelle sfide di ogni giorno.
                        </p>
                    </div>

                    <div className="col-4 col-lg-2">
                        <div className="footer-column">
                            <h5 className="footer-title">Navigazione</h5>

                            <ul className="footer-list">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/products">Catalogo</Link></li>
                                <li><Link to="/chi-siamo">Chi siamo</Link></li>
                                <li><Link to="/preferiti">Preferiti</Link></li>
                                <li><Link to="/cart">Inventario</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-4 col-lg-2">
                        <div className="footer-column">
                            <h5 className="footer-title">Categorie</h5>

                            <ul className="footer-list">
                                <li><Link to="/products?category=armi">Armi</Link></li>
                                <li><Link to="/products?category=accessori">Accessori</Link></li>
                                <li><Link to="/products?category=equipaggiamento">Equipaggiamento</Link></li>
                                <li><Link to="/products?category=consumabili">Consumabili</Link></li>
                                <li><Link to="/products?category=libri">Libri</Link></li>
                                <li><Link to="/products?category=reliquie">Reliquie</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-4 col-lg-3">
                        <div className="footer-column">
                            <h5 className="footer-title">Scopri</h5>

                            <ul className="footer-list">
                                <li><Link to="/products?category=ultimi-arrivi">Ultimi arrivi</Link></li>
                                <li><Link to="/products?category=sconti-del-mercante">Sconti del mercante</Link></li>
                                <li><Link to="/products?category=imperdibili">Imperdibili</Link></li>
                                <li><Link to="/products?category=idea-regalo">Idea regalo</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} JSON&apos;s Quest.
                    </p>

                    <p className="footer-slogan">
                        L&apos;equipaggiamento giusto per ogni missione quotidiana.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;