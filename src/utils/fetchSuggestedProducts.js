import { useState } from "react";
import { useEffect } from "react";

export function fetchSuggestedProducts(slug) {
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // se non ho uno slug non parto nemmeno con la fetch
        if (!slug) {
            return;
        }

        setIsLoading(true);
        setError(null);

        fetch(`http://localhost:3000/products/${slug}/suggested`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setSuggestedProducts([]);
                    return;
                }

                setSuggestedProducts(data.results);
            })
            .catch(() => {
                setError("Errore durante il caricamento dei suggeriti.");
                setSuggestedProducts([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [slug]);

    return { suggestedProducts, isLoading, error };
};