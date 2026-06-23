import { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext";

function useWishlist() {
    const context = useContext(WishlistContext);

    if (context === null) {
        throw new Error(
            "useWishlist deve essere usato dentro WishlistProvider."
        );
    }

    return context;
}

export default useWishlist;