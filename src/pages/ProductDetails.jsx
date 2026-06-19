import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
    const { slug } = useParams();

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

    return (
        <main className="container py-5">
            <section className="row g-4 align-items-center">
                <div className="col-12 col-md-6">
                    <img
                        src={`/img/${product.image}`}
                        alt={product.name}
                        className="img-fluid rounded shadow"
                    />
                </div>

                <div className="col-12 col-md-6">
                    <span className="badge text-bg-warning mb-3">
                        {product.rarity}
                    </span>

                    <h1 className="mb-3">{product.name}</h1>

                    <p className="lead">{product.description}</p>

                    <p className="fs-4 fw-bold">
                        {product.price} monete d&apos;oro
                    </p>

                    {product.categories?.length > 0 && (
                        <div className="mb-3">
                            <h5>Categorie</h5>

                            <div className="d-flex flex-wrap gap-2">
                                {product.categories.map((category) => (
                                    <span
                                        key={category.slug}
                                        className="badge text-bg-secondary"
                                    >
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {product.tags?.length > 0 && (
                        <div className="mb-4">
                            <h5>Tag</h5>

                            <div className="d-flex flex-wrap gap-2">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag.slug}
                                        className="badge text-bg-dark"
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddToCart}
                    >
                        Aggiungi all&apos;inventario
                    </button>

                    {cartMessage && (
                        <p className="mt-3 text-success fw-semibold">
                            {cartMessage}
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default ProductDetails;