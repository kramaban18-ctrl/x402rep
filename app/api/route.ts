import { settlePayment, facilitator } from "thirdweb/x402";
import { createThirdwebClient } from "thirdweb";
import { abstractTestnet, } from "thirdweb/chains";

const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY!,
});

const thirdwebFacilitator = facilitator({
  client,
  serverWalletAddress: "0xF6E5634148b4C1C600de85F66361A04BfB932a47",
});

export async function GET(request: Request) {
  const paymentData = request.headers.get("x-payment");

  // Verify and process the payment
  const result = await settlePayment({
    resourceUrl: "https://kramaban18-ctrl-x402rep-eh4k-9btsn42dv.vercel.app/api",
    method: "GET",
    paymentData,
    payTo: "0xF6E5634148b4C1C600de85F66361A04BfB932a47",
    network: "eip155:1",
    price: {
      amount: "10000",
      asset: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      },
    },
    facilitator: thirdwebFacilitator,
  });

  if (result.status === 200) {
    // Payment verified and settled successfully
    return Response.json({ data: "premium content" });
  } else {
    // Payment required
    return Response.json(result.responseBody, {
      status: result.status,
      headers: result.responseHeaders,
    });
  }
}
