import { createContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");

        if (savedWishlist) {
            return JSON.parse(savedWishlist);
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    function addToWishlist(product) {
        setWishlist((currentWishlist) => {
            const alreadyExists = currentWishlist.some(
                (wishlistProduct) => wishlistProduct.slug === product.slug
            );

            if (alreadyExists) {
                return currentWishlist;
            }

            return [...currentWishlist, product];
        });
    }

    function removeFromWishlist(productSlug) {
        setWishlist((currentWishlist) =>
            currentWishlist.filter((product) => product.slug !== productSlug)
        );
    }

    function toggleWishlist(product) {
        const alreadyExists = wishlist.some(
            (wishlistProduct) => wishlistProduct.slug === product.slug
        );

        if (alreadyExists) {
            removeFromWishlist(product.slug);
            return;
        }

        addToWishlist(product);
    }

    function isInWishlist(productSlug) {
        return wishlist.some((product) => product.slug === productSlug);
    }

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

export { WishlistContext, WishlistProvider };