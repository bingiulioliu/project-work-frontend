import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { createOrder } from "../utils/createOrder";
import "./Checkout.css";

function Checkout() {
    const navigate = useNavigate();

    const {
        cartItems,
        cartTotal,
        totalItems,
        clearCart,
    } = useCart();

    const [formData, setFormData] = useState({
        customer_name: "",
        customer_address: "",
        customer_city: "",
        customer_postal_code: "",
        telephone_number: "",
        mail: "",
        notes: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successOrder, setSuccessOrder] = useState(null);

    const formattedTotal = cartTotal.toLocaleString("it-IT", {
        style: "currency",
        currency: "EUR",
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (cartItems.length === 0) {
            setErrorMessage("Il tuo inventario è vuoto.");
            return;
        }

        const orderData = {
            ...formData,
            products: cartItems.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            setIsSubmitting(true);
            setErrorMessage("");

            const data = await createOrder(orderData);

            setSuccessOrder(data.results);
            clearCart();
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (cartItems.length === 0 && !successOrder) {
        return (
            <main className="checkout-page">
                <section className="container">
                    <div className="checkout-empty">
                        <h1>Checkout</h1>

                        <p>
                            Il tuo inventario è vuoto. Aggiungi almeno un artefatto
                            prima di procedere all&apos;ordine.
                        </p>

                        <Link to="/products" className="checkout-main-button">
                            Vai al catalogo
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    if (successOrder) {
        return (
            <main className="checkout-page">
                <section className="container">
                    <div className="checkout-success">
                        <p className="checkout-kicker">Ordine completato</p>

                        <h1>La tua quest è stata registrata!</h1>

                        <p>
                            L&apos;ordine è stato creato correttamente. Conserva il
                            numero ordine per consultare la pergamena della Gilda.
                        </p>

                        <div className="checkout-success-box">
                            <span>Numero ordine</span>
                            <strong>{successOrder.order_number}</strong>
                        </div>

                        <div className="checkout-success-box">
                            <span>Totale</span>
                            <strong>
                                {Number(successOrder.total).toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "EUR",
                                })}
                            </strong>
                        </div>

                        <button
                            type="button"
                            className="checkout-main-button"
                            onClick={() => navigate("/products")}
                        >
                            Torna al catalogo
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <section className="container">
                <div className="checkout-heading text-center">
                    <p className="checkout-kicker">Pergamena d&apos;ordine</p>

                    <h1>Checkout</h1>

                    <p>
                        Inserisci i dati di fatturazione e spedizione. Il totale
                        finale verrà ricalcolato dal backend.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row g-4 align-items-start">
                        <div className="col-12 col-lg-7">
                            <section className="checkout-card">
                                <h2>Dati cliente</h2>

                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="customer_name">
                                            Nome e cognome
                                        </label>

                                        <input
                                            id="customer_name"
                                            name="customer_name"
                                            type="text"
                                            value={formData.customer_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="mail">
                                            Email
                                        </label>

                                        <input
                                            id="mail"
                                            name="mail"
                                            type="email"
                                            value={formData.mail}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="telephone_number">
                                            Telefono
                                        </label>

                                        <input
                                            id="telephone_number"
                                            name="telephone_number"
                                            type="tel"
                                            value={formData.telephone_number}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="customer_postal_code">
                                            CAP
                                        </label>

                                        <input
                                            id="customer_postal_code"
                                            name="customer_postal_code"
                                            type="text"
                                            value={formData.customer_postal_code}
                                            onChange={handleChange}
                                            maxLength="5"
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="customer_address">
                                            Indirizzo di spedizione
                                        </label>

                                        <input
                                            id="customer_address"
                                            name="customer_address"
                                            type="text"
                                            value={formData.customer_address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="customer_city">
                                            Città
                                        </label>

                                        <input
                                            id="customer_city"
                                            name="customer_city"
                                            type="text"
                                            value={formData.customer_city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="notes">
                                            Note
                                        </label>

                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows="4"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            placeholder="Es. citofonare, consegna al portone..."
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="col-12 col-lg-5">
                            <aside className="checkout-summary">
                                <p className="checkout-summary-kicker">
                                    Riepilogo inventario
                                </p>

                                <h2>Il tuo ordine</h2>

                                <div className="checkout-products">
                                    {cartItems.map((item) => {
                                        const subtotal = Number(item.price) * item.quantity;

                                        return (
                                            <div
                                                className="checkout-product-row"
                                                key={item.slug}
                                            >
                                                <div>
                                                    <strong>{item.name}</strong>
                                                    <span>Quantità: {item.quantity}</span>
                                                </div>

                                                <p>
                                                    {subtotal.toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "EUR",
                                                    })}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="checkout-summary-row">
                                    <span>Prodotti</span>
                                    <strong>{totalItems}</strong>
                                </div>

                                <div className="checkout-summary-row">
                                    <span>Spedizione</span>
                                    <strong>Da calcolare</strong>
                                </div>

                                <div className="checkout-summary-total">
                                    <span>Totale provvisorio</span>
                                    <strong>{formattedTotal}</strong>
                                </div>

                                {errorMessage && (
                                    <p className="checkout-error">
                                        {errorMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="checkout-main-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Invio ordine..." : "Conferma ordine"}
                                </button>

                                <Link to="/carrello" className="checkout-back-link">
                                    ← Torna all&apos;inventario
                                </Link>
                            </aside>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Checkout;