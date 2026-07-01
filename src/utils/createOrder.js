const API_URL = "http://localhost:3000";

import {
    buildOrderValidationError,
    validateOrderPayload,
} from "./checkoutValidation";

export async function createOrder(orderData) {
    const validation = validateOrderPayload(orderData);

    if (!validation.isValid) {
        throw new Error(buildOrderValidationError(validation.errors));
    }

    let response;
    try {
        response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validation.sanitizedData),
        });
    } catch {
        throw new Error("Server non raggiungibile. Verifica che il backend sia avviato.");
    }

    let data = null;
    try {
        data = await response.json();
    } catch {
        if (!response.ok) {
            throw new Error("Errore durante la creazione dell'ordine");
        }
        throw new Error("Risposta server non valida.");
    }

    if (!response.ok) {
        const detailedErrors = Array.isArray(data?.errors)
            ? data.errors
                .map((errorItem) => errorItem?.message)
                .filter(Boolean)
                .join(" ")
            : "";

        throw new Error(
            detailedErrors
            || data?.message
            || data?.error
            || "Errore durante la creazione dell'ordine"
        );
    }

    if (!data || typeof data !== "object" || !data.results) {
        throw new Error("Risposta server incompleta: dettagli ordine mancanti.");
    }

    if (!data.results.order_number || data.results.total == null) {
        throw new Error("Risposta server incompleta: numero ordine o totale non presenti.");
    }

    return data;
}