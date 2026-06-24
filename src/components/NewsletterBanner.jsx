import { useState } from "react";
import { useNewsletter } from "../hooks/useNewsletter";
import "./NewsletterBanner.css";

function NewsletterBanner() {
    const { isVisible, hideNewsletter } = useNewsletter();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const cleanEmail = email.trim();

        if (!cleanEmail) {
            setErrorMessage("Inserisci una email valida per ricevere la pergamena.");
            return;
        }

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: cleanEmail,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error || "Errore durante l'iscrizione alla newsletter.");
                setIsSubmitting(false);
                return;
            }

            console.log(`Email registrata: ${cleanEmail}`);

            localStorage.setItem("jsonQuestNewsletterEmail", cleanEmail);

            setMessage("Pergamena inviata! Grazie per esserti unito alla Gilda.");

            setTimeout(() => {
                hideNewsletter();
                setIsSubmitting(false);
            }, 1800);
        } catch (error) {
            console.error("Errore richiesta newsletter:", error);
            setErrorMessage("Errore di connessione al server.");
            setIsSubmitting(false);
        }
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
                        disabled={isSubmitting}
                    />

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Invio pergamena..." : "Ricevi la pergamena"}
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