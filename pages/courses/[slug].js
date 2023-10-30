import { Modal } from "@components/common";
import { Curriculum, Hero, KeyPoint } from "@components/common/course";
import { BaseLayout } from "@components/common/layout";

export default function Course() {
  return (
    <>
    <div className="py-4">
      <Hero />
      </div>
      <KeyPoint />
      <Curriculum />
      <Modal />
      </>
  );
}


Course.Layout = BaseLayout;