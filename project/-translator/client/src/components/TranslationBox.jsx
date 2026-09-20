import { Copy, Volume2 } from "lucide-react";

export default function TranslationBox({
  text,
  setText,
  translatedText,
  onCopy,
  onSpeak
}) {
  return (
    <div className="translation-grid">
      <section className="text-card">
        <div className="card-title">
          <span>Original text</span>
          <span className="counter">{text.length} / 5000</span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 5000))}
          placeholder="Type or paste text here..."
          aria-label="Text to translate"
        />
      </section>

      <section className="text-card output-card">
        <div className="card-title">
          <span>Translation</span>

          <div className="actions">
            <button
              type="button"
              className="icon-button"
              onClick={onSpeak}
              disabled={!translatedText}
              title="Listen"
              aria-label="Listen to translation"
            >
              <Volume2 size={18} />
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={onCopy}
              disabled={!translatedText}
              title="Copy"
              aria-label="Copy translation"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        <div className={`translation-result ${!translatedText ? "empty" : ""}`}>
          {translatedText || "Your translated text will appear here..."}
        </div>
      </section>
    </div>
  );
}
