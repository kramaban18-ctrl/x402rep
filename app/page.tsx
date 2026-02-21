"use client";

import { Button } from "@/components/ui/button";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, useActiveWallet } from "thirdweb/react";
import { Wallet } from "thirdweb/wallets";
import { wrapFetchWithPayment } from "thirdweb/x402";

const client = createThirdwebClient({ 
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
 });

async function accessPremiumContent(wallet: Wallet) {
  const fetchWithPay = wrapFetchWithPayment(
    fetch,
    client,
    wallet,
    BigInt(1 * 10 ** 6 / 100)
  );

  // Make a request that may require payment
  const response = await fetchWithPay("https://kramaban18-ctrl-x402rep-vjcs.vercel.app//api");
  const data = await response.json();

  console.log(data);
  return data;
}

export default function Home() {
  const wallet = useActiveWallet();

  if (!wallet) {
    return <ConnectButton client={client}/>
  }

  return (
    <div>
      <Button onClick={() => {
        accessPremiumContent(wallet);
      }}>
        Pay to access premium content
      </Button>
    </div>
  );
}
