import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="quest-home">
      <section className="quest-hero">
        <div className="container-fluid px-4">
          

          <div className="quest-hero-content text-center">
            <p className="quest-kicker">La piazza del mercato</p>

            <h1 className="quest-title">
              Benvenuto alla Gilda dei Developer
            </h1>

            <p className="quest-subtitle mx-auto">
              Forgia il tuo futuro con strumenti leggendari. Dalle API mistiche
              ai Framework incantati, ogni riga di codice è una pozione per il
              successo.
            </p>

            <div className="quest-actions d-flex flex-column flex-md-row justify-content-center align-items-center gap-4">
              <Link to="/products" className="btn quest-btn quest-btn-primary">
                <span className="me-2">🪄</span>
                Equipaggiati
              </Link>

              <Link to="/categories" className="btn quest-btn quest-btn-secondary">
                Esplora inventario
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="quest-market">
        <div className="container-fluid px-4">
          <div className="row align-items-start">
            <div className="col-12 col-lg-4">
              <div className="old-json-card">
                <button className="old-json-close" type="button">
                  ×
                </button>

                <div className="old-json-inner d-flex gap-3">
                  <div className="old-json-avatar">
                    <img src="/img/old-json.png" alt="Old JSON" />
                  </div>

                  <div>
                    <h3>Old JSON</h3>
                    <p>
                      &quot;Salute, avventuriero! Usa il codice{" "}
                      <strong>QUEST10</strong> per risparmiare 10 monete d&apos;oro
                      sul tuo primo artefatto.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8 mt-5 mt-lg-0">
              <div className="quest-section-heading d-flex justify-content-between align-items-center">
                <h2>Missioni in evidenza</h2>

                <Link to="/products" className="quest-see-all">
                  Vedi tutte le missioni
                </Link>
              </div>

              <div className="row g-4 mt-3">
                <div className="col-12 col-md-6">
                  <article className="quest-product-card">
                    <span className="quest-card-badge">Leggendario</span>
                    <h3>Framework Incantato</h3>
                    <p>
                      Un artefatto mistico per velocizzare ogni quest frontend.
                    </p>
                    <Link to="/products" className="quest-card-link">
                      Scopri artefatto
                    </Link>
                  </article>
                </div>

                <div className="col-12 col-md-6">
                  <article className="quest-product-card">
                    <span className="quest-card-badge">Novità</span>
                    <h3>Pozione di Debug</h3>
                    <p>
                      Elimina bug ostinati e recupera punti concentrazione.
                    </p>
                    <Link to="/products" className="quest-card-link">
                      Scopri artefatto
                    </Link>
                  </article>
                </div>
              </div>
            </div>
          </div>

          <div className="quest-floating-card d-none d-lg-block"></div>
        </div>
      </section>
    </main>
  );
}
