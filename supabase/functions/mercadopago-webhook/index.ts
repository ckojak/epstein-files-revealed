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

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // MercadoPago sends different notification formats
    const body = await req.json();
    console.log("Webhook received:", JSON.stringify(body));

    let paymentId: string | null = null;

    // Handle IPN notification format
    if (body.type === "payment" && body.data?.id) {
      paymentId = String(body.data.id);
    }
    // Handle webhook v2 format
    else if (body.action === "payment.updated" || body.action === "payment.created") {
      paymentId = String(body.data?.id);
    }
    // Handle direct topic format
    else if (body.topic === "payment" && body.id) {
      paymentId = String(body.id);
    }
    // Also check query params (IPN sends via query)
    else {
      const url = new URL(req.url);
      const topic = url.searchParams.get("topic");
      const id = url.searchParams.get("id");
      if (topic === "payment" && id) {
        paymentId = id;
      }
    }

    if (!paymentId) {
      console.log("No payment ID found in webhook, ignoring");
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch payment details from MercadoPago
    const mpResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: { Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}` },
      }
    );

    if (!mpResponse.ok) {
      const errorText = await mpResponse.text();
      throw new Error(`MP payment fetch failed [${mpResponse.status}]: ${errorText}`);
    }

    const payment = await mpResponse.json();
    console.log("Payment status:", payment.status, "Email:", payment.payer?.email);

    const payerEmail = payment.payer?.email || payment.external_reference;

    // Update payment record in database
    if (payment.preference_id) {
      await supabase
        .from("payments")
        .update({
          mercadopago_payment_id: paymentId,
          status: payment.status,
        })
        .eq("mercadopago_preference_id", payment.preference_id);
    }

    // If payment is approved, send the secret link email
    if (payment.status === "approved" && payerEmail) {
      // Check if email was already sent for this payment
      const { data: existingPayment } = await supabase
        .from("payments")
        .select("email_sent")
        .eq("mercadopago_payment_id", paymentId)
        .single();

      if (existingPayment?.email_sent) {
        console.log("Email already sent for this payment, skipping");
        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const secretLink = "https://epstein-arquivos.vercel.app/dossie-secreto-brasil-liberado";

      // Send email via Resend
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Arquivos Epstein Brasil <onboarding@resend.dev>",
          to: [payerEmail],
          subject: "[Acesso Liberado] Seu Dossiê Secreto chegou",
          html: `
            <div style="background-color: #0a0a0a; color: #e5e5e5; padding: 40px 20px; font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #171717; border: 1px solid #22c55e; border-radius: 8px; padding: 24px;">
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #ffffff;">Olá!</p>
                <p style="margin: 0 0 16px 0; font-size: 14px; color: #d4d4d4;">
                  Seu pagamento de <strong style="color: #22c55e;">R$ 2,49</strong> foi confirmado.
                </p>
                <p style="margin: 0 0 16px 0; font-size: 14px; color: #d4d4d4;">
                  Conforme prometido, aqui está o link exclusivo para acessar os arquivos:
                </p>
                <div style="text-align: center; margin: 24px 0;">
                  <a href="${secretLink}" 
                     style="background-color: #22c55e; color: #000000; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                    👉 ACESSAR DOSSIÊ SECRETO
                  </a>
                </div>
                <p style="margin: 16px 0 0 0; font-size: 12px; color: #737373;">
                  Ou copie e cole este link: <br/>
                  <span style="color: #22c55e; word-break: break-all;">${secretLink}</span>
                </p>
                <p style="margin: 16px 0 0 0; font-size: 13px; color: #a3a3a3;">
                  Guarde este e-mail para acessar sempre que quiser.
                </p>
              </div>
              
              <div style="text-align: center; font-size: 11px; color: #525252; margin-top: 20px;">
                <p>© 2026 Arquivos Epstein Brasil</p>
              </div>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        const emailError = await emailResponse.text();
        console.error(`Resend error [${emailResponse.status}]:`, emailError);
      } else {
        console.log("Email sent successfully to:", payerEmail);
        // Mark email as sent
        if (payment.preference_id) {
          await supabase
            .from("payments")
            .update({ email_sent: true })
            .eq("mercadopago_preference_id", payment.preference_id);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
