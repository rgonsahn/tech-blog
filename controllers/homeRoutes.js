// only for get routes
const router=require('express').Router()
const { Post, User,Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
      await Post.findAll({
        attributes:[
          'title',
          'content',
        ],

      include: [
        {
          model: User
        },
      ],
    }) .then(postData =>{
      const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homePage', {posts});
    })
  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports=router