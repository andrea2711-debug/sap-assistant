const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic.default({ apiKey: process.env.ANTHROPIC_API_KEY });

function loadManuale() {
  const dir = path.join(process.cwd(), "manuale");
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) =>
    [".txt", ".md"].includes(path.extname(f).toLowerCase())
  );
  if (files.length === 0) return null;
  return fs.readFileSync(path.join(dir, files[0]), "utf-8");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Formato non valido" });
  }

  const manuale = loadManuale();
  const systemPrompt = manuale
    ? `Sei un assistente esperto di SAP per il negozio. Rispondi SOLO basandoti sulle informazioni contenute nel manuale qui sotto. Se una procedura non è presente nel manuale, dì chiaramente: "Questa informazione non è presente nel manuale."

Quando spieghi una procedura:
- Elenca i passaggi in modo numerato e chiaro
- Usa un linguaggio semplice e diretto
- Evidenzia eventuali avvertenze importanti

MANUALE SAP:
---
${manuale}
---`
    : `Sei un assistente SAP. Nessun manuale è stato caricato. Comunicalo all'utente.`;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: systemPrompt,
      messages,
    });

    res.status(200).json({ reply: response.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore durante la risposta dell'AI" });
  }
};
