import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ProductDetails.css";
import { getImgUrl } from "../utils/getImgUrl";
import useWishlist from "../hooks/useWishlist";

function ProductDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const { toggleWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        setIsLoading(true);
        setErrorMessage("");
        setCartMessage("");

        fetch(`http://localhost:3000/products/${slug}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setErrorMessage("Prodotto non trovato.");
                    return;
                }

                setProduct(data.results);
            })
            .catch(() => {
                setErrorMessage("Errore durante il caricamento del prodotto.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [slug]);

    function handleGoBack() {
        navigate(-1);
    }

    function handleAddToCart() {
        setCartMessage("Artefatto aggiunto all'inventario!");
    }

    function handleFavoriteClick() {
        toggleWishlist(product);
    }

    if (isLoading) {
        return (
            <main className="product-details-page">
                <section className="container">
                    <div className="product-status-card">
                        <p>Caricamento artefatto...</p>
                    </div>
                </section>
            </main>
        );
    }

    if (errorMessage) {
        return (
            <main className="product-details-page">
                <section className="container">
                    <div className="product-status-card">
                        <h1>Ops!</h1>
                        <p>{errorMessage}</p>

                        <Link to="/products" className="product-status-link">
                            Torna al catalogo
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="product-details-page">
                <section className="container">
                    <div className="product-status-card">
                        <p>Prodotto non disponibile.</p>
                    </div>
                </section>
            </main>
        );
    }

    const isFavorite = isInWishlist(product.slug);

    const formattedPrice = Number(product.price).toLocaleString("it-IT", {
        style: "currency",
        currency: "EUR",
    });

    const imageSrc = product.image?.startsWith("http")
        ? product.image
        : getImgUrl(product.image);

    return (
        <main className="product-details-page">
            <section className="container">
                <button
                    type="button"
                    className="product-back-button"
                    onClick={handleGoBack}
                >
                    ← Torna indietro
                </button>

                <article className="product-details-card">
                    <button
                        type="button"
                        className={`product-favorite-button ${isFavorite ? "is-favorite" : ""}`}
                        onClick={handleFavoriteClick}
                        aria-label={
                            isFavorite
                                ? "Rimuovi dai preferiti"
                                : "Aggiungi ai preferiti"
                        }
                    >
                        {isFavorite ? "♥" : "♡"}
                    </button>

                    <div className="product-details-inner">
                        <div className="row g-5 align-items-center">
                            <div className="col-12 col-lg-6">
                                <div className="product-image-frame">
                                    <div className="product-image-wrapper">
                                        <img
                                            src={imageSrc}
                                            alt={product.name}
                                            className="product-details-image"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <div className="product-info">
                                    <p className="product-kicker">
                                        Scheda artefatto
                                    </p>

                                    <span className={`product-rarity product-rarity-${product.rarity}`}>
                                        {product.rarity}
                                    </span>

                                    <h1 className="product-title">
                                        {product.name}
                                    </h1>

                                    <p className="product-description">
                                        {product.description}
                                    </p>

                                    <div className="product-price-box">
                                        <span className="product-price-label">
                                            Valore di mercato
                                        </span>

                                        <p className="product-price">
                                            {formattedPrice}
                                        </p>
                                    </div>

                                    {product.categories?.length > 0 && (
                                        <div className="product-section">
                                            <h5>Categorie</h5>

                                            <div className="product-badges">
                                                {product.categories.map((category) => (
                                                    <span
                                                        key={category.slug}
                                                        className="product-category-badge"
                                                    >
                                                        {category.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {product.tags?.length > 0 && (
                                        <div className="product-section">
                                            <h5>Tag</h5>

                                            <div className="product-badges">
                                                {product.tags.map((tag) => (
                                                    <span
                                                        key={tag.slug}
                                                        className="product-tag-badge"
                                                    >
                                                        {tag.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="product-actions">
                                        <button
                                            type="button"
                                            className="product-cart-button"
                                            onClick={handleAddToCart}
                                        >
                                            Aggiungi all&apos;inventario
                                        </button>

                                        <button
                                            type="button"
                                            className={`product-favorite-action ${isFavorite ? "is-favorite" : ""}`}
                                            onClick={handleFavoriteClick}
                                        >
                                            {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                                        </button>
                                    </div>

                                    {cartMessage && (
                                        <p className="product-cart-message">
                                            {cartMessage}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    );
}

export default ProductDetails;