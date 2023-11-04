import { useEffect } from "react";
import useSWR from "swr";

export const handler = (web3, provider) => () => {

  // useSWR is used for fetching accounts from the metamask without any useState function and it's identifier doesn't matter when we didn't hit endpoint but in case of endpoint it matter in that case we have to write /api/user/${id}
  const { mutate, ...rest } = useSWR(() => {
    return web3 ? "web3/accounts" : null },
      async () => {
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
  });

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => mutate(accounts[0] ?? null));
  }, [provider]);

  return {
    account: {
      mutate,
      ...rest,
    },
  };
};
