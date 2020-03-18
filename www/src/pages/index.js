import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';
import styles from './LandingPage.module.css';
// import splash from '../images/splash.svg';
import Splash from '../images/Splash';
import Illustration from '../images/Illustration';
import Globe from '../images/Globe';
import Sparkles from '../images/Sparkles';
import Code from '../images/Code';

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
          <h2 className={styles.featureHeader}>Bring your data</h2>
          <div className={styles.featureIconContainer}>
            <div className={styles.featureIcon}>
              <Code />
            </div>
          </div>
          <p className={styles.featureText}>
            Want to generate a PDF directly from your data layer? That's exactly
            what GraPDF excels at. Use the provided GraphQL API and get the
            corresponding PDF back.
          </p>
          <p className={styles.featureText}>
            Unlike other services, we don't need a HTML page or any other
            presentation layer to 'photograph' it. Send your data over,
            structure it as you need, and we generate your PDF.
          </p>
        </section>
        <section className={styles.featureCard}>
          <h2 className={styles.featureHeader}>Use Anywhere</h2>
          <div className={styles.featureIconContainer}>
            <div className={styles.featureIcon}>
              <Globe />
            </div>
          </div>
          <p className={styles.featureText}>
            Doing Frontend work? Backend Work? PHP, Java, Go, Ruby, Python,
            JavaScript, Typescript, WebAssembly or something else? No matter
            what, if you can send a HTTP request you can use GraPDF to generate
            your next PDF.
          </p>
          <p className={styles.featureText}>
            Although we use GraphQL as the API layer, you don't need a full
            fledged GraphQL client. If you already use one, that's fine too.
          </p>
        </section>
        <section className={styles.featureCard}>
          <h2 className={styles.featureHeader}>Components Over Templates</h2>
          <div className={styles.featureIconContainer}>
            <div className={styles.featureIcon}>
              <Sparkles />
            </div>
          </div>
          <p className={styles.featureText}>
            Instead of defining some rigid templates and hoping, they're right
            for your use case, GraPDF comes with a set of reusable and
            adjustable components. Almost the way some famous Frontend
            Frameworks do it.
          </p>
          <p className={styles.featureText}>
            Also, thanks to the awesome GraphQL tooling, our API is explorable
            and understandable.
          </p>
        </section>
      </div>
    </div>

    <footer className={styles.footerContainer}>
      <p className={styles.footerPrimary}>
        GraPDF - The API for PDFs - <Link to="/page-2/">See a demo</Link>
      </p>
      <span className={styles.footerSecondary}>Coming soon...</span>
    </footer>
  </Layout>
);

export default IndexPage;
