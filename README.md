# 🤖 Assistente SAP — Guida all'installazione

## Struttura del progetto

```
sap-assistant/
├── api/
│   └── chat.js          ← Backend (chiamate all'AI)
├── public/
│   └── index.html       ← Interfaccia web
├── manuale/
│   └── manuale.txt      ← ⬅️ METTI QUI IL TUO MANUALE
├── package.json
└── vercel.json
```

---

## Passo 1 — Prepara il manuale

Metti il tuo manuale SAP nella cartella `manuale/`.

- Se hai un **PDF**: aprilo, seleziona tutto il testo (Ctrl+A), copialo e incollalo in un file `manuale.txt`
- Se hai già un file `.txt` o `.md`: copialo direttamente nella cartella `manuale/`

> Il file deve chiamarsi con estensione `.txt` o `.md`

---

## Passo 2 — Crea un account Vercel

1. Vai su [vercel.com](https://vercel.com) e clicca **Sign Up**
2. Registrati con GitHub (è gratis)

---

## Passo 3 — Carica il progetto su GitHub

1. Vai su [github.com](https://github.com) e crea un account (se non ce l'hai)
2. Crea un nuovo repository chiamato `sap-assistant`
3. Carica tutti i file del progetto (trascina i file nell'interfaccia web di GitHub)

---

## Passo 4 — Connetti Vercel a GitHub

1. Su Vercel, clicca **Add New Project**
2. Seleziona il repository `sap-assistant` da GitHub
3. Clicca **Deploy** (Vercel configurerà tutto automaticamente)

---

## Passo 5 — Aggiungi la chiave API Anthropic

1. Vai su [console.anthropic.com](https://console.anthropic.com) → **API Keys** → crea una nuova chiave
2. Su Vercel, vai nel tuo progetto → **Settings** → **Environment Variables**
3. Aggiungi:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: la chiave che hai copiato
4. Clicca **Save** e poi **Redeploy** il progetto

---

## ✅ Fatto!

Vercel ti darà un link tipo `https://sap-assistant-xxx.vercel.app` — condividilo con i tuoi colleghi!

---

## Come aggiornare il manuale

1. Sostituisci il file nella cartella `manuale/`
2. Carica il nuovo file su GitHub
3. Vercel si aggiorna automaticamente in pochi secondi

---

## Problemi comuni

| Problema | Soluzione |
|----------|-----------|
| "Manuale non configurato" | Controlla che ci sia un file `.txt` nella cartella `manuale/` |
| Errore 500 | Verifica che la variabile `ANTHROPIC_API_KEY` sia impostata su Vercel |
| Risposte lente | Normale, dipende dalla lunghezza del manuale | 
