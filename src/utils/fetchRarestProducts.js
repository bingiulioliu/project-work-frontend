const API_URL = "http://localhost:3000";

export async function fetchRarestProducts() {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
        throw new Error("Errore nel recupero dei prodotti più rari");
    }

    const data = await response.json();

    const products = data.results || [];

    const rarityOrder = {
        legendary: 3,
        rare: 2,
        common: 1,
    };

    const rarestProducts = products
        .sort((a, b) => {
            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        })
        .slice(0, 5);

    return rarestProducts;
}