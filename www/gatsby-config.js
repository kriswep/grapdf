module.exports = {
  siteMetadata: {
    title: `GraPDF`,
    description: `Create PDFs from your data with an GraphQL API.`,
    author: `@kriswep`,
    siteUrl: `https://grapdf.com`,
  },
  proxy: {
    prefix: '/.netlify',
    url: 'http://localhost:8888',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#69F0AE`,
        theme_color: `#DBF9EA`,
        display: `minimal-ui`,
        icon: `src/images/grapdf-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-matomo`,
      options: {
        siteId: `2`,
        matomoUrl: `https://matomo.wetainment.com`,
        siteUrl: `https://grapdf.com`,
        disableCookies: true,
        // dev: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
