const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Vote,
  User,
  Link
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => ({ ...request, prisma })
});

const options = {
  tracing: true,
  uploads: {
    maxFieldSize: 10000000
  }
  // formatError: err => {
  //   console.log("err", err.message);
  //   return "error here";
  // }
};

server.start(options, () => console.log(`listening on port 4000`));
