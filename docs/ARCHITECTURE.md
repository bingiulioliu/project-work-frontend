# Architettura — Frontend

## Panoramica

Il frontend è una **Single Page Application** realizzata in React (Vite), che comunica con il backend esclusivamente tramite API REST in formato JSON.

```
┌──────────────┐        HTTP/JSON        ┌──────────────┐        SQL        ┌──────────┐
│   Frontend   │ ──────────────────────▶ │   Backend    │ ─────────────────▶ │  MySQL   │
│  (React/Vite)│ ◀────────────────────── │  (Express)   │ ◀───────────────── │          │
└──────────────┘                          └──────────────┘                    └──────────┘
```

Il frontend non contiene logica di business: si occupa esclusivamente di presentazione, interazione utente e gestione dello stato lato client. Tutta la logica (validazioni, calcoli, persistenza, invio email, AI) risiede nel backend.

## Comunicazione col backend

Le chiamate API sono centralizzate in `src/utils/` (es. `fetchProducts`, `fetchProduct`, `createOrder`, `chatWithJsonny`), così da:

- evitare duplicazione degli URL degli endpoint nei componenti;
- gestire in un unico punto il parsing della risposta ed eventuali errori;
- rendere più semplice aggiornare il base URL tramite variabili ambiente (`VITE_BACKEND_URL`).

## Pattern generali

- **Routing dichiarativo** con React Router (vedi [`ROUTING.md`](ROUTING.md)).
- **Stato globale via Context API**, non Redux: la complessità dello stato (carrello, wishlist, tema, newsletter) non giustificava una libreria esterna (vedi [`STATE-MANAGEMENT.md`](STATE-MANAGEMENT.md)).
- **Persistenza locale**: carrello e wishlist sono salvati in `localStorage` tramite i rispettivi Context, per sopravvivere al refresh della pagina.
- **Componenti "dumb" riutilizzabili** (es. `ProductCard`) alimentati da pagine "smart" che gestiscono i dati (es. `ProductsList`).
- **Sincronizzazione filtri con URL**: nel emporio i filtri di ricerca sono riflessi nei search params, per permettere la condivisione di un link con filtri già applicati.

## Chatbot AI (JSON's Quest Assistant)

Il widget chat (`ChatbotWidget.jsx`) mantiene una sessione locale persistente (`jsonny_session_id`) e, se l'utente si trova sulla pagina di un prodotto, invia anche il `productSlug` al backend per ottenere risposte contestualizzate.

La funzione `chatWithJsonny.js` gestisce la chiamata HTTP e normalizza la risposta, poiché il payload restituito dal backend può avere shape leggermente diverse a seconda del percorso di risposta (preset vs. AI generativa).

## Perché questa architettura

1. **Frontend e backend indipendenti** → deploy e scaling separati.
2. **Nessuna logica di business duplicata lato client** → una sola fonte di verità (il backend).
3. **Context API invece di librerie di stato pesanti** → complessità dello stato proporzionata alle reali esigenze del progetto.
4. **Chiamate API centralizzate** → più facile manutenere ed estendere.
