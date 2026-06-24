const API_URL = "http://localhost:3000";

export async function createOrder(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || data.error || "Errore durante la creazione dell'ordine"
        );
    }

    return data;
}