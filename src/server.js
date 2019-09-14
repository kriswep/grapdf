import React from 'react';
import ReactPDF, { pdf } from '@react-pdf/renderer';

import Document from './Document';

const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # The rendered pdf Document
  type Document {
    blob: String
  }

  # The "Query" type
  type Query {
    document: Document
  }
`;

const resolvers = {
  Query: {
    document: async () => {
      const MyDoc = <Document />;
      const instance = await pdf(MyDoc); //.toBlob();
      const blob = await instance.toString();
      return { blob };
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

ReactPDF.render(<Document />, `${__dirname}/example.pdf`);
