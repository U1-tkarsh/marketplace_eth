import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0x481f05f62b1e3b3ee121704c95ceaab4858256e3fc36646b03b9aaa5b5c9962c": true,
}

export const handler = (web3, provider) => () => {

  // useSWR is used for fetching accounts from the metamask without any useState function and it's identifier doesn't matter when we didn't hit endpoint but in case of endpoint it matter in that case we have to write /api/user/${id}
  const {data, mutate, ...rest } = useSWR(() => {
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
        data,
        isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
        mutate,
        ...rest,
      },
  };
};
