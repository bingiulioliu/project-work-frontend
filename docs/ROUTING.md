# Routing — Frontend

Il routing è gestito con **React Router**, definito in `src/App.jsx`.

## Rotte disponibili

| Rotta | Pagina | Descrizione |
|---|---|---|
| `/` | `HomePage` | Homepage con hero e prodotti in evidenza |
| `/products` | `ProductsList` | Catalogo completo con filtri e paginazione |
| `/products/:slug` | `ProductDetails` | Dettaglio del singolo prodotto (identificato da slug) |
| `/chi-siamo` | `ChiSiamo` | Pagina istituzionale |
| `/preferiti` | `Wishlist` | Elenco prodotti salvati come preferiti |
| `/cart` | `Cart` | Carrello/inventario utente |
| `/checkout` | `Checkout` | Form di completamento ordine |
| `*` | `NotFound` | Fallback per rotte inesistenti |

## Note tecniche

- Il catalogo (`/products`) mantiene i filtri attivi come **query string** nell'URL (es. `?category=pozioni&rarity=leggendario`), rendendo i risultati filtrati condivisibili tramite link diretto.
- Il dettaglio prodotto usa lo **slug** (non l'ID numerico) come parametro di rotta, per URL più leggibili e SEO-friendly.
- `ScrollToTop` (in `src/hooks/`) viene applicato a livello di router per riportare lo scroll in cima ad ogni cambio pagina.

## Possibili estensioni future

- Lazy loading delle pagine con `React.lazy` + `Suspense`, per ridurre il bundle iniziale.
- Rotte "protette" qualora venisse introdotta un'area utente autenticata.