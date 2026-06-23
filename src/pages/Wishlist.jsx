import { Link } from "react-router-dom";
import useWishlist from "../hooks/useWishlist";
import ProductCard from "../components/ProductCard";
import "./Wishlist.css";

function Wishlist() {
    const { wishlist } = useWishlist();

    return (
        <main className="wishlist-page">
            <section className="container">
                <div className="wishlist-heading text-center">
                    <p className="wishlist-kicker">La tua raccolta personale</p>
                    <h1>Artefatti preferiti</h1>
                    <p>
                        Qui trovi gli oggetti che hai salvato per le tue prossime
                        missioni.
                    </p>
                </div>

                {wishlist.length === 0 ? (
                    <div className="wishlist-empty">
                        <h2>Nessun artefatto salvato</h2>
                        <p>
                            Esplora il catalogo e aggiungi ai preferiti gli oggetti
                            che vuoi tenere d&apos;occhio.
                        </p>

                        <Link to="/products" className="wishlist-empty-link">
                            Vai al catalogo
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        {wishlist.map((product) => (
                            <div className="col-12 col-md-6 col-lg-3" key={product.slug}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Wishlist;