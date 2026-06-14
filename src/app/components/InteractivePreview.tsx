import React, { useState } from "react";
import { KbdBadge } from "./KbdBadge";

interface WordEntry {
  text: string;
  id: string;
  tooltip: {
    word: string;
    roman: string;
    meaning: string;
    grammar: string;
  } | null;
}

const arabicSentences: { text: WordEntry[]; translation: string }[] = [
  {
    translation: "The man traveled to the ancient city in the early morning.",
    text: [
      { text: "سافرَ", id: "safara", tooltip: { word: "سافرَ", roman: "sāfara", meaning: "he traveled", grammar: "Verb · past · Form I · masc." } },
      { text: " ", id: "sp1", tooltip: null },
      { text: "الرجلُ", id: "rajul", tooltip: { word: "الرجلُ", roman: "ar-rajulu", meaning: "the man", grammar: "Noun · masc. · nominative" } },
      { text: " إلى ", id: "ila", tooltip: null },
      { text: "المدينةِ", id: "madina", tooltip: { word: "المدينةِ", roman: "al-madīnati", meaning: "the city", grammar: "Noun · fem. · genitive" } },
      { text: " ", id: "sp2", tooltip: null },
      { text: "القديمةِ", id: "qadima", tooltip: { word: "القديمةِ", roman: "al-qadīmati", meaning: "the ancient / old", grammar: "Adj. · fem. · genitive" } },
      { text: " في ", id: "fi", tooltip: null },
      { text: "الصباحِ", id: "sabah", tooltip: { word: "الصباحِ", roman: "aṣ-ṣabāḥi", meaning: "the morning", grammar: "Noun · masc. · genitive" } },
      { text: " ", id: "sp3", tooltip: null },
      { text: "الباكرِ", id: "bakir", tooltip: { word: "الباكرِ", roman: "al-bākiri", meaning: "the early", grammar: "Adj. · masc. · genitive" } },
    ],
  },
  {
    translation: "She wrote a long letter to her friend in the distant village.",
    text: [
      { text: "كتبَت", id: "kataba", tooltip: { word: "كتبَت", roman: "katabat", meaning: "she wrote", grammar: "Verb · past · Form I · fem." } },
      { text: " رسالةً ", id: "risala", tooltip: null },
      { text: "طويلةً", id: "tawila", tooltip: { word: "طويلةً", roman: "ṭawīlatan", meaning: "long", grammar: "Adj. · fem. · accusative" } },
      { text: " إلى ", id: "ila2", tooltip: null },
      { text: "صديقتِها", id: "sadiqa", tooltip: { word: "صديقتِها", roman: "ṣadīqatihā", meaning: "her friend (f.)", grammar: "Noun + pron. suffix · genitive" } },
      { text: " في القريةِ ", id: "qarya", tooltip: null },
      { text: "البعيدةِ", id: "baida", tooltip: { word: "البعيدةِ", roman: "al-baʿīdati", meaning: "the distant / far", grammar: "Adj. · fem. · genitive" } },
    ],
  },
];

const russianSentences: { text: WordEntry[]; translation: string }[] = [
  {
    translation: "He read the book in the quiet library until late evening.",
    text: [
      { text: "Он", id: "on", tooltip: { word: "Он", roman: "on", meaning: "he", grammar: "Pronoun · nominative · 3sg" } },
      { text: " ", id: "sp1", tooltip: null },
      { text: "читал", id: "chital", tooltip: { word: "читал", roman: "chital", meaning: "was reading", grammar: "Verb · past · imperfective · masc." } },
      { text: " ", id: "sp2", tooltip: null },
      { text: "книгу", id: "knigu", tooltip: { word: "книгу", roman: "knigu", meaning: "book", grammar: "Noun · acc. · fem. · sg." } },
      { text: " в ", id: "v", tooltip: null },
      { text: "тихой", id: "tikhoy", tooltip: { word: "тихой", roman: "tikhoy", meaning: "quiet, silent", grammar: "Adj. · prep. · fem. · short" } },
      { text: " ", id: "sp3", tooltip: null },
      { text: "библиотеке", id: "biblio", tooltip: { word: "библиотеке", roman: "biblioteke", meaning: "library", grammar: "Noun · prep. · fem. · sg." } },
      { text: " до позднего вечера.", id: "rest", tooltip: null },
    ],
  },
  {
    translation: "The old professor spoke quietly about the history of language.",
    text: [
      { text: "Старый", id: "stary", tooltip: { word: "Старый", roman: "staryy", meaning: "old", grammar: "Adj. · nom. · masc. · long form" } },
      { text: " ", id: "sp4", tooltip: null },
      { text: "профессор", id: "professor", tooltip: { word: "профессор", roman: "professor", meaning: "professor", grammar: "Noun · nom. · masc. · sg." } },
      { text: " тихо говорил об ", id: "mid", tooltip: null },
      { text: "истории", id: "istorii", tooltip: { word: "истории", roman: "istorii", meaning: "history", grammar: "Noun · prep. · fem. · sg." } },
      { text: " ", id: "sp5", tooltip: null },
      { text: "языка.", id: "yazyka", tooltip: { word: "языка", roman: "yazyka", meaning: "language", grammar: "Noun · gen. · masc. · sg." } },
    ],
  },
];

