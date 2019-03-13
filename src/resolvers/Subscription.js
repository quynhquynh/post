const newLinkSubscribe = (parent, args, context, info) =>
  context.prisma.$subscribe
    .link({
      mutation_in: ["CREATED"]
    })
    .node();

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload
};

const newVoteSubscription = (parent, args, context) =>
  context.prisma.$subscribe
    .vote({
      mutation_in: ["CREATED"]
    })
    .node();

const newVote = {
  subscribe: newVoteSubscription,
  resolve: payload => payload
};

module.exports = { newLink, newVote };
