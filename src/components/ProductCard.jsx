import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
    const imageSrc = product.image?.startsWith("http")
        ? product.image
        : `/img/${product.image}`;

    return (
        <article className="quest-card h-100">
            <div className="quest-card-inner">
                <Link to={`/product/${product.slug}`} className="quest-card-image-link">
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

                    {product.description && (
                        <p className="quest-card-description">
                            {product.description}
                        </p>
                    )}

                    <p className="quest-card-price">
                        {Number(product.price).toFixed(2)} €
                    </p>

                    <button className="quest-card-button" type="button">
                        Aggiungi al carrello
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