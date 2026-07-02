import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <main className="not-found-page">
            <section className="container">
                <div className="not-found-card">
                    <div className="not-found-inner text-center">

                        <p className="not-found-kicker">Quest interrotta</p>

                        <div className="not-found-image-wrapper">
                            <img
                                src="img/not-found.png"
                                alt="404 - Goblin non trovato"
                                className="not-found-img"
                            />
                        </div>

                        <p>
                            Sembra che tu abbia imboccato un sentiero inesplorato.
                            Questa rotta non esiste nella mappa della Gilda.
                        </p>

                        <div className="not-found-actions">
                            <Link to="/" className="not-found-button primary">
                                Torna alla piazza
                            </Link>

                            <Link to="/products" className="not-found-button secondary">
                                Esplora catalogo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default NotFound;