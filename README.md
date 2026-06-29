# JSON's Quest

> *Prodotti per la missione quotidiana* — un e-commerce a tema fantasy/RPG, dove ogni acquisto è una quest e ogni prodotto un artefatto della Gilda.

## Indice

- [Panoramica](#panoramica)
- [Homepage](#homepage)
- [Catalogo](#catalogo)
- [Chi siamo](#chi-siamo)
- [Preferiti e Inventario](#preferiti-e-inventario)
- [Pagina dettaglio prodotto](#pagina-dettaglio-prodotto)
- [Funzionalità extra](#funzionalità-extra)

## Panoramica

| Pagina | Funzione principale |
|---|---|
| Homepage | Vetrina del brand e accesso rapido al catalogo |
| Catalogo | Ricerca, filtro e ordinamento di tutti i prodotti |
| Chi siamo | Presentazione del brand, del team e della mission |
| Preferiti / Inventario | Prodotti salvati e posseduti dall'utente |
| Dettaglio prodotto | Scheda completa del prodotto e prodotti suggeriti |

## Homepage

### Hero

- CTA **Inizia l'avventura** → porta al catalogo con tutti i prodotti visibili.
- CTA **Testato sui Goblin** → porta al catalogo già filtrato sulla categoria *Testato sui Goblin*.

### Sezioni in evidenza

Subito sotto la hero, due sezioni con prodotti filtrati automaticamente per categoria:

1. **Oggetti più rari** — prodotti con rarità *Leggendaria*.
2. **Essenziali** — prodotti con il prezzo più basso.

## Catalogo

- Mostra tutti i prodotti, ordinati di default dal più recente.
- **Filtri disponibili**:
  - Ricerca per nome
  - Categoria
  - Range di prezzo
  - Rarità, a multi-selezione: *Comune*, *Raro*, *Leggendario*
- **Ordinamento**: per prezzo oppure per data di pubblicazione (più recente, default).
- **Reset filtri**: azzera tutte le selezioni con un click.
- **Paginazione**: 12 prodotti per pagina.

## Chi siamo

- Presentazione di JSON's Quest e del team.
- Racconto della mission del progetto.
- CTA finale che riporta al catalogo.

## Preferiti e Inventario

- **Preferiti** — prodotti salvati dall'utente per consultarli in seguito.
- **Inventario** — prodotti effettivamente aggiunti (acquistati o posseduti) dall'utente.

## Pagina dettaglio prodotto

- Scheda completa con tutte le informazioni sul prodotto.
- Azioni disponibili sia da qui che dalla card prodotto nel catalogo:
  - Aggiungi a Inventario o Preferiti
  - Aumenta la quantità
  - Rimuovi da Inventario o Preferiti
- **Prodotti suggeriti** — elenco di articoli correlati, associati alle stesse categorie del prodotto mostrato. L'ordine è casuale: i prodotti si rimescolano a ogni refresh della pagina.

## Funzionalità extra

### Chatbot AI

Assistente conversazionale collegato direttamente al database dei prodotti: risponde a domande specifiche su disponibilità, caratteristiche e dettagli degli articoli.

### Newsletter

Popup di iscrizione alla newsletter: inserendo la propria email si riceve automaticamente una mail di benvenuto.

### Checkout

Al termine dell'inserimento delle informazioni d'ordine, l'utente riceve una mail riepilogativa con il dettaglio dell'acquisto.