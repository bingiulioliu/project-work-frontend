import ProductCard from "./ProductCard";
import "./SuggestedProducts.css";

export function SuggestedProducts({ products }) {
    // se non ci sono prodotto non renderizza
    if (!products || products.length === 0) {
        return null;
    }

    return <>
        <section className="suggested-products mt-5 mx-4">
            <h2>Il Master suggerisce</h2>
            <div className="suggested-products-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    </>;
};