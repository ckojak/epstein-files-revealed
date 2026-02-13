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
    console.log("Process payment request recebida");

    const { formData, email } = body;

    if (!formData) {
      return new Response(
        JSON.stringify({ error: "formData é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 🔥 PULO DO GATO 1: Repassar TODOS os dados do formulário sem cortar nada (para o PIX não bugar)
    // 🔥 PULO DO GATO 2: Forçar a notification_url para a VERCEL para o e-mail sair na mesma hora!
    const paymentPayload = {
      ...formData, 
      transaction_amount: 1.99, // Trava o valor para não ter fraude
      description: "Acesso ao Dossiê Secreto",
      external_reference: email,
      payer: {
        ...formData.payer,
        email: formData.payer?.email || email,
      },
      notification_url: "https://epstein-arquivos.vercel.app/api/webhook",
    };

    console.log("Enviando para Mercado Pago com sucesso");

    // Cria o pagamento via API do Mercado Pago
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

    if (!mpResponse.ok) {
      return new Response(
        JSON.stringify({
          error: mpData.message || "Erro ao processar pagamento",
          details: mpData,
        }),
        { status: mpResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Salva o registro no banco de dados para segurança
    await supabase.from("payments").insert({
      email: email,
      mercadopago_payment_id: String(mpData.id),
      status: mpData.status,
    });

    // Devolve os dados para o Frontend renderizar o PIX na tela
    return new Response(
      JSON.stringify({
        status: mpData.status,
        status_detail: mpData.status_detail,
        id: mpData.id,
        point_of_interaction: mpData.point_of_interaction, // Aqui está o QR Code!
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Erro interno:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
