import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';
import styles from './LandingPage.module.css';
// import splash from '../images/splash.svg';
import Splash from '../images/Splash';
import Illustration from '../images/Illustration';

const IndexPage = () => (
  <Layout>
    <SEO title="GraPDF - API for PDFs" />
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
        <a
          href="https://buttondown.email/grapdf"
          rel="noopener"
          className={styles.cta}
        >
          Subscribe to stay updated
        </a>
      </section>
      <div>
        <Illustration className={styles.illustration} />
      </div>
    </div>
    <div className={styles.featureContainer}>
      <div className={styles.featureList}>
        <section className={styles.featureCard}>
          <h2 className={styles.featureHeader}>Use anywhere</h2>
          <p className={styles.featureText}>
            Non nunc, malesuada mauris in. Platea risus fames auctor mauris cras
            vitae. Ultrices ullamcorper faucibus facilisis lacus, dictumst
            congue habitant amet, bibendum. Sed dolor vitae eu purus amet
            pharetra ut. Venenatis sit eget ut ultrices nunc dui.
          </p>
        </section>
        <section className={styles.featureCard}>
          <h2 className={styles.featureHeader}>Flexible templates</h2>
          <p className={styles.featureText}>
            Non nunc, malesuada mauris in. Platea risus fames auctor mauris cras
            vitae. Ultrices ullamcorper faucibus facilisis lacus, dictumst
            congue habitant amet, bibendum. Sed dolor vitae eu purus amet
            pharetra ut. Venenatis sit eget ut ultrices nunc dui.
          </p>
        </section>
        <section className={styles.featureCard}>
          <h2 className={styles.featureHeader}>Any language</h2>
          <p className={styles.featureText}>
            Non nunc, malesuada mauris in. Platea risus fames auctor mauris cras
            vitae. Ultrices ullamcorper faucibus facilisis lacus, dictumst
            congue habitant amet, bibendum. Sed dolor vitae eu purus amet
            pharetra ut. Venenatis sit eget ut ultrices nunc dui.
          </p>
        </section>
      </div>
    </div>

    <footer className={styles.footerContainer}>
      <Link to="/page-2/">See a demo</Link>{' '}
      <span className={styles.footerSecondary}>Coming soon...</span>
    </footer>
  </Layout>
);

export default IndexPage;
