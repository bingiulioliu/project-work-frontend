import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRarestProducts } from "../utils/fetchRarestProducts";
import { fetchCheapestProducts } from "../utils/fetchCheapestProducts";
import "./HomePage.css";

export default function HomePage() {
  const [rarestProducts, setRarestProducts] = useState([]);
  const [isLoadingRarest, setIsLoadingRarest] = useState(true);

  const [cheapestProducts, setCheapestProducts] = useState([]);
  const [isLoadingCheapest, setIsLoadingCheapest] = useState(true);

  useEffect(() => {
    fetchRarestProducts()
      .then((products) => {
        setRarestProducts(products);
      })
      .catch((error) => {
        console.error("Errore prodotti più rari:", error);
      })
      .finally(() => {
        setIsLoadingRarest(false);
      });

    fetchCheapestProducts()
      .then((products) => {
        setCheapestProducts(products);
      })
      .catch((error) => {
        console.error("Errore prodotti più economici:", error);
      })
      .finally(() => {
        setIsLoadingCheapest(false);
      });
  }, []);

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

            <section className="quest-products-section">
              <div className="container-fluid px-4">
                <div className="quest-section-heading d-flex justify-content-between align-items-center mb-4">
                  <h2>Artefatti più rari</h2>

                  <Link to="/products" className="quest-see-all">
                    Vedi tutti
                  </Link>
                </div>

                {isLoadingRarest ? (
                  <p className="text-light">Caricamento artefatti...</p>
                ) : (
                  <div className="row g-4">
                    {rarestProducts.map((product) => (
                      <div className="col-12 col-md-6 col-lg" key={product.slug}>
                        <article className="quest-product-card h-100">
                          {product.image && (
                            <img
                              src={
                                product.image.startsWith("http")
                                  ? product.image
                                  : `/img/${product.image}`
                              }
                              alt={product.name}
                              className="quest-product-img"
                            />
                          )}

                          <div className="quest-product-body">
                            <span className={`quest-rarity quest-rarity-${product.rarity}`}>
                              {product.rarity}
                            </span>

                            <h3>{product.name}</h3>

                            <p className="quest-price">
                              {Number(product.price).toFixed(2)} €
                            </p>

                            <Link
                              to={`/products/${product.slug}`}
                              className="quest-card-link"
                            >
                              Vedi dettaglio
                            </Link>
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="quest-products-section">
              <div className="container-fluid px-4">
                <div className="quest-section-heading d-flex justify-content-between align-items-center mb-4">
                  <h2>Offerte della gilda</h2>

                  <Link to="/products" className="quest-see-all">
                    Vedi tutti
                  </Link>
                </div>

                {isLoadingCheapest ? (
                  <p className="text-light">Caricamento offerte...</p>
                ) : (
                  <div className="row g-4">
                    {cheapestProducts.map((product) => (
                      <div className="col-12 col-md-6 col-lg" key={product.slug}>
                        <article className="quest-product-card h-100">
                          {product.image && (
                            <img
                              src={
                                product.image.startsWith("http")
                                  ? product.image
                                  : `/img/${product.image}`
                              }
                              alt={product.name}
                              className="quest-product-img"
                            />
                          )}

                          <div className="quest-product-body">
                            <span className={`quest-rarity quest-rarity-${product.rarity}`}>
                              {product.rarity}
                            </span>

                            <h3>{product.name}</h3>

                            <p className="quest-price">
                              {Number(product.price).toFixed(2)} €
                            </p>

                            <Link
                              to={`/products/${product.slug}`}
                              className="quest-card-link"
                            >
                              Vedi dettaglio
                            </Link>
                          </div>
                        </article>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="quest-floating-card d-none d-lg-block"></div>
        </div>
      </section>
    </main>
  );
}
