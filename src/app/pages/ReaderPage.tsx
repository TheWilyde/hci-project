import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";
import { KbdBadge } from "../components/KbdBadge";

interface WordToken {
  text: string;
  id: string;
  isSpace?: boolean;
  tooltip?: {
    word: string;
    roman: string;
    meaning: string;
    grammar: string;
  };
}

interface TextLine {
  tokens: WordToken[];
  translation: string;
}

interface TextData {
  id: string;
  lang: "arabic" | "russian" | "persian";
  title: string;
  titleEn: string;
  author: string;
  level: string;
  lines: TextLine[];
}

const textDatabase: Record<string, TextData> = {
  "chekhov-student": {
    id: "chekhov-student",
    lang: "russian",
    title: "Студент",
    titleEn: "The Student",
    author: "Антон Чехов",
    level: "B2",
    lines: [
      {
        translation: "The weather at first was fine, quiet.",
        tokens: [
          { text: "Погода", id: "pogoda", tooltip: { word: "Погода", roman: "Pogoda", meaning: "weather", grammar: "Noun · nom. · fem. · sg." } },
          { text: " вначале ", id: "sp1" },
          { text: "была", id: "byla", tooltip: { word: "была", roman: "byla", meaning: "was", grammar: "Verb · past · fem. · быть" } },
          { text: " ", id: "sp2" },
          { text: "хорошая", id: "horoshaya", tooltip: { word: "хорошая", roman: "khoroshaya", meaning: "good, fine", grammar: "Adj. · nom. · fem. · long form" } },
          { text: ", тихая.", id: "tikhaya" },
        ],
      },
      {
        translation: "Thrushes were calling, and nearby in the marshes something living was humming plaintively.",
        tokens: [
          { text: "Кричали", id: "krichali", tooltip: { word: "Кричали", roman: "Krichali", meaning: "were calling, crying out", grammar: "Verb · past · pl. · impf." } },
          { text: " ", id: "sp3" },
          { text: "дрозды", id: "drozdy", tooltip: { word: "дрозды", roman: "drozdy", meaning: "thrushes", grammar: "Noun · nom. · masc. · pl." } },
          { text: ", и по соседству в болотах что-то живое жалобно ", id: "mid" },
          { text: "гудело", id: "gudelo", tooltip: { word: "гудело", roman: "gudelo", meaning: "was humming, droning", grammar: "Verb · past · neut. · impf." } },
          { text: ".", id: "dot" },
        ],
      },
      {
        translation: "A student from a theological academy, the son of a deacon, named Ivan Velikopolsky, was returning home from a hunt along the footpath through the water-meadow.",
        tokens: [
          { text: "Студент", id: "student", tooltip: { word: "Студент", roman: "Student", meaning: "student", grammar: "Noun · nom. · masc. · sg." } },
          { text: " ", id: "sp4" },
          { text: "духовной", id: "dukhovnoy", tooltip: { word: "духовной", roman: "dukhovnoy", meaning: "spiritual, theological", grammar: "Adj. · gen. · fem." } },
          { text: " академии, сын ", id: "mid1" },
          { text: "дьячка", id: "dyachka", tooltip: { word: "дьячка", roman: "dyachka", meaning: "deacon, church reader", grammar: "Noun · gen. · masc. · sg." } },
          { text: ", Иван Великопольский шёл домой с охоты по заливному лугу.", id: "rest1" },
        ],
      },
      {
        translation: "He felt that this loneliness, this darkness, this feeling of orphanhood and emptiness in people — all this was terrible.",
        tokens: [
          { text: "Он ", id: "on" },
          { text: "чувствовал", id: "chuvstvoval", tooltip: { word: "чувствовал", roman: "chuvstvoval", meaning: "felt, sensed", grammar: "Verb · past · masc. · impf. · чувствовать" } },
          { text: ", что это ", id: "pre" },
          { text: "одиночество", id: "odin", tooltip: { word: "одиночество", roman: "odinochestvo", meaning: "loneliness, solitude", grammar: "Noun · nom. · neut. · sg." } },
          { text: ", эта ", id: "sp5" },
          { text: "тьма", id: "tma", tooltip: { word: "тьма", roman: "t'ma", meaning: "darkness", grammar: "Noun · nom. · fem. · sg." } },
          { text: ", это чувство ", id: "sp6" },
          { text: "заброшенности", id: "zabr", tooltip: { word: "заброшенности", roman: "zabroshennosti", meaning: "abandonment, neglect", grammar: "Noun · gen. · fem. · sg." } },
          { text: " и пустоты в людях, — всё это было ", id: "mid2" },
          { text: "страшно", id: "strashno", tooltip: { word: "страшно", roman: "strashno", meaning: "terrible, frightening", grammar: "Adv. / pred. · neut. short form" } },
          { text: ".", id: "dot2" },
        ],
      },
    ],
  },
  "1001-nights-sinbad": {
    id: "1001-nights-sinbad",
    lang: "arabic",
    title: "سندباد البحري",
    titleEn: "Sinbad the Sailor",
    author: "ألف ليلة وليلة",
    level: "B1",
    lines: [
      {
        translation: "Once upon a time, there was a wealthy merchant with many possessions and trades.",
        tokens: [
          { text: "كانَ", id: "kana", tooltip: { word: "كانَ", roman: "kāna", meaning: "there was / was", grammar: "Verb · past · Form I · 3sg masc." } },
          { text: " في قديمِ الزمانِ ", id: "sp1" },
          { text: "تاجرٌ", id: "tajir", tooltip: { word: "تاجرٌ", roman: "tājirun", meaning: "a merchant", grammar: "Noun · masc. · nom. · indef." } },
          { text: " ", id: "sp2" },
          { text: "كثيرُ", id: "kathir", tooltip: { word: "كثيرُ", roman: "kathīru", meaning: "abundant in", grammar: "Adj. · nom. · construct state" } },
          { text: " المالِ والتجاراتِ.", id: "rest" },
        ],
      },
      {
        translation: "He had a son whom he named Sinbad.",
        tokens: [
          { text: "وكانَ له ", id: "pre" },
          { text: "ابنٌ", id: "ibn", tooltip: { word: "ابنٌ", roman: "ibnun", meaning: "a son", grammar: "Noun · masc. · nom. · indef." } },
          { text: " ", id: "sp3" },
          { text: "سمّاهُ", id: "sammahu", tooltip: { word: "سمّاهُ", roman: "sammāhu", meaning: "he named him", grammar: "Verb · past · Form II · transitive + obj. pron." } },
          { text: " ", id: "sp3b" },
          { text: "سِنْدِباد", id: "sinbad", tooltip: { word: "سِنْدِباد", roman: "Sindbād", meaning: "Sinbad (proper name)", grammar: "Proper noun · foreign origin" } },
          { text: ".", id: "dot" },
        ],
      },
      {
        translation: "When the boy grew up and his father died, he inherited a great fortune.",
        tokens: [
          { text: "فلمّا ", id: "pre2" },
          { text: "كَبِرَ", id: "kabira", tooltip: { word: "كَبِرَ", roman: "kabira", meaning: "grew up, became older", grammar: "Verb · past · Form I · 3sg masc." } },
          { text: " ", id: "sp4" },
          { text: "الولدُ", id: "walad", tooltip: { word: "الولدُ", roman: "al-waladu", meaning: "the boy, the child", grammar: "Noun · masc. · nom. · def." } },
          { text: " ", id: "sp4b" },
          { text: "وماتَ", id: "mata", tooltip: { word: "وماتَ", roman: "wa-māta", meaning: "and (he) died", grammar: "Conj. + Verb · past · Form I" } },
          { text: " أبوهُ، ", id: "sp5" },
          { text: "وَرِثَ", id: "waritha", tooltip: { word: "وَرِثَ", roman: "waritha", meaning: "inherited", grammar: "Verb · past · Form I · 3sg masc." } },
          { text: " ", id: "sp5b" },
          { text: "ثروةً", id: "tharwa", tooltip: { word: "ثروةً", roman: "thrawatan", meaning: "a fortune, wealth", grammar: "Noun · fem. · acc. · indef." } },
          { text: " ", id: "sp5c" },
          { text: "عظيمةً", id: "azima", tooltip: { word: "عظيمةً", roman: "ʿaẓīmatan", meaning: "great, enormous", grammar: "Adj. · fem. · acc. · indef." } },
          { text: ".", id: "rest2" },
        ],
      },
    ],
  },
  "dostoevsky-idiot-ch1": {
    id: "dostoevsky-idiot-ch1",
    lang: "russian",
    title: "Идиот",
    titleEn: "The Idiot",
    author: "Фёдор Достоевский",
    level: "C1",
    lines: [
      {
        translation: "It was the end of November.",
        tokens: [
          { text: "Был", id: "byl", tooltip: { word: "Был", roman: "Byl", meaning: "was, it was", grammar: "Verb · past · masc. · быть" } },
          { text: " ", id: "sp1" },
          { text: "конец", id: "konets", tooltip: { word: "конец", roman: "konets", meaning: "end", grammar: "Noun · nom. · masc. · sg." } },
          { text: " ", id: "sp2" },
          { text: "ноября", id: "noyabrya", tooltip: { word: "ноября", roman: "noyabrya", meaning: "of November", grammar: "Noun · gen. · masc. · sg." } },
          { text: ".", id: "dot" },
        ],
      },
      {
        translation: "At around nine in the morning, towards the end of November, during a thaw, the Warsaw train was approaching Petersburg.",
        tokens: [
          { text: "Часов в девять утра, в ", id: "pre" },
          { text: "исходе", id: "iskhode", tooltip: { word: "исходе", roman: "iskhode", meaning: "end, close (of a period)", grammar: "Noun · prep. · masc. · sg. · archaic" } },
          { text: " ноября, в ", id: "sp3" },
          { text: "оттепель", id: "ottepel", tooltip: { word: "оттепель", roman: "ottepel'", meaning: "thaw, mild spell", grammar: "Noun · acc. · fem. · sg." } },
          { text: ", ", id: "sp4" },
          { text: "варшавский", id: "varshavsky", tooltip: { word: "варшавский", roman: "varshavskiy", meaning: "Warsaw (adj.)", grammar: "Adj. · nom. · masc. · long form" } },
          { text: " поезд ", id: "sp5" },
          { text: "подходил", id: "podkhodil", tooltip: { word: "подходил", roman: "podkhodil", meaning: "was approaching", grammar: "Verb · past · masc. · impf. · подходить" } },
          { text: " к Петербургу.", id: "rest" },
        ],
      },
      {
        translation: "It was already thawing for two days; the roads were all mud, and there was a thick wet fog.",
        tokens: [
          { text: "Уже два дня ", id: "pre2" },
          { text: "оттепелило", id: "ottepelilo", tooltip: { word: "оттепелило", roman: "ottepelilo", meaning: "it had been thawing", grammar: "Verb · past · neut. · impersonal · impf." } },
          { text: "; дороги обледенели, снег ", id: "sp6" },
          { text: "падал", id: "padal", tooltip: { word: "падал", roman: "padal", meaning: "was falling", grammar: "Verb · past · masc. · impf. · падать" } },
          { text: " хлопьями и лежал пушисто.", id: "rest2" },
        ],
      },
      {
        translation: "In the third-class car, two passengers had been sitting opposite each other since dawn.",
        tokens: [
          { text: "В ", id: "v" },
          { text: "вагоне", id: "vagone", tooltip: { word: "вагоне", roman: "vagone", meaning: "car, railway carriage", grammar: "Noun · prep. · masc. · sg." } },
          { text: " третьего класса, с самой зари, ", id: "sp7" },
          { text: "сидели", id: "sideli", tooltip: { word: "сидели", roman: "sideli", meaning: "were sitting", grammar: "Verb · past · pl. · impf. · сидеть" } },
          { text: " друг против друга, у самого окна, два ", id: "sp8" },
          { text: "пассажира", id: "passajira", tooltip: { word: "пассажира", roman: "passazhira", meaning: "passengers (gen. dual)", grammar: "Noun · gen. · masc. · sg. (after два)" } },
          { text: ".", id: "dot3" },
        ],
      },
    ],
  },
  "quran-fatiha": {
    id: "quran-fatiha",
    lang: "arabic",
    title: "سورة الفاتحة",
    titleEn: "Al-Fatiha",
    author: "القرآن الكريم",
    level: "A2",
    lines: [
      {
        translation: "In the name of God, the Most Gracious, the Most Merciful.",
        tokens: [
          { text: "بِسْمِ", id: "bism", tooltip: { word: "بِسْمِ", roman: "bismi", meaning: "in the name of", grammar: "Prep. بِ + Noun اسم · gen. · construct" } },
          { text: " ", id: "sp1" },
          { text: "اللَّهِ", id: "allah", tooltip: { word: "اللَّهِ", roman: "Allāhi", meaning: "God, Allah", grammar: "Proper noun · gen. (after bismi)" } },
          { text: " ", id: "sp2" },
          { text: "الرَّحْمَٰنِ", id: "rahman", tooltip: { word: "الرَّحْمَٰنِ", roman: "ar-Raḥmāni", meaning: "the Most Gracious", grammar: "Adj. · masc. · gen. · superlative form" } },
          { text: " ", id: "sp3" },
          { text: "الرَّحِيمِ", id: "rahim", tooltip: { word: "الرَّحِيمِ", roman: "ar-Raḥīmi", meaning: "the Most Merciful", grammar: "Adj. · masc. · gen. · intensive form" } },
        ],
      },
      {
        translation: "All praise is due to God, Lord of all the worlds.",
        tokens: [
          { text: "الْحَمْدُ", id: "hamd", tooltip: { word: "الْحَمْدُ", roman: "al-ḥamdu", meaning: "all praise, gratitude", grammar: "Noun · masc. · nom. · def." } },
          { text: " ", id: "sp4" },
          { text: "لِلَّهِ", id: "lillah", tooltip: { word: "لِلَّهِ", roman: "lillāhi", meaning: "belongs to God", grammar: "Prep. لِ + Allah · gen." } },
          { text: " ", id: "sp5" },
          { text: "رَبِّ", id: "rabb", tooltip: { word: "رَبِّ", roman: "rabbi", meaning: "Lord of", grammar: "Noun · gen. · construct state" } },
          { text: " ", id: "sp6" },
          { text: "الْعَالَمِينَ", id: "aalamin", tooltip: { word: "الْعَالَمِينَ", roman: "al-ʿālamīna", meaning: "all the worlds, all creation", grammar: "Noun · masc. pl. · gen. · def." } },
        ],
      },
      {
        translation: "The Most Gracious, the Most Merciful.",
        tokens: [
          { text: "الرَّحْمَٰنِ", id: "rahman2", tooltip: { word: "الرَّحْمَٰنِ", roman: "ar-Raḥmāni", meaning: "the Most Gracious", grammar: "Adj. · masc. · gen. · def." } },
          { text: " ", id: "sp7" },
          { text: "الرَّحِيمِ", id: "rahim2", tooltip: { word: "الرَّحِيمِ", roman: "ar-Raḥīmi", meaning: "the Most Merciful", grammar: "Adj. · masc. · gen. · def." } },
        ],
      },
      {
        translation: "Master of the Day of Judgement.",
        tokens: [
          { text: "مَالِكِ", id: "malik", tooltip: { word: "مَالِكِ", roman: "māliki", meaning: "master, owner of", grammar: "Noun · gen. · construct state · active participle" } },
          { text: " ", id: "sp8" },
          { text: "يَوْمِ", id: "yawm", tooltip: { word: "يَوْمِ", roman: "yawmi", meaning: "day of", grammar: "Noun · masc. · gen. · construct state" } },
          { text: " ", id: "sp9" },
          { text: "الدِّينِ", id: "deen", tooltip: { word: "الدِّينِ", roman: "ad-dīni", meaning: "the judgement, the religion", grammar: "Noun · masc. · gen. · def." } },
        ],
      },
      {
        translation: "It is You we worship, and it is You we ask for help.",
        tokens: [
          { text: "إِيَّاكَ", id: "iyyaka", tooltip: { word: "إِيَّاكَ", roman: "iyyāka", meaning: "You (alone), it is You", grammar: "Detached object pronoun · 2sg · emphatic" } },
          { text: " ", id: "sp10" },
          { text: "نَعْبُدُ", id: "nabud", tooltip: { word: "نَعْبُدُ", roman: "naʿbudu", meaning: "we worship", grammar: "Verb · present · 1pl · Form I · عبد" } },
          { text: " وَإِيَّاكَ ", id: "sp11" },
          { text: "نَسْتَعِينُ", id: "nastain", tooltip: { word: "نَسْتَعِينُ", roman: "nastaʿīnu", meaning: "we seek help", grammar: "Verb · present · 1pl · Form X · عون" } },
        ],
      },
    ],
  },
  "arabic-news-politics": {
    id: "arabic-news-politics",
    lang: "arabic",
    title: "السياسة الدولية",
    titleEn: "International Politics",
    author: "الجزيرة",
    level: "C1",
    lines: [
      {
        translation: "International relations are witnessing fundamental transformations amid the escalating competition between major powers for economic and political influence.",
        tokens: [
          { text: "تشهدُ", id: "tashhad", tooltip: { word: "تشهدُ", roman: "tashHadu", meaning: "is witnessing, experiencing", grammar: "Verb · present · 3sg fem. · Form I · شهد" } },
          { text: " ", id: "sp1" },
          { text: "العلاقاتُ", id: "alaqat", tooltip: { word: "العلاقاتُ", roman: "al-ʿalāqātu", meaning: "the relations", grammar: "Noun · fem. pl. · nom. · def." } },
          { text: " ", id: "sp2" },
          { text: "الدوليةُ", id: "dawliya", tooltip: { word: "الدوليةُ", roman: "ad-dawliyyatu", meaning: "international", grammar: "Adj. · fem. · nom. · def." } },
          { text: " ", id: "sp3" },
          { text: "تحولاتٍ", id: "tahawwulat", tooltip: { word: "تحولاتٍ", roman: "taḥawwulātin", meaning: "transformations, shifts", grammar: "Noun · fem. pl. · acc. · indef. · masdar pl." } },
          { text: " ", id: "sp4" },
          { text: "جوهريةً", id: "jawhariya", tooltip: { word: "جوهريةً", roman: "jawhariyyatan", meaning: "fundamental, essential", grammar: "Adj. · fem. · acc. · indef." } },
          { text: " في ظل ", id: "sp5" },
          { text: "التنافسِ", id: "tanafus", tooltip: { word: "التنافسِ", roman: "at-tanāfusi", meaning: "the competition, rivalry", grammar: "Noun · masc. · gen. · def. · Form VI masdar" } },
          { text: " المتصاعدِ بين القوى الكبرى على النفوذِ الاقتصاديِّ والسياسيِّ.", id: "rest" },
        ],
      },
      {
        translation: "Analysts believe that these transformations reflect a deep shift in the balance of global power.",
        tokens: [
          { text: "ويرى", id: "yara", tooltip: { word: "ويرى", roman: "wa-yarā", meaning: "and (they) believe, see", grammar: "Conj. + Verb · present · 3pl masc. · Form I · رأى" } },
          { text: " ", id: "sp6" },
          { text: "المحللون", id: "muhalilun", tooltip: { word: "المحللون", roman: "al-muḥallilūna", meaning: "the analysts", grammar: "Noun · masc. pl. · nom. · def. · Form II active part." } },
          { text: " أن هذه ", id: "sp7" },
          { text: "التحولات", id: "tahawwulat2", tooltip: { word: "التحولات", roman: "at-taḥawwulāt", meaning: "the transformations", grammar: "Noun · fem. pl. · acc. · def." } },
          { text: " تعكس ", id: "sp8" },
          { text: "تحولاً", id: "tahawwulan", tooltip: { word: "تحولاً", roman: "taḥawwulan", meaning: "a shift, transformation", grammar: "Noun · masc. · acc. · indef." } },
          { text: " عميقاً في ", id: "sp9" },
          { text: "موازين", id: "mawazeen", tooltip: { word: "موازين", roman: "mawāzīn", meaning: "balances, scales", grammar: "Noun · masc. pl. · gen. · indef." } },
          { text: " القوى العالمية.", id: "rest2" },
        ],
      },
      {
        translation: "This competition is no longer limited to military power alone, but has expanded to include technology, artificial intelligence, and control of global supply chains.",
        tokens: [
          { text: "ولم يعد هذا ", id: "pre3" },
          { text: "التنافسُ", id: "tanafus2", tooltip: { word: "التنافسُ", roman: "at-tanāfusu", meaning: "the competition", grammar: "Noun · masc. · nom. · def." } },
          { text: " مقتصراً على ", id: "sp10" },
          { text: "القوةِ", id: "quwwa", tooltip: { word: "القوةِ", roman: "al-quwwati", meaning: "the power, force", grammar: "Noun · fem. · gen. · def." } },
          { text: " العسكريةِ وحدَها، بل امتدّ ليشمل ", id: "sp11" },
          { text: "التكنولوجيا", id: "technology", tooltip: { word: "التكنولوجيا", meaning: "technology", roman: "at-tiknūlūjiyā", grammar: "Noun · fem. · acc. · def. · loanword" } },
          { text: " والذكاء ", id: "sp12" },
          { text: "الاصطناعي", id: "artificial", tooltip: { word: "الاصطناعي", roman: "al-iṣṭināʿī", meaning: "artificial", grammar: "Adj. · masc. · gen. · def." } },
          { text: " والسيطرة على سلاسل الإمداد العالمية.", id: "rest3" },
        ],
      },
    ],
  },
  "hafez-ghazal": {
    id: "hafez-ghazal",
    lang: "persian",
    title: "غزل حافظ",
    titleEn: "Ghazal of Hafez",
    author: "خواجه شمس‌الدین حافظ",
    level: "C2",
    lines: [
      {
        translation: "O cupbearer, pass around the cup and offer it — for love seemed easy at first, but difficulties have arisen.",
        tokens: [
          { text: "الا یا ایها الساقی", id: "saqi", tooltip: { word: "الساقی", roman: "as-sāqī", meaning: "the cupbearer", grammar: "Noun · Arabic borrowing · masc. · def." } },
          { text: " ", id: "sp1" },
          { text: "ادر", id: "adar", tooltip: { word: "ادر", roman: "adir", meaning: "pass around (the cup)", grammar: "Verb · Arabic imperative · Form IV · دور" } },
          { text: " کأساً و ", id: "sp2" },
          { text: "ناولها", id: "navalha", tooltip: { word: "ناولها", roman: "nāwilhā", meaning: "offer it, hand it over", grammar: "Verb · Arabic imperative + obj. pronoun · Form III" } },
        ],
      },
      {
        translation: "For love seemed easy at first, but then difficulties arose.",
        tokens: [
          { text: "که ", id: "ke", tooltip: { word: "که", roman: "ke", meaning: "that, because (conjunction)", grammar: "Conj. · subordinator" } },
          { text: "عشق", id: "eshq", tooltip: { word: "عشق", roman: "eshq", meaning: "love, passion", grammar: "Noun · masc. · Arabic origin" } },
          { text: " آسان نمود اول ولی ", id: "sp3" },
          { text: "افتاد", id: "oftad", tooltip: { word: "افتاد", roman: "oftād", meaning: "fell, arose", grammar: "Verb · past · 3sg · افتادن" } },
          { text: " ", id: "sp4" },
          { text: "مشکل‌ها", id: "moshkelha", tooltip: { word: "مشکل‌ها", roman: "moshkel-hā", meaning: "difficulties, problems", grammar: "Noun · pl. · Arabic origin + Persian pl. suffix ها" } },
        ],
      },
      {
        translation: "With the breeze of the morning wind, perhaps the musk-laden scent will come.",
        tokens: [
          { text: "به بوی نافه‌ای کاخر صبا ", id: "pre" },
          { text: "زان", id: "zan", tooltip: { word: "زان", roman: "z-ān", meaning: "from that (contracted form)", grammar: "Prep. از + dem. pronoun آن · contracted" } },
          { text: " ", id: "sp5" },
          { text: "طرّه", id: "torra", tooltip: { word: "طرّه", roman: "torra", meaning: "lock of hair, wisp", grammar: "Noun · fem. · Arabic origin" } },
          { text: " ", id: "sp6" },
          { text: "گشاید", id: "goshaayad", tooltip: { word: "گشاید", roman: "goshāyad", meaning: "will open, will unfurl", grammar: "Verb · present/future · 3sg · گشودن" } },
        ],
      },
      {
        translation: "O heart, endure the darkness of the night, for this night will pass.",
        tokens: [
          { text: "صبر کن حافظ که ", id: "pre2" },
          { text: "در هجر", id: "dar-hejr", tooltip: { word: "هجر", roman: "hejr", meaning: "separation, estrangement", grammar: "Noun · masc. · Arabic origin" } },
          { text: " نیز ", id: "sp7" },
          { text: "بگذرد", id: "bogzarad", tooltip: { word: "بگذرد", roman: "bogzarad", meaning: "will pass, will go by", grammar: "Verb · present/future · 3sg · subjunctive · گذشتن" } },
          { text: " این شب ", id: "sp8" },
          { text: "تاریک", id: "tarik", tooltip: { word: "تاریک", roman: "tārik", meaning: "dark", grammar: "Adj. · attributive · invariable" } },
        ],
      },
    ],
  },
  "sadeghi-hedayat": {
    id: "sadeghi-hedayat",
    lang: "persian",
    title: "بوف کور",
    titleEn: "The Blind Owl",
    author: "صادق هدایت",
    level: "C1",
    lines: [
      {
        translation: "In life there are wounds that, like leprosy, slowly gnaw away the soul in solitude.",
        tokens: [
          { text: "در زندگی ", id: "pre" },
          { text: "زخم‌هایی", id: "zakhm", tooltip: { word: "زخم‌هایی", roman: "zakhm-hāyi", meaning: "some wounds, certain wounds", grammar: "Noun pl. + indef. suffix ی · زخم + ها + ی" } },
          { text: " هست که مثل ", id: "sp1" },
          { text: "خوره", id: "khore", tooltip: { word: "خوره", roman: "khore", meaning: "leprosy, corrosion", grammar: "Noun · masc. · colloquial/literary" } },
          { text: " روح را آهسته در ", id: "sp2" },
          { text: "انزوا", id: "enzevâ", tooltip: { word: "انزوا", roman: "enzevā", meaning: "solitude, isolation", grammar: "Noun · masc. · Arabic origin" } },
          { text: " ", id: "sp3" },
          { text: "می‌خورد", id: "mikhorad", tooltip: { word: "می‌خورد", roman: "mi-khorad", meaning: "gnaws, eats away", grammar: "Verb · present habitual · 3sg · خوردن" } },
          { text: " و می‌تراشد.", id: "rest" },
        ],
      },
      {
        translation: "These wounds do not show themselves in front of anyone.",
        tokens: [
          { text: "این ", id: "in" },
          { text: "دردها", id: "dardha", tooltip: { word: "دردها", roman: "dard-hā", meaning: "these pains, these wounds", grammar: "Noun · pl. · درد + ها" } },
          { text: " در مقابل هیچ‌کس ", id: "sp4" },
          { text: "ظاهر", id: "zaher", tooltip: { word: "ظاهر", roman: "ẓāher", meaning: "visible, apparent", grammar: "Adj. · Arabic origin · pred. use" } },
          { text: " نمی‌شوند.", id: "sp5" },
        ],
      },
      {
        translation: "It is exactly those painful and shameful events that one cannot speak of to anyone.",
        tokens: [
          { text: "همین ", id: "hamin" },
          { text: "حوادث", id: "havades", tooltip: { word: "حوادث", roman: "ḥawādes", meaning: "events, incidents", grammar: "Noun · pl. · Arabic origin · حادثه" } },
          { text: " ", id: "sp6" },
          { text: "دردناک", id: "dardnak", tooltip: { word: "دردناک", roman: "dardnāk", meaning: "painful, distressing", grammar: "Adj. · compound درد + ناک (suffix)" } },
          { text: " و ", id: "va" },
          { text: "شرم‌آور", id: "sharmavar", tooltip: { word: "شرم‌آور", roman: "sharm-āvar", meaning: "shameful, causing shame", grammar: "Compound adj. · شرم + آور (agent suffix)" } },
          { text: " هستند که ", id: "sp7" },
          { text: "نمی‌توان", id: "nemitavan", tooltip: { word: "نمی‌توان", roman: "nemi-tavān", meaning: "one cannot, it is not possible", grammar: "Verb · impersonal · negative · توانستن" } },
          { text: " آن‌ها را با کسی در میان گذاشت.", id: "rest2" },
        ],
      },
      {
        translation: "I am writing only for my own shadow, which is cast on the wall in front of the lamp.",
        tokens: [
          { text: "من فقط برای ", id: "pre3" },
          { text: "سایه‌ام", id: "saayam", tooltip: { word: "سایه‌ام", roman: "sāye-am", meaning: "my shadow", grammar: "Noun + 1sg possessive suffix · سایه + ام" } },
          { text: " می‌نویسم که ", id: "sp8" },
          { text: "روی", id: "ruy", tooltip: { word: "روی", roman: "ruy", meaning: "on, upon (surface of)", grammar: "Prep. · lit. 'face' used as spatial prep." } },
          { text: " دیوار مقابل ", id: "sp9" },
          { text: "چراغ", id: "cheragh", tooltip: { word: "چراغ", roman: "cherāgh", meaning: "lamp, light", grammar: "Noun · masc. · singular" } },
          { text: " افتاده است.", id: "rest3" },
        ],
      },
    ],
  },
  "tolstoy-anna-ch1": {
    id: "tolstoy-anna-ch1",
    lang: "russian",
    title: "Анна Каренина",
    titleEn: "Anna Karenina",
    author: "Лев Толстой",
    level: "C2",
    lines: [
      {
        translation: "All happy families are alike; each unhappy family is unhappy in its own way.",
        tokens: [
          { text: "Все", id: "vse", tooltip: { word: "Все", roman: "Vse", meaning: "all", grammar: "Pronoun · nom. · pl." } },
          { text: " ", id: "sp1" },
          { text: "счастливые", id: "schast", tooltip: { word: "счастливые", roman: "schastlivye", meaning: "happy", grammar: "Adj. · nom. · pl. · long form" } },
          { text: " ", id: "sp2" },
          { text: "семьи", id: "semi", tooltip: { word: "семьи", roman: "sem'i", meaning: "families", grammar: "Noun · nom. · fem. · pl." } },
          { text: " ", id: "sp3" },
          { text: "похожи", id: "pokhozhi", tooltip: { word: "похожи", roman: "pokhozhi", meaning: "are alike, resemble each other", grammar: "Adj. short form · pred. · pl. · похожий" } },
          { text: " друг на друга, каждая ", id: "sp4" },
          { text: "несчастливая", id: "neschast", tooltip: { word: "несчастливая", roman: "neschastlivaya", meaning: "unhappy", grammar: "Adj. · nom. · fem. · long form" } },
          { text: " семья ", id: "sp5" },
          { text: "несчастлива", id: "nesch2", tooltip: { word: "несчастлива", roman: "neschastliva", meaning: "is unhappy", grammar: "Adj. short form · pred. · fem." } },
          { text: " по-своему.", id: "end" },
        ],
      },
      {
        translation: "Everything was in confusion in the Oblonskys' house.",
        tokens: [
          { text: "Всё ", id: "vse2" },
          { text: "смешалось", id: "smeshalos", tooltip: { word: "смешалось", roman: "smeshalos'", meaning: "got mixed up, fell into confusion", grammar: "Verb · past · refl. · neut. · pf. · смешаться" } },
          { text: " в доме ", id: "sp6" },
          { text: "Облонских", id: "oblonskikh", tooltip: { word: "Облонских", roman: "Oblonskikh", meaning: "the Oblonskys'", grammar: "Proper noun · gen. pl. · family name" } },
          { text: ".", id: "dot" },
        ],
      },
      {
        translation: "The wife had found out that the husband was having a liaison with the French girl who had been their governess.",
        tokens: [
          { text: "Жена", id: "zhena", tooltip: { word: "Жена", roman: "Zhena", meaning: "wife", grammar: "Noun · nom. · fem. · sg." } },
          { text: " ", id: "sp7" },
          { text: "узнала", id: "uznala", tooltip: { word: "узнала", roman: "uznala", meaning: "found out, learned", grammar: "Verb · past · fem. · pf. · узнать" } },
          { text: ", что муж был в ", id: "sp8" },
          { text: "связи", id: "svyazi", tooltip: { word: "связи", roman: "svyazi", meaning: "liaison, connection, affair", grammar: "Noun · prep. · fem. · sg." } },
          { text: " с ", id: "sp9" },
          { text: "француженкой", id: "frantsuzhenka", tooltip: { word: "француженкой", roman: "frantsuzhenkov", meaning: "French woman", grammar: "Noun · instr. · fem. · sg." } },
          { text: ", бывшею ", id: "sp10" },
          { text: "гувернанткой", id: "guvernantka", tooltip: { word: "гувернанткой", roman: "guvernantkoy", meaning: "governess", grammar: "Noun · instr. · fem. · sg." } },
          { text: " их детей.", id: "rest4" },
        ],
      },
      {
        translation: "And having found this out, she had told her husband.",
        tokens: [
          { text: "И, ", id: "i" },
          { text: "узнав", id: "uznav", tooltip: { word: "узнав", roman: "uznav", meaning: "having found out", grammar: "Verb · perfective gerund · узнать" } },
          { text: " это, она ", id: "sp11" },
          { text: "объявила", id: "obyavila", tooltip: { word: "объявила", roman: "ob''yavila", meaning: "declared, told, announced", grammar: "Verb · past · fem. · pf. · объявить" } },
          { text: " мужу, что не ", id: "sp12" },
          { text: "может", id: "mozhet", tooltip: { word: "может", roman: "mozhet", meaning: "can, is able to", grammar: "Verb · present · 3sg · мочь" } },
          { text: " жить с ним в одном доме.", id: "rest5" },
        ],
      },
    ],
  },
};

