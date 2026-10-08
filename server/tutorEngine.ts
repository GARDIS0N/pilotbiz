import { GoogleGenAI } from '@google/genai';
import { Question } from '../src/types/cbe.js';

export interface TutorContext {
  studentName: string;
  gradeName?: string;
  currentWorldTitle?: string;
  currentMissionTitle?: string;
  currentQuestion?: Question;
  topic?: string;
}

const KENYAN_CBE_SOCRATIC_SYSTEM_PROMPT = `
You are "Mwalimu Rafiki" (Friend Teacher), a patient, warm, and highly engaging Kenyan Competency-Based Education (CBE) AI tutor.
Your mission is to guide Grade 3 - 6 Kenyan primary learners to discover answers using reasoning, practical Kenyan real-world analogies, and Socratic questioning.

PEDAGOGICAL RULES:
1. NEVER directly give away the multiple-choice or calculation answer immediately if the student is currently attempting a question. Guide their steps instead.
2. Use authentic Kenyan real-life anchors:
   - Fractions: Chapatis cut into equal slices, watermelons from Kisumu, loaves of Supa Loaf bread.
   - Money & Decimals: Kenyan Shillings (KES), buying items at local dukas, open-air markets like Kongowea or Gikomba, matatu fares.
   - Multiplication & Arrays: Seedlings planted in neat garden rows in the shamba, crates of sodas, sports day relay teams.
   - Science: Seed germination with maize and beans, Lake Nakuru flamingos, Maasai Mara wildlife, soil conservation by Wangari Maathai.
   - Kiswahili: Respectful greetings (Shikamoo / Marahaba), ngeli za nomino (A-WA, KI-VI).
3. Sprinkle natural, encouraging Kiswahili words: "Hongera sana!" (Well done!), "Vizuri sana!" (Very good!), "Jaribu tena kwa utulivu" (Try again calmly), "Twende kazi!" (Let's get to work!).
4. Keep explanations short, clear, visual, and friendly. Avoid academic jargon that confuses a 9-11 year old.
5. End your response with a gentle guiding question that invites the student to take the next step.
`;

export class TutorEngine {
  private aiClient: GoogleGenAI | null = null;
  private isConfigured = false;

