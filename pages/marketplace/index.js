import {  Button } from "@components/common";
import { CourseCard, CourseList } from "@components/common/course";
import { BaseLayout } from "@components/common/layout";
import { MarketHeader } from "@components/common/marketplace";
import { OrderModal } from "@components/common/order";
import { useWalletInfo } from "@components/web3/hooks";
import { getAllCourses } from "content/courses/fetcher";
import { useState } from "react";
import { useWeb3 } from "@components/providers"

export default function Marketplace({courses}) {
  const { web3, contract } = useWeb3()
  const { canPurchaseCourse, account } = useWalletInfo()
  const [selectedCourse, setSelectedCourse] = useState(null)

  const purchaseCourse = async order => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id)
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    )
    const emailHash = web3.utils.sha3(order.email)
    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    )

    const value = web3.utils.toWei(String(order.price))

    try {
      const result = await contract.methods.purchaseCourse(
        hexCourseId,
        proof
      ).send({from: account.data, value})
      console.log(result)
    } catch {
      console.error("Purchase course: Operation has failed.")
    }
  }

  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <CourseList
        courses={courses}
      >
      {course =>
        <CourseCard
          key={course.id}
          course={course}
          disabled={!canPurchaseCourse}
          Footer={() =>
            <div className="mt-4">
              <Button
                onClick={() => setSelectedCourse(course)}
                disabled={!canPurchaseCourse}
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
          onSubmit={purchaseCourse}
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