import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MERCADOPAGO_ACCESS_TOKEN = Deno.env.get("MERCADOPAGO_ACCESS_TOKEN");
    if (!MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error("MERCADOPAGO_ACCESS_TOKEN is not configured");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { email } = await req.json();
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Determine the base URL for back_urls
    const origin = req.headers.get("origin") || "https://epstein-arquivos.vercel.app";
    const successUrl = `${origin}/obrigado`;

    // Create MercadoPago preference
    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        items: [
          {
            title: "Acesso ao Dossiê Secreto",
            quantity: 1,
            unit_price: 4.99,
            currency_id: "BRL",
          },
        ],
        payer: { email },
        back_urls: {
          success: successUrl,
          failure: origin,
          pending: origin,
        },
        auto_return: "approved",
        notification_url: `${SUPABASE_URL}/functions/v1/mercadopago-webhook`,
        payment_methods: {
          excluded_payment_types: [],
          installments: 1,
        },
        statement_descriptor: "EPSTEIN BRASIL",
        external_reference: email,
      }),
    });

    if (!mpResponse.ok) {
      const errorData = await mpResponse.text();
      throw new Error(`MercadoPago API error [${mpResponse.status}]: ${errorData}`);
    }

    const mpData = await mpResponse.json();

    // Save payment record
    await supabase.from("payments").insert({
      email,
      mercadopago_preference_id: mpData.id,
      status: "pending",
    });

    return new Response(
      JSON.stringify({
        init_point: mpData.init_point,
        sandbox_init_point: mpData.sandbox_init_point,
        preference_id: mpData.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error creating preference:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
