import { OwnedCourseCard } from "@components/common";
import { MarketHeader } from "@components/common/marketplace";
import { BaseLayout } from "@components/common/layout";
import { Button, Message } from "@components/common";
import { useAccount, useOwnedCourses } from "@components/web3/hooks";
import { getAllCourses } from "content/courses/fetcher";

export default function OwnedCourses({ courses }) {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  return (
    <>
      {/* {JSON.stringify(ownedCourses.data)} */}
      <div className="py-4">
        <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
      { ownedCourses.data?.map(course =>
          <OwnedCourseCard
            key={course.id}
            course={course}
          >
            {/* <Message>
              My custom message!
            </Message> */}
            <Button>
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
