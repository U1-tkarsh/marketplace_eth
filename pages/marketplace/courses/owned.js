import { OwnedCourseCard } from "@components/common";
import { MarketHeader } from "@components/common/marketplace";
import { BaseLayout } from "@components/common/layout";
import { Button, Message } from "@components/common";
import { useAccount, useOwnedCourses } from "@components/web3/hooks";
import { getAllCourses } from "content/courses/fetcher";
import { useRouter } from "next/router";
import Link from "next/link";

export default function OwnedCourses({ courses }) {
  const { account } = useAccount();
  const router = useRouter()
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  return (
    <>
        <MarketHeader />
        
      <section className="grid grid-cols-1">
      { ownedCourses.hasInitialResponse && (
          !ownedCourses.data || ownedCourses?.data.length === 0
        ) &&
          <div className="w-1/2">
            <Message type="danger">
              <div>You don't own any courses</div>
              <Link href="/marketplace" className="font-normal hover:underline">
                  <i>Purchase Course</i>
              </Link>
            </Message>
          </div>
        }
      { ownedCourses.data?.map(course =>
          <OwnedCourseCard
            key={course.id}
            course={course}
          >
            {/* <Message>
              My custom message!
            </Message> */}
            <Button
              onClick={() => router.push(`/courses/${course.slug}`)}
            >
              Watch the course
            </Button>
          </OwnedCourseCard>
        )}
      </section>
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

OwnedCourses.Layout = BaseLayout;
