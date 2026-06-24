import { createContext, useEffect, useState } from "react";

const CartContext = createContext(null);

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            return JSON.parse(savedCart);
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(product) {
        setCartItems((currentItems) => {
            const existingProduct = currentItems.find(
                (item) => item.slug === product.slug
            );

            if (existingProduct) {
                return currentItems.map((item) => {
                    if (item.slug === product.slug) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        };
                    }

                    return item;
                });
            }

            return [
                ...currentItems,
                {
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: Number(product.price),
                    image: product.image,
                    rarity: product.rarity,
                    quantity: 1,
                },
            ];
        });
    }

    function removeFromCart(productSlug) {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.slug !== productSlug)
        );
    }

    function increaseQuantity(productSlug) {
        setCartItems((currentItems) =>
            currentItems.map((item) => {
                if (item.slug === productSlug) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }

                return item;
            })
        );
    }

    function decreaseQuantity(productSlug) {
        setCartItems((currentItems) =>
            currentItems
                .map((item) => {
                    if (item.slug === productSlug) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    }

                    return item;
                })
                .filter((item) => item.quantity > 0)
        );
    }

    function updateQuantity(productSlug, quantity) {
        const newQuantity = Number(quantity);

        if (newQuantity <= 0) {
            removeFromCart(productSlug);
            return;
        }

        setCartItems((currentItems) =>
            currentItems.map((item) => {
                if (item.slug === productSlug) {
                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }

                return item;
            })
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    const totalItems = cartItems.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const cartTotal = cartItems.reduce((total, item) => {
        return total + Number(item.price) * item.quantity;
    }, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        totalItems,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };