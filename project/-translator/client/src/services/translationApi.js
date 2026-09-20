const API_URL = import.meta.env.VITE_API_URL || "";

export async function translateText({ text, source, target }) {
  const response = await fetch(`${API_URL}/api/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text, source, target })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Translation failed.");
  }

  return data;
}
