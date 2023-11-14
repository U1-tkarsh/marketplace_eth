import { Navbar, Footer} from "@components/common"
import { Web3Provider } from "@components/providers"
import Script from "next/script"

export default function BaseLayout({children}) {
  return (
    <Web3Provider>
      <div className="max-w-7xl mx-auto px-4">
        <Navbar />
        <div className="fit">
          {children}
        </div>
      </div>
      <Footer />
    </Web3Provider>
  )
}