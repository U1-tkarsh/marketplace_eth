import { Button } from "@components/common";
import { CourseCard, CourseList } from "@components/common/course";
import { BaseLayout } from "@components/common/layout";
import { OrderModal } from "@components/common/order";
import { EthRates, WalletBar } from "@components/web3";
import { useAccount, useNetwork } from "@components/web3/hooks";
import { useEthPrice } from "@components/web3/hooks/useEthPrice";
import { getAllCourses } from "content/courses/fetcher";
import { useState } from "react"

export default function Marketplace({courses}) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { account } = useAccount()
  const { network } = useNetwork()
  const { eth } = useEthPrice()

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasInitialResponse: network.hasInitialResponse
          }}
        />
        <EthRates
          eth={eth.data}
          ethPerItem={eth.perItem}
        />
      </div>
      <CourseList
        courses={courses}
      >
      {course =>
        <CourseCard
          key={course.id}
          course={course}
          Footer={() =>
            <div className="mt-4">
              <Button
                onClick={() => setSelectedCourse(course)}
                variant="lightPurple">
                Purchase
              </Button>
            </div>
          }
        />
      }
      </CourseList>
      { selectedCourse &&
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      }
    </>
  )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}

Marketplace.Layout = BaseLayout