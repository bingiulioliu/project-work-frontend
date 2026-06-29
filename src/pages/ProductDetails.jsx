import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ProductDetails.css";
import { getImgUrl } from "../utils/getImgUrl";
import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";
import { SuggestedProducts } from "../components/SuggestedProducts";
import { fetchSuggestedProducts } from "../utils/fetchSuggestedProducts";

function ProductDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const { toggleWishlist, isInWishlist } = useWishlist();

    const {
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCart();

    const { suggestedProducts } = fetchSuggestedProducts(slug);


    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [showCartModal, setShowCartModal] = useState(false);
    const [isCartModalClosing, setIsCartModalClosing] = useState(false);
    const modalCloseTimeoutRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        setErrorMessage("");
        setShowCartModal(false);
        setIsCartModalClosing(false);

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
        if (modalCloseTimeoutRef.current) {
            clearTimeout(modalCloseTimeoutRef.current);
            modalCloseTimeoutRef.current = null;
        }

        setIsCartModalClosing(false);
        addToCart(product);
        setShowCartModal(true);
    }

    function handleCloseCartModal() {
        if (modalCloseTimeoutRef.current) {
            clearTimeout(modalCloseTimeoutRef.current);
            modalCloseTimeoutRef.current = null;
        }

        setIsCartModalClosing(false);
        setShowCartModal(false);
    }

    function handleGoToCart() {
        navigate("/cart");
    }

    function handleFavoriteClick() {
        toggleWishlist(product);
    }

    function handleRemoveFromModal(productSlug) {
        removeFromCart(productSlug);

        if (productSlug !== product.slug) {
            return;
        }

        setIsCartModalClosing(true);

        if (modalCloseTimeoutRef.current) {
            clearTimeout(modalCloseTimeoutRef.current);
        }

        modalCloseTimeoutRef.current = setTimeout(() => {
            setShowCartModal(false);
            setIsCartModalClosing(false);
            modalCloseTimeoutRef.current = null;
        }, 500);
    }

    useEffect(() => {
        return () => {
            if (modalCloseTimeoutRef.current) {
                clearTimeout(modalCloseTimeoutRef.current);
            }
        };
    }, []);

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

    const productInCart = cartItems.find((item) => item.slug === product.slug);
    const productQuantity = productInCart?.quantity ?? 0;
    const getCartQuantityBySlug = (productSlug) => {
        const cartItem = cartItems.find((item) => item.slug === productSlug);
        return cartItem?.quantity ?? 0;
    };

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
                                ? `Rimuovi ${product.name} dai preferiti`
                                : `Aggiungi ${product.name} ai preferiti`
                        }
                        title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                    >
                        <i className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"}></i>
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
                                        {productQuantity > 0 ? (
                                            <div className="product-cart-controls" aria-label="Gestione quantità nel carrello">
                                                <button
                                                    type="button"
                                                    className="product-quantity-button"
                                                    onClick={() => {
                                                        if (productQuantity > 1) {
                                                            decreaseQuantity(product.slug);
                                                        }
                                                    }}
                                                    disabled={productQuantity <= 1}
                                                    aria-label={`Diminuisci quantità di ${product.name}`}
                                                >
                                                    <i className="bi bi-dash-lg"></i>
                                                </button>

                                                <span className="product-quantity-value" aria-live="polite">
                                                    {productQuantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    className="product-quantity-button"
                                                    onClick={() => increaseQuantity(product.slug)}
                                                    aria-label={`Aumenta quantità di ${product.name}`}
                                                >
                                                    <i className="bi bi-plus-lg"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="product-remove-button"
                                                    onClick={() => removeFromCart(product.slug)}
                                                    aria-label={`Rimuovi ${product.name} dal carrello`}
                                                    title="Rimuovi dal carrello"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                className="product-cart-button"
                                                onClick={handleAddToCart}
                                            >
                                                <i className="bi bi-bag-plus"></i>
                                                <span>Aggiungi all&apos;inventario</span>
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            className={`product-favorite-action ${isFavorite ? "is-favorite" : ""}`}
                                            onClick={handleFavoriteClick}
                                        >
                                            <i className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"}></i>
                                            <span>
                                                {isFavorite ? "Nei preferiti" : "Aggiungi ai preferiti"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>

            {showCartModal && (
                <div className={`add-cart-modal-overlay ${isCartModalClosing ? "is-closing" : ""}`}>
                    <aside
                        className={`add-cart-modal ${isCartModalClosing ? "is-closing" : ""}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-cart-modal-title"
                    >
                        <button
                            type="button"
                            className="add-cart-modal-close"
                            onClick={handleCloseCartModal}
                            aria-label="Chiudi modale"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>

                        <div className="add-cart-confirmation">
                            <div className="add-cart-check">
                                <i className="bi bi-check-lg"></i>
                            </div>

                            <img
                                src={imageSrc}
                                alt={product.name}
                                className="add-cart-product-image"
                            />

                            <div className="add-cart-product-info">
                                <h2 id="add-cart-modal-title">
                                    {product.name}
                                </h2>

                                <p>{product.description}</p>

                                <strong>{formattedPrice}</strong>
                            </div>
                        </div>

                        <div className="add-cart-selected-controls" aria-label="Gestione quantità prodotto aggiunto">
                            <button
                                type="button"
                                className="add-cart-item-quantity-button"
                                onClick={() => {
                                    if (productQuantity > 1) {
                                        decreaseQuantity(product.slug);
                                    }
                                }}
                                disabled={productQuantity <= 1}
                                aria-label={`Diminuisci quantità di ${product.name}`}
                            >
                                <i className="bi bi-dash-lg"></i>
                            </button>

                            <span className="add-cart-item-quantity-value" aria-live="polite">
                                {productQuantity}
                            </span>

                            <button
                                type="button"
                                className="add-cart-item-quantity-button"
                                onClick={() => increaseQuantity(product.slug)}
                                aria-label={`Aumenta quantità di ${product.name}`}
                            >
                                <i className="bi bi-plus-lg"></i>
                            </button>

                            <button
                                type="button"
                                className="add-cart-item-remove-button"
                                onClick={() => handleRemoveFromModal(product.slug)}
                                aria-label={`Rimuovi ${product.name} dal carrello`}
                                title="Rimuovi dal carrello"
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>

                        <p className="add-cart-message">
                            <strong>{product.name}</strong> è stato aggiunto all&apos;inventario.
                        </p>

                        {suggestedProducts?.length > 0 && (
                            <div className="add-cart-suggestions">
                                <h3>Potrebbe piacerti anche</h3>

                                <div className="add-cart-suggestions-list">
                                    {suggestedProducts.slice(0, 3).map((suggestedProduct) => {
                                        const suggestedQuantity = getCartQuantityBySlug(suggestedProduct.slug);
                                        const suggestedImageSrc = suggestedProduct.image?.startsWith("http")
                                            ? suggestedProduct.image
                                            : getImgUrl(suggestedProduct.image);

                                        const suggestedPrice = Number(suggestedProduct.price).toLocaleString("it-IT", {
                                            style: "currency",
                                            currency: "EUR",
                                        });

                                        return (
                                            <article
                                                className="add-cart-suggestion-item"
                                                key={suggestedProduct.slug}
                                            >
                                                <Link
                                                    to={`/products/${suggestedProduct.slug}`}
                                                    onClick={handleCloseCartModal}
                                                    className="add-cart-suggestion-image-link"
                                                >
                                                    <img
                                                        src={suggestedImageSrc}
                                                        alt={suggestedProduct.name}
                                                        className="add-cart-suggestion-image"
                                                    />
                                                </Link>

                                                <div className="add-cart-suggestion-info">
                                                    <Link
                                                        to={`/products/${suggestedProduct.slug}`}
                                                        onClick={handleCloseCartModal}
                                                    >
                                                        <h4>{suggestedProduct.name}</h4>
                                                    </Link>

                                                    <p>{suggestedProduct.description}</p>

                                                    <strong>{suggestedPrice}</strong>
                                                </div>

                                                {suggestedQuantity > 0 ? (
                                                    <div className="add-cart-item-controls" aria-label={`Gestione quantità di ${suggestedProduct.name}`}>
                                                        <button
                                                            type="button"
                                                            className="add-cart-item-quantity-button"
                                                            onClick={() => {
                                                                if (suggestedQuantity > 1) {
                                                                    decreaseQuantity(suggestedProduct.slug);
                                                                }
                                                            }}
                                                            disabled={suggestedQuantity <= 1}
                                                            aria-label={`Diminuisci quantità di ${suggestedProduct.name}`}
                                                        >
                                                            <i className="bi bi-dash-lg"></i>
                                                        </button>

                                                        <span className="add-cart-item-quantity-value" aria-live="polite">
                                                            {suggestedQuantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            className="add-cart-item-quantity-button"
                                                            onClick={() => increaseQuantity(suggestedProduct.slug)}
                                                            aria-label={`Aumenta quantità di ${suggestedProduct.name}`}
                                                        >
                                                            <i className="bi bi-plus-lg"></i>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="add-cart-item-remove-button"
                                                            onClick={() => handleRemoveFromModal(suggestedProduct.slug)}
                                                            aria-label={`Rimuovi ${suggestedProduct.name} dal carrello`}
                                                            title="Rimuovi dal carrello"
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="add-cart-suggestion-button"
                                                        onClick={() => addToCart(suggestedProduct)}
                                                        aria-label={`Aggiungi ${suggestedProduct.name} all'inventario`}
                                                        title="Aggiungi all'inventario"
                                                    >
                                                        <i className="bi bi-bag-plus"></i>
                                                    </button>
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="add-cart-modal-actions">
                            <button
                                type="button"
                                className="add-cart-secondary-button"
                                onClick={handleCloseCartModal}
                            >
                                Continua ad acquistare
                            </button>

                            <button
                                type="button"
                                className="add-cart-primary-button"
                                onClick={handleGoToCart}
                            >
                                Vai all&apos;inventario
                            </button>
                        </div>
                    </aside>
                </div>
            )}
            <SuggestedProducts products={suggestedProducts} />
        </main>
    );
}

export default ProductDetails;