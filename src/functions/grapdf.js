import React from 'react';
import ReactPDF, { pdf } from '@react-pdf/renderer';
import {
  ApolloServer,
  gql,
  makeExecutableSchema,
  mergeSchemas,
  ApolloError,
} from 'apollo-server-lambda';
import ConstraintDirective from 'graphql-constraint-directive';

import Document from './document/Document';
// import { Font } from '@react-pdf/renderer';

// Font.registerHyphenationCallback(word => [word]);

// our schema
const typeDefs = gql`
  directive @constraint(
    # String constraints
    minLength: Int
    maxLength: Int
    startsWith: String
    endsWith: String
    notContains: String
    pattern: String
    format: String

    # Number constraints
    min: Int
    max: Int
    exclusiveMin: Int
    exclusiveMax: Int
    multipleOf: Int
  ) on INPUT_FIELD_DEFINITION

  # The rendered pdf Document
  type PDF {
    blob: String
  }

  # The "Query" type
  type Query {
    document(doc: [Document]): PDF
    error(code: Int): PDF
  }

  input Document {
    title: Title
    text: Text
  }

  input Text {
    text: String! @constraint(maxLength: 1000)
    size: TextSize
  }

  input Title {
    text: String! @constraint(maxLength: 30)
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

    error: async (obj, args, context, info) => {
      let { code } = args;
      if (!code) {
        code = 400;
      }

      throw new ApolloError('An simple error', code);
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

// Start Apollo

// workaround to get directives and introspection working, see https://github.com/confuser/graphql-constraint-directive/issues/2#issuecomment-404148819
const constraintSchema = makeExecutableSchema({
  typeDefs: `
  scalar ConstraintString
  scalar ConstraintNumber`,
});

// the normal schema
const BaseSchema = makeExecutableSchema({
  resolvers,
  typeDefs,
  schemaDirectives: {
    constraint: ConstraintDirective,
  },
});

// combine both
const schema = mergeSchemas({ schemas: [constraintSchema, BaseSchema] });

// apollo with executable, full schema
const server = new ApolloServer({
  schema,

  formatResponse(body) {
    if (body.errors) {
      return {
        ...body,
        data: undefined,
      };
    }

    return body;
  },
  plugins: [
    {
      requestDidStart() {
        return {
          didEncounterErrors({ response, errors }) {
            if (
              errors[0] &&
              errors[0].extensions &&
              errors[0].extensions.code
            ) {
              response.http.status = errors[0].extensions.code;
            } else {
              response.http.status = 400;
            }
          },
        };
      },
    },
  ],
});

const handler = server.createHandler();

export { handler };
