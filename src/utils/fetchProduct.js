import { useEffect } from "react";
import { useState } from "react";

const API_URL = "http://localhost:3000/products";

export function fetchProduct(slug){
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) {
            return
        }

        setIsLoading(true);
        setError(null);
        setProduct(null);

        fetch(`${API_URL}/${slug}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                setError('Prodotto non trovato');
                return;
            }
            setProduct(data.results);
        })
        .catch(() => {
            setError('Errore durante il caricamento del prodotto');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [slug]);

    return { product, isLoading, error };
};