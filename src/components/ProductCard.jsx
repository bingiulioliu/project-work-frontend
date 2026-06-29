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

    const formattedPrice = Number(product.price).toLocaleString("it-IT", {
        style: "currency",
        currency: "EUR",
    });

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
    console.log("PRODUCT CARD:", product);

    return (
        <article className="quest-card h-100">
            <div className="quest-card-inner">
                <button
                    className={`quest-favorite-button ${isFavorite ? "is-favorite" : ""}`}
                    type="button"
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
                        <Link to={`/products/${product.slug}`}>
                            {product.name}
                        </Link>
                    </h3>

                    <p className="quest-card-price">
                        {formattedPrice}
                    </p>

                    <div className="quest-card-actions">
                        {cartProduct ? (
                            <div className="quest-card-cart-controls">
                                <p className="quest-card-cart-status">
                                    Nell&apos;inventario
                                </p>

                                <div className="quest-card-quantity-actions">
                                    <button
                                        className="quest-card-quantity-button"
                                        type="button"
                                        onClick={handleDecreaseQuantity}
                                        aria-label="Diminuisci quantità"
                                        disabled={cartProduct.quantity === 1}
                                    >
                                        <i className="bi bi-dash-lg"></i>
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
                                        <i className="bi bi-plus-lg"></i>
                                    </button>
                                </div>

                                <button
                                    className="quest-card-remove-button"
                                    type="button"
                                    onClick={handleRemoveFromCart}
                                    aria-label={`Rimuovi ${product.name} dall'inventario`}
                                    title="Rimuovi dall'inventario"
                                >
                                    <i className="bi bi-trash3"></i>
                                </button>
                            </div>
                        ) : (
                            <button
                                className="quest-card-button"
                                type="button"
                                onClick={handleAddToCart}
                            >
                                <i className="bi bi-bag-plus"></i>
                                <span>Aggiungi</span>
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