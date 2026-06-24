const API_URL = "http://localhost:3000";

export async function fetchProducts(filters = {}) {
    const params = new URLSearchParams(filters);

    const response = await fetch(`${API_URL}/products?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Errore durante il recupero dei prodotti");
    }

    const data = await response.json();

    return data;
}