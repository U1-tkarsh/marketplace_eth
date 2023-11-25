import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0x481f05f62b1e3b3ee121704c95ceaab4858256e3fc36646b03b9aaa5b5c9962c": true,

  "0xbea2124ca3b7c8567080ed86f309b1ad48d8acc96af864cf75394c18c0e4c62f": true  
}

export const handler = (web3, provider) => () => {

  // useSWR is used for fetching accounts from the metamask without any useState function and it's identifier doesn't matter when we didn't hit endpoint but in case of endpoint it matter in that case we have to write /api/user/${id}
  const {data, mutate, ...rest } = useSWR(() => {
    return web3 ? "web3/accounts" : null },
      async () => {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0]

      if (!account) {
        throw new Error("Cannot retreive an account. Please refresh the browser.")
      }

      return account
  });

  useEffect(() => {
    const mutator = (accounts) => mutate(accounts[0] ?? null)
      provider?.on("accountsChanged", mutator);

      return () => {
        provider?.removeListener("accountsChanged", mutator);
      }
  }, [provider]);

  return {
        data,
        isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
        mutate,
        ...rest,
  };
};
