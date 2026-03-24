import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const usePaymentVerification = () => {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPayment = async () => {
      // Check URL params from MercadoPago redirect
      const params = new URLSearchParams(window.location.search);
      const status = params.get("collection_status") || params.get("status");
      const email = params.get("external_reference");

      if (status === "approved" && email) {
        // Store verified email in sessionStorage
        sessionStorage.setItem("epstein_paid_email", email);
        setVerified(true);
        return;
      }

      // Check sessionStorage
      const storedEmail = sessionStorage.getItem("epstein_paid_email");
      if (storedEmail) {
        // Verify against DB
        const { data } = await supabase
          .from("payments")
          .select("status")
          .eq("email", storedEmail)
          .eq("status", "approved")
          .limit(1);

        if (data && data.length > 0) {
          setVerified(true);
          return;
        }
      }

      setVerified(false);
    };

    checkPayment();
  }, []);

  return verified;
};
