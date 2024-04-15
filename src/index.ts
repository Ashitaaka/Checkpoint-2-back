// import "reflect-metadata";
//GraphQL & TypeGraphQL
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
//Database
import db from "./db";
//Resolvers
import CountriesResolver from "./resolvers/Countries.resolver";
import { ContinentsResolver } from "./resolvers/Continents.resolver";
//Create async function to create server
async function main() {
  const schema = await buildSchema({
    resolvers: [CountriesResolver, ContinentsResolver],
  });

  const server = new ApolloServer<{}>({
    schema,
  });

  await db.initialize();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      return {};
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

//Launching main function
main();
