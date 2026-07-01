# Componenti e Pagine — Frontend

## `src/components/`

Componenti riutilizzabili, condivisi tra più pagine.

| Componente | Descrizione |
|---|---|
| `Header.jsx` | Barra di navigazione principale del sito |
| `Footer.jsx` | Footer con link e informazioni istituzionali |
| `ChatbotWidget.jsx` | Widget dell'assistente AI: gestisce sessione, domande preset, invio messaggi e rendering markdown delle risposte |
| `NewsletterBanner.jsx` | Banner/popup di iscrizione alla newsletter |
| `ProductCard.jsx` | Card prodotto riutilizzabile (usata in homepage, catalogo, suggeriti) con azioni rapide (wishlist/carrello) |
| `SuggestedProducts.jsx` | Blocco di prodotti correlati, mostrato nella pagina di dettaglio prodotto |

Ogni componente ha un file `.css` dedicato con lo stesso nome, per mantenere gli stili scoped e facilmente individuabili.

## `src/pages/`

Pagine collegate alle rotte dell'applicazione (vedi [`ROUTING.md`](ROUTING.md)).

| Pagina | Descrizione |
|---|---|
| `HomePage.jsx` | Hero, CTA principali e sezioni prodotti in evidenza (più rari / essenziali) |
| `ProductsList.jsx` | Catalogo completo: filtri, ordinamento, paginazione, sincronizzazione con l'URL |
| `ProductDetails.jsx` | Scheda prodotto completa, azioni su carrello/wishlist, prodotti suggeriti |
| `Cart.jsx` | Gestione del carrello/inventario (quantità, rimozione) |
| `Checkout.jsx` | Form di inserimento dati ordine, invio al backend, stato di successo/errore |
| `Wishlist.jsx` | Elenco dei prodotti salvati come preferiti |
| `ChiSiamo.jsx` | Pagina istituzionale di presentazione del brand e del team |
| `NotFound.jsx` | Pagina di fallback per rotte inesistenti |

## `src/layouts/`

Layout condivisi (es. struttura comune con `Header`/`Footer`) applicati a livello di router in `App.jsx`.

## Convenzioni

- Ogni componente/pagina è accompagnato dal proprio file `.css` con naming identico (`ProductCard.jsx` → `ProductCard.css`), evitando conflitti di stile globali.
- I componenti "presentazionali" (es. `ProductCard`) non contengono chiamate API dirette: ricevono i dati via props dalle pagine che li usano.