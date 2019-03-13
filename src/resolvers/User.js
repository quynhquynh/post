// to populate data

const links = ({ id }, args, context) => context.prisma.user({ id }).links();

const votes = ({ id }, args, context) => context.prisma.user({ id }).votes();

module.exports = { links, votes };
