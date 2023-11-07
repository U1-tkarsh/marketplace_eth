import { useEffect } from "react"
import useSWR from "swr"

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Linet Mainnet",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  59140: "Linea Goreli",
  11155111: "Sepolia ETH",
  1337: "Ganache",
}

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID]

export const handler = (web3, provider) => () => {

  const {data, error, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/network" : null,
    async () => {
      const chainId = await web3.eth.getChainId()
      return NETWORKS[chainId]
    }
  )

  useEffect(() => {
    provider &&
    provider.on("chainChanged", chainId => {
      mutate(NETWORKS[parseInt(chainId, 16)])
    })
  }, [web3])

  return {
    network: {
      data,
      hasFinishedFirstFetch: data || error,
      mutate,
      target: targetNetwork,
      isSupported: data === targetNetwork,
      ...rest
    }
  }
}