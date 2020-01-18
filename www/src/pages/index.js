import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Generate your PDFs using our modern GraphQL API</h1>
    <p>
      Perfect for generating your PDF invoices, reports, contracts. Integrates
      nicely in your stack, thanks to the nature of the provided GraphQL API.
    </p>
    <p>Developers will love it.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
