import { CourseCard, CourseList } from "@components/common/course";
import { BaseLayout } from "@components/common/layout";
import { WalletBar } from "@components/web3";
import { useAccount } from "@components/web3/hooks/useAccount";
import { useNetwork } from "@components/web3/hooks/useNetwork";
import { getAllCourses } from "content/courses/fetcher";

export default function Marketplace({courses}) {
  const { account } = useAccount()
  const { network } = useNetwork()

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasFinishedFirstFetch: network.hasFinishedFirstFetch
          }}
        />
      </div>
      <CourseList
        courses={courses}
      >
      {course =>
        <CourseCard
          key={course.id}
          course={course}
        />
      }
      </CourseList>
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