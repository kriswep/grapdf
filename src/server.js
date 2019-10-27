import React from 'react';
import ReactPDF, { pdf } from '@react-pdf/renderer';
import Document from './Document';
// import { Font } from '@react-pdf/renderer';

// Font.registerHyphenationCallback(word => [word]);

const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # The rendered pdf Document
  type Document {
    blob: String
  }

  # The "Query" type
  type Query {
    document(doc: [Text]): Document
  }

  input Text {
    text: String
    size: TextSize
  }

  enum TextSize {
    SMALL
    NORMAL
    BIG
  }
`;

const resolvers = {
  Query: {
    document: async (obj, args, context, info) => {
      const { doc } = args;
      const blob = await getBufferBase64(doc);

      return { blob };
    },
  },
};

const getBufferBase64 = async docs => {
  const stream = await ReactPDF.renderToStream(<Document docs={docs} />);

  return new Promise(function(resolve, reject) {
    const buffers = [];
    stream.on('data', data => {
      buffers.push(data);
    });
    stream.on('end', () => {
      const result = Buffer.concat(buffers);
      resolve('data:application/pdf;base64,' + result.toString('base64'));
    });
    stream.on('error', reject);
  });
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
