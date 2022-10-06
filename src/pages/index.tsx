import type { NextPage } from "next";
import Head from "next/head";
import Rules from "../components/Rules";
import Content from "../components/UI/Content";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Juice Defifa</title>
        <meta name="description" content="Juice Defifa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content title="RULES">
        <Rules />
      </Content>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </footer> */}
    </div>
  );
};

export default Home;
