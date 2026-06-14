export type Lang = "arabic" | "russian" | "persian";
export type Level = "A2" | "B1" | "B2" | "C1" | "C2";

export interface LibraryText {
  id: string;
  lang: Lang;
  title: string;
  titleEn: string;
  author: string;
  level: Level;
  words: number;
  readingTime: string;
  excerpt: string;
  tags: string[];
}

export const libraryTexts: LibraryText[] = [
  {
    id: "dostoevsky-idiot-ch1",
    lang: "russian",
    title: "Идиот",
    titleEn: "The Idiot",
    author: "Фёдор Достоевский",
    level: "C1",
    words: 4840,
    readingTime: "38 min",
    excerpt: "Был конец ноября. Часов в девять утра, в исходе ноября, в оттепель, варшавский поезд подходил к Петербургу.",
    tags: ["Fiction", "19th Century", "Novel"],
  },
  {
    id: "chekhov-student",
    lang: "russian",
    title: "Студент",
    titleEn: "The Student",
    author: "Антон Чехов",
    level: "B2",
    words: 980,
    readingTime: "8 min",
    excerpt: "Погода вначале была хорошая, тихая. Кричали дрозды, и по соседству в болотах что-то живое жалобно гудело.",
    tags: ["Fiction", "Short Story", "19th Century"],
  },
  {
    id: "1001-nights-sinbad",
    lang: "arabic",
    title: "سندباد البحري",
    titleEn: "Sinbad the Sailor",
    author: "ألف ليلة وليلة",
    level: "B1",
    words: 1620,
    readingTime: "13 min",
    excerpt: "كانَ في قديمِ الزمانِ وسالفِ العصرِ والأوانِ تاجرٌ كثيرُ المالِ والتجاراتِ.",
    tags: ["Prose", "Classical", "Narrative"],
  },
  {
    id: "quran-fatiha",
    lang: "arabic",
    title: "سورة الفاتحة",
    titleEn: "Al-Fatiha",
    author: "القرآن الكريم",
    level: "A2",
    words: 29,
    readingTime: "2 min",
    excerpt: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.",
    tags: ["Religious", "Classical", "Poetry"],
  },
  {
    id: "arabic-news-politics",
    lang: "arabic",
    title: "السياسة الدولية",
    titleEn: "International Politics",
    author: "الجزيرة",
    level: "C1",
    words: 2100,
    readingTime: "17 min",
    excerpt: "تشهد العلاقات الدولية تحولات جوهرية في ظل التنافس المتصاعد بين القوى الكبرى على النفوذ الاقتصادي والسياسي.",
    tags: ["Journalism", "Modern", "Formal"],
  },
  {
    id: "hafez-ghazal",
    lang: "persian",
    title: "غزل حافظ",
    titleEn: "Ghazal of Hafez",
    author: "خواجه شمس‌الدین حافظ",
    level: "C2",
    words: 140,
    readingTime: "5 min",
    excerpt: "الا یا ایها الساقی ادر کأساً و ناولها ‌که عشق آسان نمود اول ولی افتاد مشکل‌ها",
    tags: ["Poetry", "Classical", "14th Century"],
  },
  {
    id: "sadeghi-hedayat",
    lang: "persian",
    title: "بوف کور",
    titleEn: "The Blind Owl",
    author: "صادق هدایت",
    level: "C1",
    words: 3200,
    readingTime: "26 min",
    excerpt: "در زندگی زخم‌هایی هست که مثل خوره روح را آهسته در انزوا می‌خورد و می‌تراشد.",
    tags: ["Fiction", "Modernist", "20th Century"],
  },
  {
    id: "tolstoy-anna-ch1",
    lang: "russian",
    title: "Анна Каренина",
    titleEn: "Anna Karenina",
    author: "Лев Толстой",
    level: "C2",
    words: 5400,
    readingTime: "43 min",
    excerpt: "Все счастливые семьи похожи друг на друга, каждая несчастливая семья несчастлива по-своему.",
    tags: ["Fiction", "19th Century", "Novel"],
  },
];

export const langColors: Record<Lang, string> = {
  russian: "#4a8fd4",
  arabic: "#c8a84b",
  persian: "#c0706a",
};

export const langLabels: Record<Lang, string> = {
  russian: "RU",
  arabic: "AR",
  persian: "FA",
};
