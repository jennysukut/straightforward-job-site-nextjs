import { graphql } from "graphql";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

// Fill this in with the schema string
const schemaString = `...`;

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({ schema });

const query = /* GraphQL */ `
  query tasksForUser {
    user(id: 6) {
      id
      name
    }
  }
`;

graphql({
  schema: schemaWithMocks,
  source: query,
}).then((result) => console.log("Got result", result));
