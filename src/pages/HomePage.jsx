import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRarestProducts } from "../utils/fetchRarestProducts";
import { fetchCheapestProducts } from "../utils/fetchCheapestProducts";
import "./HomePage.css";
import ProductCard from "../components/ProductCard";

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
            <p className="quest-kicker">Benvenuto a la piazza del mercato</p>

            <h1 className="quest-title">
              L'Equipaggiamento per le
              tue Battaglie Quotidiane
            </h1>

            <p className="quest-subtitle mx-auto">
              Forgia il tuo destino con artefatti leggensari curati dai
              migliori fabbri della Gilda. Dalla domotica incantata al
              vestiario dell'invisibilità.
            </p>

            <div className="quest-actions d-flex flex-column flex-md-row justify-content-center align-items-center gap-4">
              <Link to="/products" className="btn quest-btn quest-btn-secondary">
                Inizia l'avventura
              </Link>

              <Link to="/products" className="btn quest-btn quest-btn-primary">
                <span className="me-2">🪄</span>
                Vedi offerte
              </Link>


            </div>
          </div>
        </div>
      </section>

      <section className="quest-market">
        <div className="container-fluid px-4">
          <div className="row align-items-start">

            <div className="container-fluid px-4">
              <div className="quest-section-heading d-flex justify-content-between align-items-center mb-4">
                <h2>Oggetti più rari</h2>

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
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>


            <section className="quest-products-section">
              <div className="container-fluid px-4">
                <div className="quest-section-heading d-flex justify-content-between align-items-center mb-4">
                  <h2>Essenziali</h2>

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
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>


        </div>
      </section>
    </main>
  );
}
