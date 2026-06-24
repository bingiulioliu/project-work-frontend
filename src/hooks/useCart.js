import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function useCart() {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart deve essere usato dentro CartProvider.");
    }

    return context;
}

export default useCart;