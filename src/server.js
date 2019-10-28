import React from 'react';
import ReactPDF, { pdf } from '@react-pdf/renderer';
import {
  ApolloServer,
  gql,
  makeExecutableSchema,
  mergeSchemas,
} from 'apollo-server';
import ConstraintDirective from 'graphql-constraint-directive';

import Document from './Document';
// import { Font } from '@react-pdf/renderer';

// Font.registerHyphenationCallback(word => [word]);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
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
  type Document {
    blob: String
  }

  # The "Query" type
  type Query {
    document(doc: [Text]): Document
  }

  input Text {
    text: String! @constraint(maxLength: 1000)
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
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server');
// const { GraphQLScalarType, GraphQLNonNull } = require('graphql');

// const typeDefs = gql`
//   directive @length(max: Int) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

//   type Query {
//     hello(book: BookInput): [String]
//   }

//   input BookInput {
//     title: String! @length(max: 5)
//   }
// `;

// class LengthDirective extends SchemaDirectiveVisitor {
//   visitInputFieldDefinition(field) {
//     this.wrapType(field);
//   }

//   visitFieldDefinition(field) {
//     this.wrapType(field);
//   }

//   // Replace field.type with a custom GraphQLScalarType that enforces the
//   // length restriction.
//   wrapType(field) {
//     if (
//       field.type instanceof GraphQLNonNull &&
//       field.type.ofType instanceof GraphQLScalarType
//     ) {
//       field.type = new GraphQLNonNull(
//         new LimitedLengthType(field.type.ofType, this.args.max),
//       );
//     } else if (field.type instanceof GraphQLScalarType) {
//       field.type = new LimitedLengthType(field.type, this.args.max);
//     } else {
//       throw new Error(`Not a scalar type: ${field.type}`);
//     }
//   }
// }

// class LimitedLengthType extends GraphQLScalarType {
//   constructor(type, maxLength) {
//     super({
//       name: `LengthAtMost${maxLength}`,

//       // For more information about GraphQLScalar type (de)serialization,
//       // see the graphql-js implementation:
//       // https://github.com/graphql/graphql-js/blob/31ae8a8e8312/src/type/definition.js#L425-L446

//       serialize(value) {
//         value = type.serialize(value);
//         // assert.isAtMost(value.length, maxLength);
//         return value;
//       },

//       parseValue(value) {
//         return type.parseValue(value);
//       },

//       parseLiteral(ast) {
//         return type.parseLiteral(ast);
//       },
//     });
//   }
// }

// const resolvers = {
//   Query: {
//     hello: async (obj, args, context, info) => {
//       const { doc } = args;
//       const blob = await getBufferBase64(doc);

//       return { hello: 'world' };
//     },
//   },
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   schemaDirectives: {
//     length: LengthDirective,
//   },
// });

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
