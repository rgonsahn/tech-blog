const { Post } = require('../models');

const postdata =
[
  {
    "postTitle": "RN life",
    "postContent": "Very hectic, we have reached capacity",
    "userId": 1
  },
  {
    "postTitle": "Covid Frontlines",
    "postContent": "We are tired, supplies and resources are limited!",
    "userId": 2
  },
  {
    "postTitle": "Adventures",
    "postContent": "Discount tickets to various attractions!",
    "userId": 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;