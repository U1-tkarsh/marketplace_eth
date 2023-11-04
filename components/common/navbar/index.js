import Link from "next/link";
import { useWeb3 } from "@components/providers";
import { Button } from "@components/common";
import { useAccount } from "@components/web3/hooks/useAccount";

export default function Footer() {
  const { connect, isLoading, isWeb3Loaded } = useWeb3();
  const { account } = useAccount();
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Marketplace
              </Link>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Blogs
              </Link>
            </div>
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Wishlist
              </Link>
              {isLoading ? (
                <Button disabled={true} onClick={connect}>
                  Loading...
                </Button>
              ) : isWeb3Loaded ? (
                account ? (
                  <Button hoverable={false} className="cursor-default ">
                    Hi there
                  </Button>
                ) : (
                  <Button onClick={connect}>Connect</Button>
                )
              ) : (
                <Button
                  onClick={() =>
                    window.open("https://metamask.io/download/", "_blank")
                  }
                >
                  Install Metamask
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {account && <div className="flex justify-end pt-1 sm:px-6 lg:px-8"><div className="text-whie bg-indigo-600 rounded-md p-2">{account}</div></div>}
    </section>
  );
}
