interface CreateCheckoutParams {
  amountCents: number;
  customerEmail: string;
  customerName: string;
  description: string;
  successUrl: string;
  failureUrl: string;
}

interface CloverCheckoutResponse {
  href: string;
  checkoutSessionId?: string;
  [key: string]: unknown;
}

/**
 * Creates a Clover Hosted Checkout session and returns the URL to redirect
 * the customer to. Sessions expire 15 minutes after creation, so this
 * should be called right when the customer clicks "pay," not pre-generated
 * and stored in an email.
 *
 * Requires CLOVER_API_KEY (private Ecommerce API key) and
 * CLOVER_MERCHANT_ID from the Clover Merchant Dashboard
 * (Ecommerce Settings → Hosted Checkout).
 */
export async function createCloverCheckout(
  params: CreateCheckoutParams
): Promise<CloverCheckoutResponse> {
  const apiKey = process.env.CLOVER_API_KEY;
  const merchantId = process.env.CLOVER_MERCHANT_ID;
  // Sandbox by default — switch CLOVER_API_BASE_URL to the production
  // host shown in your client's Clover developer dashboard when ready.
  const baseUrl =
    process.env.CLOVER_API_BASE_URL || "https://apisandbox.dev.clover.com";

  if (!apiKey || !merchantId) {
    throw new Error(
      "Clover is not configured — set CLOVER_API_KEY and CLOVER_MERCHANT_ID."
    );
  }

  const [firstName, ...rest] = params.customerName.trim().split(" ");
  const lastName = rest.join(" ") || "Guest";

  const res = await fetch(
    `${baseUrl}/invoicingcheckoutservice/v1/checkouts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-Clover-Merchant-ID": merchantId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: {
          email: params.customerEmail,
          firstName: firstName || "Guest",
          lastName,
        },
        shoppingCart: {
          lineItems: [
            {
              name: params.description,
              unitQty: 1,
              price: params.amountCents, // integer cents, e.g. $10 = 1000
            },
          ],
        },
        redirectUrls: {
          success: params.successUrl,
          failure: params.failureUrl,
        },
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Clover checkout creation failed (${res.status}): ${text}`);
  }

  return res.json();
}
