import { OwnedCourseCard } from "@components/common";
import { MarketHeader } from "@components/common/marketplace";
import { BaseLayout } from "@components/common/layout";
import { Button, Message } from "@components/common";
import { useOwnedCourses } from "@components/web3/hooks";

export default function OwnedCourses() {
  const { ownedCourses } = useOwnedCourses()

  return (
    <>
    { ownedCourses.data }
      <div className="py-4">
        <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
      <OwnedCourseCard>
          <Message>
            My custom message!
          </Message>
          <Button>
            Watch the course
          </Button>
        </OwnedCourseCard>
      </section>
    </>
  );
}

OwnedCourses.Layout = BaseLayout;