const persianSentences: { text: WordEntry[]; translation: string }[] = [
  {
    translation: "The traveler looked at the ancient city from the top of the mountain.",
    text: [
      { text: "مسافر", id: "mosâfer", tooltip: { word: "مسافر", roman: "mosâfer", meaning: "traveler", grammar: "Noun · masc. · singular" } },
      { text: " از ", id: "az", tooltip: null },
      { text: "بالای", id: "bâlâ", tooltip: { word: "بالای", roman: "bâlâ-ye", meaning: "top of, above", grammar: "Noun · ezâfe construction" } },
      { text: " ", id: "sp1", tooltip: null },
      { text: "کوه", id: "kuh", tooltip: { word: "کوه", roman: "kuh", meaning: "mountain", grammar: "Noun · masc. · singular" } },
      { text: " به ", id: "be", tooltip: null },
      { text: "شهر", id: "shahr", tooltip: { word: "شهر", roman: "shahr", meaning: "city", grammar: "Noun · masc. · singular" } },
      { text: " ", id: "sp2", tooltip: null },
      { text: "قدیمی", id: "qadimi", tooltip: { word: "قدیمی", roman: "qadimi", meaning: "ancient, old", grammar: "Adj. · attributive · invariable" } },
      { text: " ", id: "sp3", tooltip: null },
      { text: "نگاه", id: "negâh", tooltip: { word: "نگاه", roman: "negâh", meaning: "look, gaze", grammar: "Noun · verbal noun of نگاه کردن" } },
      { text: " کرد.", id: "kard", tooltip: null },
    ],
  },
  {
    translation: "She did not find any peace in that house.",
    text: [
      { text: "او", id: "u", tooltip: { word: "او", roman: "u", meaning: "he / she / it", grammar: "Pronoun · 3sg · gender-neutral" } },
      { text: " در آن ", id: "dar-ân", tooltip: null },
      { text: "خانه", id: "khâne", tooltip: { word: "خانه", roman: "khâne", meaning: "house, home", grammar: "Noun · singular · also used as ezâfe base" } },
      { text: " هیچ ", id: "hich", tooltip: null },
      { text: "آرامشی", id: "ârâmesh", tooltip: { word: "آرامشی", roman: "ârâmeshi", meaning: "peace, calm", grammar: "Noun + indefinite suffix ـی" } },
      { text: " ", id: "sp4", tooltip: null },
      { text: "نیافت.", id: "neyâft", tooltip: { word: "نیافت", roman: "neyâft", meaning: "did not find", grammar: "Verb · past · negative · 3sg · یافتن" } },
    ],
  },
];

interface TooltipData {
  word: string;
  roman: string;
  meaning: string;
  grammar: string;
}

type Lang = "arabic" | "russian" | "persian";

const langConfig: Record<Lang, { label: string; tab: string; isRtl: boolean; sentences: { text: WordEntry[]; translation: string }[]; scriptFont: string }> = {
  arabic:  { label: "Arabic · Modern Standard", tab: "AR", isRtl: true,  sentences: arabicSentences,  scriptFont: "'Noto Naskh Arabic', serif" },
  russian: { label: "Russian · Contemporary",   tab: "RU", isRtl: false, sentences: russianSentences, scriptFont: "'Inter', sans-serif" },
  persian: { label: "Persian · Literary Prose",  tab: "FA", isRtl: true,  sentences: persianSentences, scriptFont: "'Noto Naskh Arabic', serif" },
};

