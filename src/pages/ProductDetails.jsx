import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { getImgUrl } from "../utils/getImgUrl";

function ProductDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        setIsLoading(true);
        setErrorMessage("");

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
        setCartMessage("Oggetto aggiunto all'inventario!");
    }

    if (isLoading) {
        return (
            <main className="container py-5">
                <p>Caricamento artefatto...</p>
            </main>
        );
    }

    if (errorMessage) {
        return (
            <main className="container py-5">
                <h1>Ops!</h1>
                <p>{errorMessage}</p>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="container py-5">
                <p>Prodotto non disponibile.</p>
            </main>
        );
    }
    const formattedPrice = Number(product.price).toLocaleString("it-IT", {
        style: "currency",
        currency: "EUR"
    });

    return (
        <main className="product-details-page">
            <section className="container">
                <button type="button"
                    className="product-back-button"
                    onClick={handleGoBack}>Torna indietro</button>
                <div className="product-details-card row g-4 align-items-center">
                    <div className="col-12 col-lg-6">
                        <div className="product-image-wrapper">
                            <img
                                src={getImgUrl(product.image)}
                                alt={product.name}
                                className="product-details-image"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="product-info">
                            <span className="product-rarity">
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
                                    Prezzo
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

                            <button
                                type="button"
                                className="product-cart-button"
                                onClick={handleAddToCart}
                            >
                                Aggiungi all&apos;inventario
                            </button>

                            {cartMessage && (
                                <p className="product-cart-message">
                                    {cartMessage}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProductDetails;