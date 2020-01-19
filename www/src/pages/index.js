import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import styles from './LandingPage.module.css';
// import splash from '../images/splash.svg';
import Splash from '../images/Splash';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <header className={styles.heroContainer}>
      <h1 className={styles.heroText}>
        Generate your PDFs using our modern GraphQL API
      </h1>
      <Splash className={styles.heroSplash} />
    </header>
    <div className={styles.secondaryContainer}>
      <section className={styles.secondaryText}>
        <p>
          Perfect for generating your PDF invoices, reports, contracts.
          Integrates nicely in your stack, thanks to the nature of the provided
          GraphQL API.
        </p>
        <p>Developers will love it.</p>
      </section>
      <div className={styles.illustration}>
        <Image />
      </div>
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
