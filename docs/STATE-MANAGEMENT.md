# Gestione dello Stato — Frontend

Lo stato globale è gestito tramite **Context API** di React, senza librerie esterne (Redux, Zustand, ecc.), poiché la complessità dello stato applicativo non lo richiede.

## `src/contexts/`

| Context | Responsabilità |
|---|---|
| `CartContext.jsx` | Contenuto del carrello: aggiunta/rimozione prodotti, quantità, totali. Persistito in `localStorage`. |
| `WishlistContext.jsx` | Prodotti preferiti salvati dall'utente. Persistito in `localStorage`. |
| `ThemeContext.jsx` | Tema dell'applicazione (es. chiaro/scuro, se previsto). |
| `NewsletterContext.jsx` | Stato del popup/banner di iscrizione newsletter (es. se già mostrato/chiuso). |

## `src/hooks/`

Custom hook che espongono un'API pulita per accedere ai rispettivi Context, evitando di importare `useContext` e il Context stesso in ogni componente.

| Hook | Espone |
|---|---|
| `useCart.js` | Stato e azioni del carrello (`addToCart`, `removeFromCart`, `updateQuantity`, totali) |
| `useWishlist.js` | Stato e azioni della wishlist (`addToWishlist`, `removeFromWishlist`) |
| `useTheme.js` | Tema corrente e funzione per cambiarlo |
| `useNewsletter.js` | Stato del banner newsletter e funzioni di apertura/chiusura |
| `ScrollToTop.jsx` | Hook/componente di utilità per riportare lo scroll in cima ad ogni cambio rotta |

## Perché Context API e non una libreria di stato esterna

- Lo stato condiviso riguarda un numero limitato di domini (carrello, wishlist, tema, newsletter), ciascuno con logica semplice.
- Evita una dipendenza aggiuntiva e la relativa curva di apprendimento, mantenendo il progetto più leggero.
- I custom hook (`useCart`, `useWishlist`, ecc.) offrono comunque un'API ergonomica, paragonabile a quella di una libreria di stato dedicata.

## Persistenza

`CartContext` e `WishlistContext` sincronizzano il proprio stato con `localStorage`, così che carrello e preferiti sopravvivano al refresh della pagina e alla chiusura del browser.