  constructor() {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY' && key.length > 10) {
      try {
        this.aiClient = new GoogleGenAI({ apiKey: key });
        this.isConfigured = true;
      } catch (err) {
        console.warn('[TutorEngine] Failed to initialize Gemini API client:', err);
      }
    }
  }

  public async askTutor(userMessage: string, context: TutorContext): Promise<{ response: string; guidingQuestion?: string; source: 'GEMINI_AI' | 'LOCAL_SOCRATIC_ENGINE' }> {
    // If real Gemini key is active, call Gemini
    if (this.isConfigured && this.aiClient) {
      try {
        const contextSummary = `
Learner: ${context.studentName} (Grade: ${context.gradeName || 'Grade 4'})
Active Topic: ${context.topic || context.currentMissionTitle || 'General CBE Inquiry'}
Current Question (if any): ${context.currentQuestion ? context.currentQuestion.prompt : 'None'}
Socratic Hint for this question: ${context.currentQuestion ? context.currentQuestion.socraticHint : 'None'}
`;
        const prompt = `${KENYAN_CBE_SOCRATIC_SYSTEM_PROMPT}\n\n[CONTEXT]\n${contextSummary}\n\n[STUDENT MESSAGE]: "${userMessage}"\n\nMwalimu Rafiki's response:`;
        
        const response = await this.aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const text = response.text?.trim();
        if (text) {
          return {
            response: text,
            source: 'GEMINI_AI'
          };
        }
      } catch (error) {
        console.warn('[TutorEngine] Gemini API call error, falling back to local Socratic engine:', error);
      }
    }

    // High quality local Kenyan Socratic educational engine
    return {
      response: this.generateSocraticLocalResponse(userMessage, context),
      source: 'LOCAL_SOCRATIC_ENGINE'
    };
  }

  private generateSocraticLocalResponse(message: string, context: TutorContext): string {
    const lower = message.toLowerCase();
    const q = context.currentQuestion;

    // Check if the user is asking about the current question directly
    if (q) {
      if (lower.includes('hint') || lower.includes('help') || lower.includes('stuck') || lower.includes('confused') || lower.includes('answer')) {
        return `Jambo ${context.studentName}! Let's look closely at this together. ${q.socraticHint} ${
          q.type === 'MULTIPLE_CHOICE'
            ? 'Which option sounds closest to that calculation?'
            : 'What do you think is our first step?'
        }`;
      }
    }

    // Topic: Fractions
    if (lower.includes('fraction') || lower.includes('chapati') || lower.includes('quarter') || lower.includes('half')) {
      return `Hujambo ${context.studentName}! Fractions are simple when you think of food. Imagine Mama just made a fresh round chapati and cuts it into 4 equal slices. If you eat 1 slice, you ate 1 out of 4 parts—which we write as 1/4 (one quarter or 'robo'). If you eat 2 slices, that is 2/4, which is the exact same as half (1/2 or 'nusu')! If you had a watermelon cut into 8 slices, what fraction would 2 slices be?`;
    }

    // Topic: Money / Kenyan Shillings / Currency
    if (lower.includes('money') || lower.includes('shilling') || lower.includes('change') || lower.includes('kes') || lower.includes('market') || lower.includes('duka')) {
      return `Habari ${context.studentName}! In Kenyan markets like Kongowea or Toi Market, money math is about addition and subtraction. If you buy a loaf of bread for KES 65 and fresh milk for KES 60, total cost is 65 + 60 = 125 shillings. When you give the shopkeeper a 200 shilling note, you calculate your change by counting up from 125 to 200: (125 + 5 = 130, + 70 = 200), so change is KES 75! Does that help you see how to calculate your change?`;
    }

    // Topic: Multiplication / Rows / Arrays
    if (lower.includes('multiply') || lower.includes('times') || lower.includes('seedling') || lower.includes('rows')) {
      return `Safi sana! Multiplication is like shortcut addition. Imagine Amina planting sukuma wiki in her shamba. If she digs 5 neat rows and puts 4 seedlings in every row, she does not have to count 1, 2, 3... She just multiplies 5 rows × 4 seedlings = 20 seedlings! What do you get if you have 6 rows with 5 seedlings in each?`;
    }

    // Topic: Science / Plants / Germination
    if (lower.includes('plant') || lower.includes('seed') || lower.includes('germinat') || lower.includes('root') || lower.includes('shoot')) {
      return `Jambo mwanasayansi (young scientist)! A bean seed is like a tiny sleeping baby. It has a jacket (seed coat), stored food (cotyledon), and a sleeping embryo. To wake it up, it needs three friendly things: clean water to soften it, fresh air (oxygen), and gentle warmth. Once awake, the radicle root shoots downward first! Why do you think the root must grow downwards into the soil before the leaves grow up?`;
    }

    // Topic: Kiswahili / Ngeli
    if (lower.includes('ngeli') || lower.includes('kiswahili') || lower.includes('sarufi') || lower.includes('shikamoo')) {
      return `Karibu sana! Kiswahili chetu ni kitamu. Katika ngeli ya A-WA, tunaweka viumbe vyote vyenye uhai (kama watu na wanyama). Mfano: Mwanafunzi **a**nasoma, wanafunzi **wa**nasoma. Katika ngeli ya KI-VI tunaweka vitu kama: Kitabu **ki**zuri, vitabu **vi**zuri. Je, unaweza kunitajia sentensi moja ya ngeli ya A-WA?`;
    }

    // Greetings
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('jambo') || lower.includes('habari') || lower.includes('mambo')) {
      return `Jambo sana ${context.studentName}! I am Mwalimu Rafiki, your CBC learning companion. Which subject or quest are we exploring today? Is it Mathematics, Science, or Kiswahili?`;
    }

    // Encouragement & default
    return `Vizuri sana, ${context.studentName}! As a CBE champion, every challenge helps your brain grow stronger. Let's break this down into small, friendly pieces. What part of the question feels easiest to understand first?`;
  }
}

export const tutorEngine = new TutorEngine();
