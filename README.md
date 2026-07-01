# JSON's Quest — Frontend

> SPA React (Vite) per **JSON's Quest**, l'e-commerce a tema fantasy/RPG. Consuma le API REST esposte dal backend Express/MySQL ([repo separata](../project-work-backend)).

*"Le risposte alle tue API, l'equipaggiamento per le tue battaglie."*

---

## 📐 Stack tecnologico

- **Framework**: React + Vite
- **Routing**: React Router
- **Stato globale**: Context API (carrello, wishlist, tema, newsletter)
- **Package manager**: pnpm
- **Linting**: ESLint

---

## 🗂️ Struttura del progetto

```
project-work-frontend/
├── public/
├── src/
│   ├── assets/              # Immagini, font, risorse statiche
│   ├── components/          # Componenti riutilizzabili (UI)
│   ├── contexts/            # Context API per lo stato globale
│   ├── hooks/                # Custom hook
│   ├── layouts/              # Layout condivisi tra pagine
│   ├── pages/                 # Pagine/route dell'applicazione
│   ├── styles/                # Stili globali
│   ├── utils/                  # Funzioni di utilità e chiamate API
│   ├── App.jsx                  # Definizione router e provider globali
│   └── main.jsx                  # Entry point React
├── index.html
├── eslint.config.js
├── package.json
└── pnpm-lock.yaml
```

---

## 🚀 Setup rapido

### Prerequisiti
- Node.js (versione LTS consigliata)
- pnpm
- Backend JSON's Quest avviato [`https://github.com/bingiulioliu/project-work-backend`](Repo Backend)

### Installazione

```bash
pnpm install
```
---

## 📚 Documentazione

| Documento | Contenuto |
|---|---|
| [`docs/FEATURES.md`](docs/FEATURES.md) | Tour del prodotto: pagine, funzionalità e flussi utente |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Come il frontend comunica col backend e pattern generali |
| [`docs/COMPONENTS.md`](docs/COMPONENTS.md) | Mappa di componenti e pagine |
| [`docs/STATE-MANAGEMENT.md`](docs/STATE-MANAGEMENT.md) | Context API e custom hook |
| [`docs/ROUTING.md`](docs/ROUTING.md) | Rotte dell'applicazione |

---