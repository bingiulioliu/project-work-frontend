import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { getImgUrl } from "../utils/getImgUrl";
import "./Cart.css";

function Cart() {
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        totalItems,
        cartTotal,
    } = useCart();

    const formattedTotal = cartTotal.toLocaleString("it-IT", {
        style: "currency",
        currency: "EUR",
    });

    return (
        <main className="cart-page">
            <section className="container">
                <div className="cart-heading text-center">
                    <p className="cart-kicker">Inventario personale</p>

                    <h1>Inventario</h1>

                    <p>
                        Gestisci gli artefatti scelti, modifica le quantità e
                        controlla il totale prima di procedere alla prossima missione.
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <h2>Il tuo inventario è vuoto</h2>

                        <p>
                            Non hai ancora aggiunto nessun artefatto al carrello.
                            Esplora il catalogo e scegli il tuo equipaggiamento.
                        </p>

                        <Link to="/products" className="cart-primary-link">
                            Vai al catalogo
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4 align-items-start">
                        <div className="col-12 col-lg-8">
                            
                            <div className="cart-catalog-link-wrapper">
                                <Link to="/products" className="cart-back-catalog-button">
                                    ← Aggiungi altri artefatti
                                </Link>
                            </div>

                            <div className="cart-items-card">
                                {cartItems.map((item) => {
                                    const imageSrc = item.image?.startsWith("http")
                                        ? item.image
                                        : getImgUrl(item.image);

                                    const subtotal = Number(item.price) * item.quantity;

                                    const formattedPrice = Number(item.price).toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "EUR",
                                    });

                                    const formattedSubtotal = subtotal.toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "EUR",
                                    });

                                    return (
                                        <article className="cart-item" key={item.slug}>
                                            <Link
                                                to={`/products/${item.slug}`}
                                                className="cart-item-image-link"
                                            >
                                                <img
                                                    src={imageSrc}
                                                    alt={item.name}
                                                    className="cart-item-image"
                                                />
                                            </Link>

                                            <div className="cart-item-info">
                                                <span className={`cart-rarity cart-rarity-${item.rarity}`}>
                                                    {item.rarity}
                                                </span>

                                                <h2>
                                                    <Link to={`/products/${item.slug}`}>
                                                        {item.name}
                                                    </Link>
                                                </h2>

                                                <p className="cart-item-price">
                                                    Prezzo unitario: {formattedPrice}
                                                </p>

                                                <button
                                                    type="button"
                                                    className="cart-remove-button"
                                                    onClick={() => removeFromCart(item.slug)}
                                                >
                                                    Rimuovi
                                                </button>
                                            </div>

                                            <div className="cart-quantity-box">
                                                <p className="cart-small-label">
                                                    Quantità
                                                </p>

                                                <div className="cart-quantity-controls">
                                                    <button
                                                        type="button"
                                                        onClick={() => decreaseQuantity(item.slug)}
                                                        aria-label="Diminuisci quantità"
                                                    >
                                                        −
                                                    </button>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onChange={(event) =>
                                                            updateQuantity(item.slug, event.target.value)
                                                        }
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => increaseQuantity(item.slug)}
                                                        aria-label="Aumenta quantità"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="cart-subtotal">
                                                <p className="cart-small-label">
                                                    Subtotale
                                                </p>

                                                <strong>{formattedSubtotal}</strong>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="col-12 col-lg-4">
                            <aside className="cart-summary">
                                <p className="cart-summary-kicker">
                                    Riepilogo ordine
                                </p>

                                <h2>Totale Inventario</h2>

                                <div className="cart-summary-row">
                                    <span>Prodotti</span>
                                    <strong>{totalItems}</strong>
                                </div>

                                <div className="cart-summary-row">
                                    <span>Spedizione</span>
                                    <strong>Da calcolare</strong>
                                </div>

                                <div className="cart-summary-total">
                                    <span>Totale</span>
                                    <strong>{formattedTotal}</strong>
                                </div>

                                <Link to="/checkout" className="cart-checkout-button">
                                    Procedi al checkout
                                </Link>

                                <button
                                    type="button"
                                    className="cart-clear-button"
                                    onClick={clearCart}
                                >
                                    Svuota Inventario
                                </button>
                            </aside>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Cart;