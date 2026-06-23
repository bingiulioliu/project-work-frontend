import { useState } from "react";
import { useNewsletter } from "../hooks/useNewsletter";
import "./NewsletterBanner.css";

function NewsletterBanner() {
    const { isVisible, hideNewsletter } = useNewsletter();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (!email.trim()) {
            setErrorMessage("Inserisci una email valida per ricevere la pergamena.");
            return;
        }

        setErrorMessage("");
        setMessage("Pergamena inviata! Grazie per esserti unito alla Gilda.");

        console.log(`Email registrata: ${email}`);

        localStorage.setItem("jsonQuestNewsletterEmail", email);

        setTimeout(() => {
            hideNewsletter();
        }, 1800);
    }

    if (!isVisible) {
        return null;
    }

    return (
        <div className="newsletter-banner">
            <div className="newsletter-banner-content">
                <div className="newsletter-banner-text">
                    <span className="newsletter-banner-eyebrow">
                        Nuovo avventuriero rilevato
                    </span>

                    <p className="newsletter-banner-title">
                        Entra nella Gilda di JSON&apos;s Quest
                    </p>
                </div>

                <form className="newsletter-banner-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Inserisci la tua email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <button type="submit">
                        Ricevi la pergamena
                    </button>
                </form>

                <button
                    type="button"
                    className="newsletter-banner-close"
                    onClick={hideNewsletter}
                    aria-label="Chiudi banner newsletter"
                >
                    &times;
                </button>
            </div>

            {errorMessage && (
                <p className="newsletter-banner-error">
                    {errorMessage}
                </p>
            )}

            {message && (
                <p className="newsletter-banner-message">
                    {message}
                </p>
            )}
        </div>
    );
}

export default NewsletterBanner;