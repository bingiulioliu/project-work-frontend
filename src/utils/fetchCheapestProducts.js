const API_URL = "http://localhost:3000";

export async function fetchCheapestProducts() {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
        throw new Error("Errore nel recupero dei prodotti più economici");
    }

    const data = await response.json();

    const products = data.results || [];

    const cheapestProducts = products
        .sort((a, b) => Number(a.price) - Number(b.price))
        .slice(0, 5);

    return cheapestProducts;
}