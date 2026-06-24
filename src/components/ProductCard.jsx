import { Link } from "react-router-dom";
import "./ProductCard.css";
import { getImgUrl } from "../utils/getImgUrl";
import useWishlist from "../hooks/useWishlist";

function ProductCard({ product }) {
    const { toggleWishlist, isInWishlist } = useWishlist();

    const isFavorite = isInWishlist(product.slug);

    const imageSrc = product.image?.startsWith("http")
        ? product.image
        : getImgUrl(product.image);

    function handleFavoriteClick() {
        toggleWishlist(product);
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

                    <button className="quest-card-button" type="button">
                        Aggiungi all'inventario
                    </button>

                    <Link to={`/products/${product.slug}`} className="quest-card-detail">
                        Vedi dettaglio
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;