const API_URL = "http://localhost:3000";

export async function fetchCheapestProducts() {
    const response = await fetch(`${API_URL}/products/cheapest`);

    if (!response.ok) {
        throw new Error("Errore nel recupero dei prodotti più economici");
    }

    const data = await response.json();

    return data.results || [];
}