import {  Hero, Breadcrumbs } from "@components/common";
import { List } from "@components/common/course";
import { BaseLayout } from "@components/common/layout";
import { OrferInfo } from "@components/common/order";
import { EthRates, WalletBar } from "@components/web3";
import { getAllCourses } from "content/courses/fetcher";

export default function Home({courses}) {
  return (
    <>
      <Hero />
      <List courses = {courses}/>
      </>
  );
}

export function getStaticProps() {
  const {data} = getAllCourses()
  return {
    props: {
      courses: data
    }
  }
}

Home.Layout = BaseLayout;