const fallbackText: TextData = {
  id: "fallback",
  lang: "russian",
  title: "Все счастливые семьи",
  titleEn: "Anna Karenina — Opening",
  author: "Лев Толстой",
  level: "C2",
  lines: [
    {
      translation: "All happy families are alike; each unhappy family is unhappy in its own way.",
      tokens: [
        { text: "Все", id: "vse", tooltip: { word: "Все", roman: "Vse", meaning: "all", grammar: "Pronoun · nom. · pl." } },
        { text: " ", id: "sp1" },
        { text: "счастливые", id: "schast", tooltip: { word: "счастливые", roman: "schastlivye", meaning: "happy", grammar: "Adj. · nom. · pl." } },
        { text: " ", id: "sp2" },
        { text: "семьи", id: "semi", tooltip: { word: "семьи", roman: "sem'i", meaning: "families", grammar: "Noun · nom. · fem. · pl." } },
        { text: " похожи друг на друга, каждая несчастливая семья ", id: "mid" },
        { text: "несчастлива", id: "nesch", tooltip: { word: "несчастлива", roman: "neschastliva", meaning: "is unhappy", grammar: "Adj. short form · pred. · fem." } },
        { text: " по-своему.", id: "end" },
      ],
    },
  ],
};

export function ReaderPage() {
  const { textId } = useParams<{ textId: string }>();
  const textData = (textId && textDatabase[textId]) || fallbackText;

  const [currentLine, setCurrentLine] = useState(0);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [hoveredTooltip, setHoveredTooltip] = useState<WordToken["tooltip"] | null>(null);
  const [translitOn, setTranslitOn] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const isRtl = textData.lang === "arabic" || textData.lang === "persian";
  const progress = Math.round(((currentLine + 1) / textData.lines.length) * 100);

  const goNext = useCallback(() => setCurrentLine((c) => Math.min(c + 1, textData.lines.length - 1)), [textData.lines.length]);
  const goPrev = useCallback(() => setCurrentLine((c) => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "j" || e.key === "J" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "k" || e.key === "K") { e.preventDefault(); goPrev(); }
      if (e.key === "t" || e.key === "T") setTranslitOn((v) => !v);
      if (e.key === "f" || e.key === "F") setFocusMode((v) => !v);
      if (e.key === "?") setShowShortcuts((v) => !v);
      if (e.key === "Escape") setShowShortcuts(false);
      if (e.key === "g" && !e.shiftKey) setCurrentLine(0);
      if (e.key === "G") setCurrentLine(textData.lines.length - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, textData.lines.length]);

  const line = textData.lines[currentLine];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0d",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      {!focusMode && (
        <div
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "0 24px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: "0",
            background: "rgba(10,10,13,0.95)",
            backdropFilter: "blur(8px)",
            zIndex: 10,
          }}
        >
          <div className="flex items-center gap-4">
            <Link
              to="/library"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: "#3e3e38",
                textDecoration: "none",
                letterSpacing: "0.08em",
                transition: "color 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#64645e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3e3e38")}
            >
              ← Library
            </Link>
            <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.07)" }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "#64645e",
              }}
            >
              {textData.titleEn}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress */}
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: "80px",
                  height: "2px",
                  background: "rgba(255,255,255,0.08)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${progress}%`,
                    background: "#2db54e",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                  color: "#3e3e38",
                  letterSpacing: "0.06em",
                }}
              >
                {currentLine + 1}/{textData.lines.length}
              </span>
            </div>

            <button
              onClick={() => setFocusMode(true)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                color: "#3e3e38",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.08em",
                padding: "4px 8px",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#64645e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3e3e38")}
            >
              [F] Focus
            </button>

            <button
              onClick={() => setShowShortcuts(true)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                color: "#3e3e38",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.08em",
                padding: "4px 8px",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#64645e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3e3e38")}
            >
              [?]
            </button>
          </div>
        </div>
      )}

      {/* Main reading area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: focusMode ? "60px 24px" : "80px 24px",
          maxWidth: "720px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Text title (first line only) */}
        {currentLine === 0 && !focusMode && (
          <div style={{ alignSelf: "flex-start", marginBottom: "48px" }}>
            <p
              style={{
                fontFamily: isRtl ? "'Noto Naskh Arabic', serif" : "'Inter', sans-serif",
                fontSize: isRtl ? "28px" : "22px",
                fontWeight: 500,
                color: "#e0e0da",
                margin: "0 0 6px 0",
                direction: isRtl ? "rtl" : "ltr",
              }}
            >
              {textData.title}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "#3e3e38",
                margin: 0,
              }}
            >
              {textData.titleEn} · {textData.author} · {textData.level}
            </p>
          </div>
        )}

        {/* Line counter */}
        <div
          style={{
            alignSelf: "flex-start",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            color: "#2e2e32",
            marginBottom: "20px",
            letterSpacing: "0.08em",
          }}
        >
          {String(currentLine + 1).padStart(2, "0")} / {String(textData.lines.length).padStart(2, "0")}
        </div>

        {/* Script text */}
        <p
          dir={isRtl ? "rtl" : "ltr"}
          style={{
            fontFamily: isRtl ? "'Noto Naskh Arabic', serif" : "'Inter', sans-serif",
            fontSize: isRtl ? "clamp(1.4rem, 2.5vw, 1.9rem)" : "clamp(1.15rem, 2vw, 1.45rem)",
            fontWeight: 400,
            lineHeight: 2,
            color: "#c8c8c2",
            margin: "0 0 24px 0",
            alignSelf: "stretch",
            wordSpacing: isRtl ? "6px" : "normal",
          }}
        >
          {line.tokens.map((token) => {
            if (!token.tooltip) {
              return <span key={token.id}>{token.text}</span>;
            }
            const isActive = hoveredWord === token.id;
            return (
              <span
                key={token.id}
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => { setHoveredWord(token.id); setHoveredTooltip(token.tooltip!); }}
                onMouseLeave={() => { setHoveredWord(null); setHoveredTooltip(null); }}
              >
                <span
                  style={{
                    color: isActive ? "#e8e8e2" : "#c8c8c2",
                    borderBottom: isActive ? "1px solid #2db54e" : "1px solid rgba(45,181,78,0.25)",
                    cursor: "default",
                    transition: "color 0.1s, border-color 0.1s",
                    paddingBottom: "2px",
                  }}
                >
                  {token.text}
                </span>
                {isActive && token.tooltip && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 12px)",
                      [isRtl ? "right" : "left"]: "0",
                      background: "#161619",
                      border: "1px solid rgba(45,181,78,0.3)",
                      padding: "12px 16px",
                      whiteSpace: "nowrap",
                      zIndex: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      direction: "ltr",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    }}
                  >
                    <span style={{ fontFamily: isRtl ? "'Noto Naskh Arabic', serif" : "'Inter', sans-serif", fontSize: isRtl ? "18px" : "15px", color: "#e0e0da", direction: isRtl ? "rtl" : "ltr" }}>{token.tooltip.word}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#64645e", fontStyle: "italic" }}>{token.tooltip.roman}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#2db54e" }}>{token.tooltip.meaning}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#3e3e38", letterSpacing: "0.04em" }}>{token.tooltip.grammar}</span>
                  </span>
                )}
              </span>
            );
          })}
        </p>

        {/* Translation */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.65,
            color: "#3e3e38",
            margin: "0 0 56px 0",
            alignSelf: "stretch",
            fontStyle: "italic",
            direction: "ltr",
          }}
        >
          {line.translation}
        </p>

        {/* Navigation buttons */}
        <div className="flex items-center gap-4 self-stretch justify-between">
          <button
            onClick={goPrev}
            disabled={currentLine === 0}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: currentLine === 0 ? "#1e1e20" : "#3e3e38",
              background: "transparent",
              border: `1px solid ${currentLine === 0 ? "#1e1e20" : "rgba(255,255,255,0.08)"}`,
              padding: "10px 20px",
              cursor: currentLine === 0 ? "default" : "pointer",
              letterSpacing: "0.06em",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => { if (currentLine > 0) e.currentTarget.style.color = "#64645e"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = currentLine === 0 ? "#1e1e20" : "#3e3e38"; }}
          >
            ← [K] Prev
          </button>

          <button
            onClick={goNext}
            disabled={currentLine === textData.lines.length - 1}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "#060608",
              background: currentLine === textData.lines.length - 1 ? "#1a6630" : "#2db54e",
              border: "none",
              padding: "10px 24px",
              cursor: currentLine === textData.lines.length - 1 ? "default" : "pointer",
              letterSpacing: "0.06em",
              transition: "background 0.15s ease",
            }}
          >
            Next [J] →
          </button>
        </div>
      </div>

      {/* Bottom shortcut bar */}
      {!focusMode && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <KbdBadge keys={["J"]} label="next" />
          <KbdBadge keys={["K"]} label="prev" />
          <KbdBadge keys={["Space"]} label="advance" />
          <KbdBadge keys={["T"]} label={translitOn ? "hide translit" : "translit"} />
          <KbdBadge keys={["F"]} label="focus" />
          <KbdBadge keys={["?"]} label="shortcuts" />
        </div>
      )}

      {/* Focus mode exit hint */}
      {focusMode && (
        <div style={{ position: "fixed", bottom: "20px", right: "24px" }}>
          <button
            onClick={() => setFocusMode(false)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              color: "#2e2e32",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.08em",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#64645e")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#2e2e32")}
          >
            [F] Exit Focus
          </button>
        </div>
      )}

      {/* Shortcuts modal */}
      {showShortcuts && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,13,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={() => setShowShortcuts(false)}
        >
          <div
            style={{
              background: "#111114",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "36px 40px",
              width: "100%",
              maxWidth: "400px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#2db54e", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Keyboard Shortcuts
              </span>
              <button
                onClick={() => setShowShortcuts(false)}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#3e3e38", background: "none", border: "none", cursor: "pointer" }}
              >
                [Esc]
              </button>
            </div>

            {[
              { keys: "J / Space", label: "Next line" },
              { keys: "K", label: "Previous line" },
              { keys: "gg", label: "First line" },
              { keys: "G", label: "Last line" },
              { keys: "T", label: "Toggle transliteration" },
              { keys: "G", label: "Open grammar note" },
              { keys: "F", label: "Toggle focus mode" },
              { keys: "?", label: "Show shortcuts" },
              { keys: "Esc", label: "Close dialogs" },
            ].map((s) => (
              <div
                key={s.keys}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#9a9a94", letterSpacing: "0.04em" }}>
                  {s.keys}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#4e4e48" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
