import { Link } from "react-router-dom";
import "./ProductCard.css";
import { getImgUrl } from "../utils/getImgUrl";
import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";

function ProductCard({ product }) {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const { toggleWishlist, isInWishlist } = useWishlist();

    const isFavorite = isInWishlist(product.slug);

    const cartProduct = cartItems.find((item) => item.slug === product.slug);

    const imageSrc = product.image?.startsWith("http")
        ? product.image
        : getImgUrl(product.image);

    function handleFavoriteClick() {
        toggleWishlist(product);
    }

    function handleAddToCart() {
        addToCart(product);
    }

    function handleIncreaseQuantity() {
        increaseQuantity(product.slug);
    }

    function handleDecreaseQuantity() {
        decreaseQuantity(product.slug);
    }

    function handleRemoveFromCart() {
        removeFromCart(product.slug);
    }

    return (
        <article className="quest-card h-100">
            <div className="quest-card-inner">

                <button
                    className={`quest-favorite-button ${isFavorite ? "is-favorite" : ""}`}
                    type="button"
                    onClick={handleFavoriteClick}
                    aria-label={
                        isFavorite
                            ? "Rimuovi dai preferiti"
                            : "Aggiungi ai preferiti"
                    }
                >
                    {isFavorite ? "♥" : "♡"}
                </button>

                <Link to={`/products/${product.slug}`} className="quest-card-image-link">
                    {product.image && (
                        <img
                            src={imageSrc}
                            alt={product.name}
                            className="quest-card-image"
                        />
                    )}
                </Link>

                <div className="quest-card-body">
                    <span className={`quest-card-rarity quest-card-rarity-${product.rarity}`}>
                        {product.rarity}
                    </span>

                    <h3 className="quest-card-title">
                        {product.name}
                    </h3>

                    <p className="quest-card-price">
                        {Number(product.price).toFixed(2)} €
                    </p>

                    <div className="quest-card-actions">
                        {cartProduct ? (
                            <div className="quest-card-cart-controls">
                                <p className="quest-card-cart-status">
                                    Già nell&apos;inventario: {cartProduct.quantity}
                                </p>

                                <div className="quest-card-quantity-actions">
                                    <button
                                        className="quest-card-quantity-button"
                                        type="button"
                                        onClick={handleDecreaseQuantity}
                                        aria-label="Diminuisci quantità"
                                    >
                                        -
                                    </button>

                                    <span className="quest-card-quantity-value">
                                        {cartProduct.quantity}
                                    </span>

                                    <button
                                        className="quest-card-quantity-button"
                                        type="button"
                                        onClick={handleIncreaseQuantity}
                                        aria-label="Aumenta quantità"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    className="quest-card-remove-button"
                                    type="button"
                                    onClick={handleRemoveFromCart}
                                >
                                    Rimuovi dall&apos;inventario
                                </button>
                            </div>
                        ) : (
                            <button
                                className="quest-card-button"
                                type="button"
                                onClick={handleAddToCart}
                            >
                                <span className="button-text">
                                    Aggiungi all&apos;inventario
                                </span>

                                <span className="button-icon">
                                    🛒
                                </span>
                            </button>
                        )}
                    </div>

                    <Link to={`/products/${product.slug}`} className="quest-card-detail">
                        Vedi dettaglio
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;