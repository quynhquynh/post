const {
  accessKeyId,
  secretAccessKey,
  Bucket
} = require("../../config/credentials");
const aws = require("aws-sdk");

const feed = async (
  root,
  { filter, skip, first, orderBy, after },
  context,
  info
) => {
  const where = filter
    ? {
        OR: [{ description_contains: filter }, { title_contains: filter }]
      }
    : {};
  const links = await context.prisma.links({
    where,
    skip,
    first,
    orderBy,
    after
  });
  const count = await context.prisma
    .linksConnection({ where })
    .aggregate()
    .count();

  // const s3 = new aws.S3({
  //   accessKeyId,
  //   secretAccessKey,
  //   Bucket
  // });

  // const params = {
  //   Bucket,
  //   Key: "ed892690-44a2-11e9-a70f-95a274aafea9-eggs.jpeg"
  // };
  // const file = require("fs").createWriteStream("./uploads/mimo.png");
  // s3.getObject(params)
  //   .createReadStream()
  //   .pipe(file);

  // s3.getObject(params, (err, data) => {
  //   if (err) console.log(err);
  //   const fs = require("fs");
  //   const wStream = fs.createWriteStream("./ohoh.jpeg");
  //   wStream.write(data.Body);
  //   wStream.end();
  // });

  return { links, count };
};

const users = (root, args, context) => context.prisma.users();

const allVotes = (root, args, context) => context.prisma.votes();

const link = (root, { id }, context) => context.prisma.link({ id });

const feedCursor = async (root, { filter, after, first }, context) => {
  const where = filter
    ? {
        OR: [{ description_contains: filter }, { title_contains: filter }]
      }
    : {};

  const totalCount = await context.prisma
    .linksConnection({ where, first, after })
    .aggregate()
    .count();

  const edges = await context.prisma
    .linksConnection({ where, first, after })
    .edges();

  const pageInfo = await context.prisma
    .linksConnection({ where, first, after })
    .pageInfo();

  return {
    edges,
    pageInfo,
    totalCount
  };
};

module.exports = {
  feed,
  users,
  allVotes,
  link,
  feedCursor
};
