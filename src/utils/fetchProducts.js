const API_URL = "http://localhost:3000";

export async function fetchProducts(filters = {}) {

    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/products?${params}`);

    if (!response.ok) {
        throw new Error("Errore nel recupero dei prodotti");
    }

    const data = await response.json();
    console.log(data.results);
    
    return data.results || [];

};