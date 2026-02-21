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
    resourceUrl: "http://localhost:3000/api",
    method: "GET",
    paymentData,
    payTo: "0xF6E5634148b4C1C600de85F66361A04BfB932a47",
    network: Ethereum,
    price: {
      amount: "10000",
      asset: {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
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
