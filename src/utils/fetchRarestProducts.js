const API_URL = "http://localhost:3000";

export async function fetchRarestProducts() {
    const response = await fetch(`${API_URL}/products/rarest`);

    if (!response.ok) {
        throw new Error("Errore nel recupero dei prodotti più rari");
    }

    const data = await response.json();

    return data.results || [];
}