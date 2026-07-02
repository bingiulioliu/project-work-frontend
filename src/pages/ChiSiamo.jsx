import { Link } from "react-router-dom";
import "./ChiSiamo.css";

function ChiSiamo() {
    return (
        <main className="about-page">
            <section className="container">
                <div className="about-hero text-center">
                    <p className="about-kicker">La Gilda di JSON&apos;s Quest</p>

                    <h1>Chi siamo</h1>

                    <p className="about-intro mx-auto">
                        JSON&apos;s Quest nasce come marketplace fantasy per avventurieri
                        moderni: un luogo dove ogni prodotto non è solo un oggetto,
                        ma un artefatto scelto per affrontare meglio le missioni
                        quotidiane.
                    </p>
                </div>

                <section className="about-card">
                    <div className="about-card-inner">
                        <div className="row g-5 align-items-center">
                            <div className="col-12 col-lg-6">
                                <div className="about-scroll">
                                    <p className="about-scroll-label">Pergamena della gilda</p>

                                    <h2>La nostra missione</h2>

                                    <p>
                                        Abbiamo trasformato l&apos;idea classica di e-commerce
                                        in un&apos;esperienza ispirata ai giochi di ruolo:
                                        esplorazione, rarità, inventario, preferiti e
                                        scoperta guidano l&apos;utente nella scelta.
                                    </p>

                                    <p>
                                        Il nostro obiettivo è rendere la navigazione più
                                        coinvolgente, chiara e memorabile, mantenendo però una
                                        struttura semplice da usare: emporio, dettaglio prodotto,
                                        preferiti e carrello.
                                    </p>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <div className="about-values">
                                    <div className="about-value">
                                        <span>⚔️</span>
                                        <div>
                                            <h3>Esperienza immersiva</h3>
                                            <p>
                                                Ogni sezione usa un linguaggio visivo coerente con il
                                                tema fantasy/RPG.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="about-value">
                                        <span>🛡️</span>
                                        <div>
                                            <h3>Usabilità prima di tutto</h3>
                                            <p>
                                                Il sito resta chiaro, navigabile e comprensibile anche
                                                con uno stile molto caratterizzato.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="about-value">
                                        <span>✨</span>
                                        <div>
                                            <h3>Prodotti come artefatti</h3>
                                            <p>
                                                Rarità, immagini, preferiti e dettagli aiutano a dare
                                                personalità al emporio.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-team">
                    <div className="about-section-heading text-center">
                        <p className="about-kicker">La squadra della gilda</p>
                        <h2>Gli artefici della quest</h2>
                        <div className="team-image-container my-4">
                            <img
                                src="img/team-goblin.png"
                                alt="Il team di JSON's Quest"
                                className="team-photo"
                            />
                        </div>
                    </div>

                    <div className="row g-4">
                        <div className="col-12 col-md-6 col-lg">
                            <article className="about-member-card">
                                <span className="about-member-icon">🧙‍♀️</span>
                                <h3>La Maga del Frontend</h3>
                                <p>
                                    Cura l&apos;interfaccia, l&apos;atmosfera visiva e la resa delle
                                    pagine, trasformando il emporio in un vero mercato fantasy.
                                </p>
                            </article>
                        </div>

                        <div className="col-12 col-md-6 col-lg">
                            <article className="about-member-card">
                                <span className="about-member-icon">⚒️</span>
                                <h3>Il Fabbro del Backend</h3>
                                <p>
                                    Forgia API, rotte e logiche di recupero dati, assicurando che
                                    ogni artefatto arrivi correttamente dal database alla pagina.
                                </p>
                            </article>
                        </div>

                        <div className="col-12 col-md-6 col-lg">
                            <article className="about-member-card">
                                <span className="about-member-icon">📜</span>
                                <h3>Il Custode dell'Emporio</h3>
                                <p>
                                    Organizza prodotti, categorie, rarità e descrizioni, dando a
                                    ogni oggetto un ruolo chiaro dentro l&apos;inventario della gilda.
                                </p>
                            </article>
                        </div>

                        <div className="col-12 col-md-6 col-lg">
                            <article className="about-member-card">
                                <span className="about-member-icon">🛡️</span>
                                <h3>Il Guardiano della UX</h3>
                                <p>
                                    Controlla che l&apos;esperienza resti semplice, leggibile e
                                    piacevole anche con uno stile ricco, immersivo e caratterizzato.
                                </p>
                            </article>
                        </div>

                        <div className="col-12 col-md-6 col-lg">
                            <article className="about-member-card">
                                <span className="about-member-icon">✨</span>
                                <h3>L&apos;Incantatrice dei Dettagli</h3>
                                <p>
                                    Rifinisce microinterazioni, preferiti, bottoni e messaggi,
                                    rendendo ogni azione più chiara e coerente con il tono del sito.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="about-cta text-center">
                    <p className="about-kicker">Pronto per la prossima missione?</p>

                    <h2>Esplora l'emporio degli artefatti</h2>

                    <p>
                        Scopri oggetti rari, offerte della gilda e strumenti pensati per
                        accompagnarti nelle tue battaglie quotidiane.
                    </p>

                    <Link to="/products" className="about-cta-button">
                            Vai all'emporio
                    </Link>
                </section>
            </section>
        </main>
    );
}

export default ChiSiamo;