export function InteractivePreview() {
  const [lang, setLang] = useState<Lang>("arabic");
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

  const config = langConfig[lang];

  return (
    <section
      id="features"
      style={{ padding: "120px 24px", background: "#0c0c0f" }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Section header */}
        <div
          className="flex items-center justify-between flex-wrap gap-4 mb-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "20px" }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#2db54e",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            [ Interface Preview · {config.label} ]
          </span>

          {/* Language tabs */}
          <div
            className="flex"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {(Object.keys(langConfig) as Lang[]).map((l, i, arr) => (
              <button
                key={l}
                onClick={() => { setLang(l); setHovered(null); setTooltipData(null); }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  padding: "6px 16px",
                  cursor: "pointer",
                  border: "none",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "all 0.15s ease",
                  background: lang === l ? "#2db54e" : "transparent",
                  color: lang === l ? "#060608" : "#64645e",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                {langConfig[l].tab}
              </button>
            ))}
          </div>
        </div>

        {/* Text panel */}
        <div
          style={{
            background: "#0e0e11",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "40px 48px 40px 56px",
            position: "relative",
          }}
        >
          {/* Line number gutter */}
          <div
            style={{
              position: "absolute",
              left: "0",
              top: "0",
              bottom: "0",
              width: "40px",
              borderRight: "1px solid rgba(255,255,255,0.04)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "42px",
              gap: "2px",
            }}
          >
            {config.sentences.map((_, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  color: "#2e2e32",
                  lineHeight: "1",
                  marginBottom: "28px",
                }}
              >
                {i + 1}
              </span>
            ))}
          </div>

          <div>
            {config.sentences.map((sentence, si) => (
              <div key={si} style={{ marginBottom: si < config.sentences.length - 1 ? "36px" : "0" }}>
                <p
                  dir={config.isRtl ? "rtl" : "ltr"}
                  style={{
                    fontFamily: config.scriptFont,
                    fontSize: config.isRtl ? "24px" : "20px",
                    fontWeight: 400,
                    lineHeight: 1.9,
                    color: "#c4c4be",
                    margin: "0 0 8px 0",
                    wordSpacing: config.isRtl ? "4px" : "normal",
                    position: "relative",
                  }}
                >
                  {sentence.text.map((word) => {
                    if (!word.tooltip) return <span key={word.id}>{word.text}</span>;
                    const isActive = hovered === `${lang}-${si}-${word.id}`;
                    return (
                      <span
                        key={word.id}
                        style={{ position: "relative", display: "inline-block" }}
                        onMouseEnter={() => { setHovered(`${lang}-${si}-${word.id}`); setTooltipData(word.tooltip); }}
                        onMouseLeave={() => { setHovered(null); setTooltipData(null); }}
                      >
                        <span
                          style={{
                            color: isActive ? "#e0e0da" : "#c4c4be",
                            borderBottom: isActive ? "1px solid #2db54e" : "1px solid rgba(45,181,78,0.35)",
                            cursor: "default",
                            transition: "color 0.12s ease, border-color 0.12s ease",
                            paddingBottom: "1px",
                          }}
                        >
                          {word.text}
                        </span>

                        {isActive && word.tooltip && (
                          <span
                            style={{
                              position: "absolute",
                              bottom: "calc(100% + 10px)",
                              [config.isRtl ? "right" : "left"]: "0",
                              background: "#161619",
                              border: "1px solid rgba(45,181,78,0.3)",
                              padding: "10px 14px",
                              whiteSpace: "nowrap",
                              zIndex: 10,
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              direction: "ltr",
                              boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                            }}
                          >
                            <span style={{ fontFamily: config.scriptFont, fontSize: config.isRtl ? "16px" : "14px", color: "#e0e0da", direction: config.isRtl ? "rtl" : "ltr" }}>
                              {word.tooltip.word}
                            </span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#9a9a94", fontStyle: "italic" }}>
                              {word.tooltip.roman}
                            </span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#2db54e" }}>
                              {word.tooltip.meaning}
                            </span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#3e3e38", letterSpacing: "0.04em" }}>
                              {word.tooltip.grammar}
                            </span>
                          </span>
                        )}
                      </span>
                    );
                  })}
                </p>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    color: "#3e3e38",
                    margin: 0,
                    fontStyle: "italic",
                    direction: "ltr",
                  }}
                >
                  {sentence.translation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Keyboard strip */}
        <div
          className="flex items-center gap-6 flex-wrap mt-5"
          style={{ padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <KbdBadge keys={["Hover"]} label="vocabulary" />
          <KbdBadge keys={["T"]} label="transliterate" />
          <KbdBadge keys={["G"]} label="grammar note" />
          <KbdBadge keys={["Space"]} label="next line" />
          <KbdBadge keys={["J", "K"]} label="navigate" />
          <KbdBadge keys={["?"]} label="all shortcuts" />
        </div>
      </div>
    </section>
  );
}
