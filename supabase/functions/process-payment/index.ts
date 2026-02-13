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

    const body = await req.json();
    console.log("Process payment request:", JSON.stringify(body));

    const { formData, email } = body;

    if (!formData) {
      return new Response(
        JSON.stringify({ error: "formData é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build the payment payload for MercadoPago v1/payments
    const paymentPayload: Record<string, unknown> = {
      transaction_amount: 1.99,
      description: "Acesso ao Dossiê Secreto",
      payment_method_id: formData.payment_method_id,
      payer: {
        email: formData.payer?.email || email,
        ...(formData.payer?.identification && {
          identification: formData.payer.identification,
        }),
      },
      statement_descriptor: "EPSTEIN BRASIL",
      external_reference: formData.payer?.email || email,
      notification_url: `${SUPABASE_URL}/functions/v1/mercadopago-webhook`,
    };

    // Card payment fields
    if (formData.token) {
      paymentPayload.token = formData.token;
      paymentPayload.installments = formData.installments || 1;
      paymentPayload.issuer_id = formData.issuer_id;
    }

    console.log("Sending to MP:", JSON.stringify(paymentPayload));

    // Create payment via MercadoPago API
    const mpResponse = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        "X-Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify(paymentPayload),
    });

    const mpData = await mpResponse.json();
    console.log("MP Response:", mpResponse.status, JSON.stringify(mpData));

    if (!mpResponse.ok) {
      return new Response(
        JSON.stringify({
          error: mpData.message || "Erro ao processar pagamento",
          details: mpData,
        }),
        { status: mpResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save payment record in database
    const payerEmail = formData.payer?.email || email;
    await supabase.from("payments").insert({
      email: payerEmail,
      mercadopago_payment_id: String(mpData.id),
      status: mpData.status,
    });

    // Return payment result
    return new Response(
      JSON.stringify({
        status: mpData.status,
        status_detail: mpData.status_detail,
        id: mpData.id,
        // PIX-specific data
        point_of_interaction: mpData.point_of_interaction,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Process payment error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
