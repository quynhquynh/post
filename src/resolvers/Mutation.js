const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId, processUpload } = require("../utils"); // separate APP_SECRET

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  return {
    ...user
  };
};

const login = async (parent, { email, password }, context, info) => {
  const user = await context.prisma.user({ email });
  if (!user) {
    throw new Error("No such user found");
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
};

const post = async (parent, { title, description, file, tags }, ctx) => {
  // const userId = getUserId(ctx);
  const fileUrl = await processUpload(file);
  const link = await ctx.prisma.createLink({
    title,
    description,
    fileUrl,
    tags: { set: tags ? tags.split("") : [] },
    postedBy: { connect: { id: "cjsyev7nt8da70b30lpj92qly" } }
  });
  return link;
};

const vote = async (parent, { linkId }, context, info) => {
  const userId = getUserId(context);
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: linkId }
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${linkId}`);
  }
  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: linkId } }
  });
};

const removeVotesByUsers = async (parent, args, context, info) => {
  const userId = getUserId(context);
  const votes = context.prisma.votes({ user: userId }); //await
  if (!votes) {
    throw new Error("No vote for this user to be removed");
  }
  return context.prisma.deleteManyVotes({
    user: { id: userId }
  });
};

const removeAllUsers = async (parent, args, ctx, info) => {
  return ctx.prisma.deleteManyUsers({
    name_not: "Quynh Le"
  });
};

const removeLinkWithNullUser = async (parent, args, ctx, info) => {
  return ctx.prisma.deleteManyLinks({
    url_contains: "url"
  });
};

module.exports = {
  signup,
  login,
  post,
  vote,
  removeVotesByUsers,
  removeAllUsers,
  removeLinkWithNullUser
};
