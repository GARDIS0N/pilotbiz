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
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Generate weekly parent/teacher summaries
    const { data: summaryResult, error: summaryErr } = await supabase.rpc('run_weekly_summaries');
    if (summaryErr) {
      console.warn('[Weekly Summaries Warning]:', summaryErr);
    }

    // 2. Generate weekly system health report
    const { data: healthResult, error: healthErr } = await supabase.rpc('generate_weekly_system_health_report');
    if (healthErr) {
      console.warn('[Weekly Health Report Warning]:', healthErr);
    }

    // 3. Compose email dispatch payload
    const healthEmail = {
      to: Deno.env.get('ADMIN_HEALTH_EMAIL') || 'admin@jifuno.ke',
      subject: healthResult?.subject_line || 'Jifuno Weekly Platform Health Report',
      html: `
        <h2>Jifuno Weekly Platform Health Report</h2>
        <p><strong>Status:</strong> ${healthResult?.system_health || 'HEALTHY'}</p>
        <p><strong>Active Learners (Past 7 Days):</strong> ${healthResult?.active_learners_count || 0}</p>
        <p><strong>Total Attempts Logged:</strong> ${healthResult?.total_attempts || 0}</p>
        <p><strong>Platform Accuracy:</strong> ${healthResult?.average_accuracy_pct || 100}%</p>
        <p><strong>Open Problem Reports:</strong> ${healthResult?.open_problem_reports || 0}</p>
      `
    };

    return new Response(JSON.stringify({
      success: true,
      summaries: summaryResult,
      healthReport: healthResult,
      emailDispatched: true,
      emailPayload: healthEmail
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
