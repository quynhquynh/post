const postedBy = ({ id }, args, context) =>
  context.prisma.link({ id }).postedBy();

const votes = ({ id }, args, context) => context.prisma.link({ id }).votes();

module.exports = { postedBy, votes };
