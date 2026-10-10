import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { questionId, selectedAnswer, learnerId, timeMs, questionData } = await req.json();

    if (!questionId || selectedAnswer === undefined) {
      return new Response(JSON.stringify({ error: 'Missing questionId or selectedAnswer' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Retrieve question if not provided in payload
    let question = questionData;
    if (!question) {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('id', questionId)
        .maybeSingle();
      if (!error && data) {
        question = data;
      }
    }

    if (!question) {
      return new Response(JSON.stringify({ error: 'Question not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Universal evaluation logic
    let isCorrect = false;
    const type = question.type;

    if (type === 'MULTIPLE_CHOICE' || type === 'IMAGE_LABEL' || type === 'LISTEN_CHOOSE') {
      const correctId = (question.correct_option_id || question.correctOptionId || '').toLowerCase().trim();
      const ansStr = String(selectedAnswer).toLowerCase().trim();
      isCorrect = (
        ansStr === correctId ||
        `opt-${ansStr}` === correctId ||
        ansStr.replace(/^opt-/, '') === correctId.replace(/^opt-/, '')
      );
    } else if (type === 'TRUE_FALSE') {
      const expected = question.correct_boolean ?? question.correctBoolean;
      if (typeof selectedAnswer === 'boolean') {
        isCorrect = (selectedAnswer === expected);
      } else {
        const valStr = String(selectedAnswer).toLowerCase().trim();
        const boolVal = (valStr === 'true' || valStr === 'kweli' || valStr === 'ndiyo');
        isCorrect = (boolVal === expected);
      }
    } else if (type === 'MATCHING') {
      const pairs = question.matching_pairs ?? question.matchingPairs ?? [];
      if (Array.isArray(selectedAnswer) && selectedAnswer.length === pairs.length) {
        isCorrect = selectedAnswer.every((ans: any) => {
          return pairs.some((p: any) => {
            const pLeftId = p.leftId || p.left_id;
            const pRightId = p.rightId || p.right_id;
            return ans.leftId === pLeftId && ans.rightId === pRightId;
          });
        });
      }
    } else if (type === 'FILL_BLANK') {
      const acceptable = question.fill_blank_answers ?? question.fillBlankAnswers ?? [];
      const cleanAns = String(selectedAnswer).trim().toLowerCase();
      isCorrect = acceptable.some((ans: string) => String(ans).trim().toLowerCase() === cleanAns);
    }

    // Log attempt into attempts table
    if (learnerId) {
      await supabase.from('attempts').insert({
        learner_id: learnerId,
        question_id: questionId,
        is_correct: isCorrect,
        time_ms: timeMs || 0
      });
    }

    return new Response(
      JSON.stringify({
        isCorrect,
        questionId,
        explanation: question.explanation,
        socraticHint: question.socratic_hint ?? question.socraticHint,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
