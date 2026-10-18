import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

export const closetAiRouter = express.Router();

const geminiApiKey = process.env.GEMINI_API_KEY || '';
const hasGemini = Boolean(geminiApiKey && geminiApiKey.length > 10 && !geminiApiKey.includes('your-'));

closetAiRouter.get('/status', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    aiAvailable: hasGemini,
    model: hasGemini ? 'gemini-2.5-flash' : 'rule-engine-fallback',
  });
});

closetAiRouter.post('/recommend', async (req: Request, res: Response) => {
  const { wardrobe, criteria } = req.body;

  if (!Array.isArray(wardrobe) || wardrobe.length < 2) {
    return res.status(400).json({
      error: 'Wardrobe must contain at least 2 garments to generate recommendations.',
    });
  }

  // Filter only clean items
  const cleanWardrobe = wardrobe.filter((item: any) => item.status === 'clean');
  if (cleanWardrobe.length < 2) {
    return res.status(400).json({
      error: 'At least 2 clean items are required for styling.',
    });
  }

  if (!hasGemini) {
    // Graceful fallback signal so client uses client-side engine
    return res.json({
      useFallback: true,
      reason: 'Gemini AI API key not configured on server.',
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    // Format wardrobe inventory for prompt
    const wardrobeList = cleanWardrobe.map((item: any) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      color: item.color,
      brand: item.brand || 'Unbranded',
      notes: item.notes || '',
      season: item.season || [],
      occasion: item.occasion || [],
    }));

    const systemInstruction = `You are a world-class high-fashion stylist, luxury wardrobe curator, and personal image consultant for "MyCloset".
Your objective is to examine the user's actual wardrobe inventory and recommend a stylish, flattering, coordinated outfit according to their criteria.

RULES:
1. ONLY use items that exist in the provided wardrobe list. NEVER invent or hallucinate items.
2. Select 2 to 5 complementary pieces (e.g. top, bottom, shoes, and optional layer or accessory).
3. Return your response as a valid JSON object matching this schema:
{
  "title": "Editorial title for the outfit (e.g. The Relaxed Riviera Tailoring)",
  "selected_item_ids": ["id1", "id2", "id3"],
  "explanation": "Why this combination works together aesthetically and practically for the occasion.",
  "style_notes": "Specific styling instructions (e.g. roll sleeves once, half-tuck shirt, unbutton top collar).",
  "weather_suitability": "Why this outfit is suited to the specified weather condition.",
  "color_harmony": "Explanation of the color theory and tone coordination used.",
  "confidence_score": 95
}`;

    const prompt = `Styling Request:
Occasion: ${criteria?.occasion || 'Casual Outings'}
Target Aesthetic: ${criteria?.style || 'Minimalist'}
Weather: ${criteria?.weather || 'Mild & Breezy'}
Formality: ${criteria?.formality || 'Smart Casual'}
${criteria?.preferred_color ? `Preferred Color Focus: ${criteria.preferred_color}` : ''}
${criteria?.must_include_item_id ? `Must Include Garment ID: ${criteria.must_include_item_id}` : ''}
${criteria?.avoid_item_id ? `Exclude Garment ID: ${criteria.avoid_item_id}` : ''}

Available Clean Wardrobe Inventory:
${JSON.stringify(wardrobeList, null, 2)}

Provide your expert recommendation in the exact JSON format specified.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    const parsed = JSON.parse(text);

    // Verify selected item IDs actually exist in wardrobe
    const validItems = parsed.selected_item_ids
      ?.map((id: string) => cleanWardrobe.find((w: any) => w.id === id))
      .filter(Boolean);

    if (!validItems || validItems.length < 2) {
      return res.json({ useFallback: true, reason: 'AI returned fewer than 2 valid items' });
    }

    return res.json({
      useFallback: false,
      recommendation: {
        id: `ai-rec-${Date.now()}`,
        title: parsed.title || 'Curated Editorial Look',
        items: validItems,
        explanation: parsed.explanation || 'Curated by Gemini AI based on your clothing palette.',
        style_notes: parsed.style_notes || 'Effortless proportion and tonal harmony.',
        weather_suitability: parsed.weather_suitability || 'Balanced for current conditions.',
        color_harmony: parsed.color_harmony || 'Complementary balance.',
        confidence_score: parsed.confidence_score || 95,
        tags: ['Gemini AI', criteria?.style || 'Editorial', criteria?.occasion || 'Smart Casual'],
      },
    });
  } catch (err: any) {
    console.warn('Gemini AI styling error, falling back to local engine:', err?.message);
    return res.json({
      useFallback: true,
      error: err?.message,
    });
  }
});
