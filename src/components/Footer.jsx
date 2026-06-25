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
                                src="img/jason_logo.png"
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
                            Un catalogo fantasy per avventurieri e
                            cercatori di artefatti utili nelle sfide di ogni giorno.
                        </p>
                    </div>

                    <div className="col-6 col-lg-2">
                        <h3 className="footer-title">Navigazione</h3>

                        <ul className="footer-list">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/products">Catalogo</Link>
                            </li>
                            <li>
                                <Link to="/chi-siamo">Chi siamo</Link>
                            </li>
                            <li>
                                <Link to="/preferiti">Preferiti</Link>
                            </li>
                            <li>
                                <Link to="/cart">Inventario</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6 col-lg-2">
                        <h3 className="footer-title">Categorie</h3>

                        <ul className="footer-list">
                            <li>
                                <Link to="/products?page=1&rarity=legendary&sort=updated_at&order=desc">Le nostre rarità</Link>
                            </li>
                            <li>
                                <Link to="/products?page=1&rarity=common&sort=price&order=asc">Gli essenziali</Link>
                            </li>
                            <li>
                                <Link to="/products?page=1&category=equipaggiamento&sort=updated_at&order=desc">Equipaggiamento</Link>
                            </li>
                            <li>
                                <Link to="/products?page=1&category=consumabili&sort=updated_at&order=desc">Consumabili</Link>
                            </li>
                        </ul>
                    </div>
                    
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} JSON&apos;s Quest.
                    </p>

                    <p className="footer-slogan">
                        Le risposte ai tuoi problemi quotidiani, l&apos;equipaggiamento per le tue battaglie.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;