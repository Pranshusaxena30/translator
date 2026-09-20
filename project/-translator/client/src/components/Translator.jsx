import { useState } from "react";
import { ArrowRightLeft, Sparkles } from "lucide-react";
import Header from "./Header";
import LanguageSelect from "./LanguageSelect";
import TranslationBox from "./TranslationBox";
import { translateText } from "../services/translationApi";

const LANGUAGES = [
  { code: "auto", name: "Detect language" },
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" },
  { code: "ml", name: "Malayalam" },
  { code: "pa", name: "Punjabi" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" }
];

export default function Translator() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("auto");
  const [target, setTarget] = useState("hi");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleTranslate(e) {
    e?.preventDefault();

    if (!text.trim()) {
      setError("Please enter some text to translate.");
      setTranslatedText("");
      return;
    }

    if (source !== "auto" && source === target) {
      setError("Source and target languages must be different.");
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const result = await translateText({
        text: text.trim(),
        source,
        target
      });

      setTranslatedText(result.translation);
    } catch (err) {
      setError(err.message || "Unable to translate. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSwap() {
    if (source === "auto") return;

    setSource(target);
    setTarget(source);

    if (translatedText) {
      setText(translatedText);
      setTranslatedText(text);
    }
  }

  async function handleCopy() {
    if (!translatedText) return;

    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function handleSpeak() {
    if (!translatedText || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = target === "zh-CN" ? "zh-CN" : target;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="page">
      <Header />

      <main className="container">
        <div className="hero">
          <div className="eyebrow">
            <Sparkles size={15} />
            AI-ready translation interface
          </div>
          <h2>Translate anything, instantly.</h2>
          <p>
            Enter your text, choose languages, and get a clear translation in
            seconds.
          </p>
        </div>

        <form className="translator-card" onSubmit={handleTranslate}>
          <div className="language-bar">
            <LanguageSelect
              label="From"
              value={source}
              onChange={setSource}
              languages={LANGUAGES}
            />

            <button
              type="button"
              className="swap-button"
              onClick={handleSwap}
              disabled={source === "auto"}
              title="Swap languages"
              aria-label="Swap languages"
            >
              <ArrowRightLeft size={19} />
            </button>

            <LanguageSelect
              label="To"
              value={target}
              onChange={setTarget}
              languages={LANGUAGES.filter((language) => language.code !== "auto")}
            />
          </div>

          <TranslationBox
            text={text}
            setText={setText}
            translatedText={translatedText}
            onCopy={handleCopy}
            onSpeak={handleSpeak}
          />

          {error && <div className="error-message">{error}</div>}
          {copied && <div className="success-message">Translation copied!</div>}

          <div className="bottom-bar">
            <span className="api-note">
              Powered by Google Cloud Translation API
            </span>

            <button className="translate-button" type="submit" disabled={loading}>
              {loading ? "Translating..." : "Translate"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
