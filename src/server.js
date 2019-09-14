import React from 'react';
import ReactPDF, { pdf } from '@react-pdf/renderer';
import Document from './Document';
import fs from 'fs';
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

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
      // const MyDoc = <Document text="My awesome GraphQL text" />;

      // const instance = pdf(MyDoc);
      // const blob = instance.toString();
      // const blob = await getBuffer('My awesome GraphQL text');
      // console.log(blob);

      await ReactPDF.render(
        <Document text="My awesome Text" />,
        `${__dirname}/example.pdf`,
      );
      const blob = await readFile(`${__dirname}/example.pdf`, 'UTF-8');
      console.log(blob);

      return { blob };
    },
  },
};

const getBuffer = async text => {
  const stream = await ReactPDF.renderToStream(<Document />);

  return new Promise(function(resolve, reject) {
    // const buffers = [];
    let string = '';
    stream.on('data', data => {
      // buffers.push(data);
      string += data.toString();
    });
    stream.on('end', () => {
      // resolve(Buffer.concat(buffers));
      resolve(string);
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

// ReactPDF.render(
//   <Document text="My awesome Text" />,
//   `${__dirname}/example.pdf`,
// );
