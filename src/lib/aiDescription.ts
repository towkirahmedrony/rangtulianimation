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

function getPrompt(input: { title: string; youtubeDescription?: string }) {
  return `
তুমি "Rang Tuli Animation Horror" নামের একটি Bengali horror cartoon YouTube channel-এর জন্য SEO-friendly episode metadata লিখবে।

Video title:
${input.title}

YouTube description:
${input.youtubeDescription || ""}

Important context:
- Channel type: Bengali / Bangla horror cartoon story
- Audience: Bengali adult horror cartoon viewers
- Goal: Website episode page, Google SEO, YouTube audience conversion
- Tone: suspenseful, cinematic, mysterious, natural Bangla
- Avoid: childish tone, generic boring sentence, fake overhype, emoji, hashtags
- Main SEO focus: Bangla Bhuter Golpo, Horror Cartoon, Bengali Horror Cartoon, ভৌতিক গল্প

Generate exactly these JSON keys:
"description", "seoDescription", "seoTitle", "tags"

Rules:

1. description:
- This will show under episode card and inside website episode page.
- Must be 1-2 natural Bengali sentences.
- 25-45 Bengali words.
- It must create curiosity and soft CTA.
- It should make the viewer want to watch the full episode.
- Do not use hashtags.
- Do not use emoji.
- Do not write generic lines like "রহস্যময় ও ভয়ংকর বাংলা হরর কার্টুন এপিসোড" only.
- Do not keyword-stuff.
- Good style example:
  "শেষ রাতের নির্জন বাসস্ট্যান্ডে এক যাত্রীর অপেক্ষা ধীরে ধীরে ভয়ংকর অভিশাপে পরিণত হয়। অন্ধকার, রহস্য আর অজানা আতঙ্কে ভরা এই গল্পের শেষটা জানতে পুরো এপিসোড দেখুন।"

2. seoDescription:
- This is for Google meta description.
- Must be 140-160 characters.
- Must naturally include these keywords:
  "Bangla Bhuter Golpo"
  "Horror Cartoon"
  "ভৌতিক গল্প"
- Must sound natural, not keyword stuffing.
- Must describe the episode and encourage watching.
- No hashtags, no emoji.
- Good style example:
  "ভূতুড়ে বাসস্ট্যান্ড একটি Bangla Bhuter Golpo ও Horror Cartoon এপিসোড, যেখানে ভৌতিক গল্প, রহস্য আর ভয়ংকর রাতের ঘটনা দেখানো হয়েছে।"

3. seoTitle:
- Must be clickable and SEO-friendly.
- Keep it between 50-70 characters if possible.
- Maximum 75 characters.
- Format:
  "মূল গল্পের টাইটেল | Bangla Bhuter Golpo | Rang Tuli"
- If the title becomes too long, shorten the main story title naturally.
- Do not remove the keyword "Bangla Bhuter Golpo".
- Do not make it look spammy.
- Do not use hashtags or emoji.

4. tags:
- Give 7-10 tags.
- Mix Bangla and English keywords.
- Must include:
  "Bangla Bhuter Golpo"
  "Bangla Horror Cartoon"
  "Bengali Horror Cartoon"
  "Horror Cartoon"
  "ভৌতিক গল্প"
  "বাংলা ভূতের গল্প"
- Add episode-specific tags from title.
- Do not use hashtags.

Output only valid JSON.
Do not wrap with markdown.
Do not add explanation.
`;
}

function sanitizeAiData(data: any, title: string) {
  const fallback = makeSmartFallbackData(title);

  const description =
    typeof data?.description === "string"
      ? limitText(data.description.replace(/#/g, "").trim(), 260)
      : fallback.description;

  const seoDescription =
    typeof data?.seoDescription === "string"
      ? limitText(data.seoDescription.replace(/#/g, "").trim(), 165)
      : fallback.seoDescription;

  const seoTitle =
    typeof data?.seoTitle === "string"
      ? limitText(data.seoTitle.replace(/#/g, "").trim(), 75)
      : fallback.seoTitle;

  const tags =
    Array.isArray(data?.tags) && data.tags.length > 0
      ? data.tags
          .filter((tag: unknown) => typeof tag === "string")
          .map((tag: string) => tag.replace(/#/g, "").trim())
          .filter(Boolean)
          .slice(0, 10)
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
}) {
  try {
    const response = await ai.models.generateContent({
      model: "models/gemini-3.1-flash-lite",
      contents: getPrompt(input),
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text?.trim();

    if (!text) {
      return makeSmartFallbackData(input.title);
    }

    const parsedData = JSON.parse(text);

    return sanitizeAiData(parsedData, input.title);
  } catch (error) {
    console.error("Gemini description error:", error);
    return makeSmartFallbackData(input.title);
  }
}
