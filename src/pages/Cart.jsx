import { useState } from "react";
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

    const [showClearModal, setShowClearModal] = useState(false);

    function handleOpenClearModal() {
        setShowClearModal(true);
    }

    function handleCloseClearModal() {
        setShowClearModal(false);
    }

    function handleConfirmClearCart() {
        clearCart();
        setShowClearModal(false);
    }

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
                            Esplora il emporio e scegli il tuo equipaggiamento.
                        </p>

                        <Link to="/products" className="cart-primary-link">
                                            Vai all'emporio
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4 align-items-start">
                        <div className="col-12 col-lg-8">

                            <div className="cart-list-toolbar">
                                <div>
                                    <p className="cart-toolbar-label">Artefatti selezionati</p>
                                    <h2>La tua borsa da viaggio</h2>
                                </div>

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
                                                    aria-label={`Rimuovi ${item.name} dal carrello`}
                                                    title="Rimuovi dal carrello"
                                                >
                                                    <i className="bi bi-trash3"></i>
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
                                                        disabled={item.quantity === 1}
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



                                <div className="cart-summary-total">
                                    <span>Totale</span>
                                    <strong>{formattedTotal}</strong>
                                </div>

                                <p className="cart-summary-note">
                                    Il totale verrà confermato nel checkout prima dell&apos;invio dell&apos;ordine.
                                </p>

                                <Link to="/checkout" className="cart-checkout-button">
                                    Procedi al checkout
                                </Link>

                                <button
                                    type="button"
                                    className="cart-clear-button"
                                    onClick={handleOpenClearModal}
                                >
                                    Svuota Inventario
                                </button>
                            </aside>
                        </div>
                    </div>
                )}
            </section>

            {showClearModal && (
                <div className="cart-modal-overlay">
                    <div className="cart-modal">
                        <div className="cart-modal-inner">
                            <p className="cart-modal-kicker">Conferma azione</p>

                            <h2>Svuotare l&apos;inventario?</h2>

                            <p>
                                Tutti gli artefatti presenti nella tua borsa verranno rimossi.
                                Questa azione non può essere annullata.
                            </p>

                            <div className="cart-modal-actions">
                                <button
                                    type="button"
                                    className="cart-modal-button secondary"
                                    onClick={handleCloseClearModal}
                                >
                                    Annulla
                                </button>

                                <button
                                    type="button"
                                    className="cart-modal-button danger"
                                    onClick={handleConfirmClearCart}
                                >
                                    Svuota inventario
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Cart;
