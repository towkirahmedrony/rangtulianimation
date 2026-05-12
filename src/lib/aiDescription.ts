import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function cleanText(value?: string) {
  return (value || "")
    .replace(/#/g, " ")
    .replace(/\|/g, " ")
    .replace(/Bangla/gi, " ")
    .replace(/Bengali/gi, " ")
    .replace(/Bhuter cartoon/gi, " ")
    .replace(/Bhuter Golpo/gi, " ")
    .replace(/Ghost Cartoon/gi, " ")
    .replace(/Horror Cartoon/gi, " ")
    .replace(/Cartoon/gi, " ")
    .replace(/Rang Tuli Animation Horror/gi, " ")
    .replace(/Rang Tuli Animation/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function limitText(text: string, max: number) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max - 1).trim() + "…" : text;
}

export function makeSmartFallbackData(title?: string) {
  const rawTitle = title || "Bangla Horror Cartoon";
  const cleanTitle = cleanText(rawTitle) || "অজানা রহস্য";

  return {
    description: `${cleanTitle} গল্পে রাতের অন্ধকারে শুরু হয় এক ভয়ংকর রহস্য। অজানা আতঙ্কের শেষটা জানতে পুরো এপিসোড দেখুন।`,
    seoDescription: `${cleanTitle} নিয়ে তৈরি Bangla Bhuter Golpo ও Horror Cartoon এপিসোড। ভৌতিক গল্প, রহস্য আর ভয়ংকর ঘটনার বাংলা কার্টুন দেখুন।`,
    seoTitle: `${cleanTitle} | Bangla Bhuter Golpo | Rang Tuli`,
    tags: [
      "Bangla Bhuter Golpo",
      "Bangla Horror Cartoon",
      "Bengali Horror Cartoon",
      "Horror Cartoon",
      "ভৌতিক গল্প",
      "বাংলা ভূতের গল্প",
      "বাংলা হরর কার্টুন",
      "Rang Tuli Animation Horror",
    ],
    isFallback: true,
  };
}

function getPrompt(input: { title: string; youtubeDescription?: string; transcript?: string }) {
  return `
তুমি "Rang Tuli Animation Horror" নামের একটি Bengali horror cartoon YouTube channel-এর জন্য SEO-friendly episode metadata লিখবে।

Video title:
${input.title}

YouTube description:
${input.youtubeDescription || ""}

Video Transcript:
${input.transcript || "No transcript available."}

Important context:
- Channel type: Bengali / Bangla horror cartoon story
- Goal: Website episode page, Google SEO
- Tone: suspenseful, cinematic, mysterious

Generate exactly these JSON keys:
"description", "seoDescription", "seoTitle", "tags"

Rules:
1. description: 1-2 natural Bengali sentences. 25-45 words. Creates curiosity. No hashtags.
2. seoDescription: 140-160 characters. Must include "Bangla Bhuter Golpo", "Horror Cartoon".
3. seoTitle: Max 75 chars. Format: "Title | Bangla Bhuter Golpo | Rang Tuli"
4. tags: 7-10 tags. Mix English and Bangla keywords.

Output ONLY valid JSON.
`;
}

function sanitizeAiData(data: any, title: string) {
  const fallback = makeSmartFallbackData(title);

  const description = typeof data?.description === "string" ? limitText(data.description.replace(/#/g, "").trim(), 260) : fallback.description;
  const seoDescription = typeof data?.seoDescription === "string" ? limitText(data.seoDescription.replace(/#/g, "").trim(), 165) : fallback.seoDescription;
  const seoTitle = typeof data?.seoTitle === "string" ? limitText(data.seoTitle.replace(/#/g, "").trim(), 75) : fallback.seoTitle;
  
  const tags = Array.isArray(data?.tags) && data.tags.length > 0
      ? data.tags.filter((tag: unknown) => typeof tag === "string").map((tag: string) => tag.replace(/#/g, "").trim()).filter(Boolean).slice(0, 10)
      : fallback.tags;

  return {
    description: description || fallback.description,
    seoDescription: seoDescription || fallback.seoDescription,
    seoTitle: seoTitle || fallback.seoTitle,
    tags: tags.length > 0 ? tags : fallback.tags,
    isFallback: false,
  };
}

export async function generateAiEpisodeData(input: {
  title: string;
  youtubeDescription?: string;
  transcript?: string;
}) {
  try {
    const response = await ai.models.generateContent({
      model: "models/gemini-3.1-flash-lite",
      contents: getPrompt(input),
      config: { responseMimeType: "application/json" },
    });

    let text = response.text?.trim();

    if (!text) {
      console.log(`❌ [AI Error] জেমিনি কোনো উত্তর দেয়নি: ${input.title}`);
      return makeSmartFallbackData(input.title);
    }

    // Bulletproof JSON Extractor (যেকোনো জায়গা থেকে শুধু JSON অংশটুকু বের করবে)
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');

    if (startIndex !== -1 && endIndex !== -1) {
      text = text.substring(startIndex, endIndex + 1);
    } else {
      console.log(`⚠️ [AI Format Error] JSON পাওয়া যায়নি: ${input.title} \nRaw text: ${text}`);
      return makeSmartFallbackData(input.title);
    }

    const parsedData = JSON.parse(text);
    console.log(`✅ [AI Success] ডেটা সফলভাবে জেনারেট হয়েছে: ${input.title}`);
    
    return sanitizeAiData(parsedData, input.title);
  } catch (error) {
    console.error(`🔥 [AI Catch Error] সমস্যা হয়েছে: ${input.title}`, error);
    return makeSmartFallbackData(input.title);
  }
}
