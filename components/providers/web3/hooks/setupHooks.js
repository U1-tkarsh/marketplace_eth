import { handler as createUseAccount } from "./useAccount";
import { useAccount } from "./useAccount";


export const setupHooks = (...deps) => {

  return {
    useAccount: createUseAccount(...deps)
  }
}