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
          'date_created'
        ],

      include: [{
        model:Comment,
        attributes:['id','content'],
          model: User,
          attributes:['email']
        },
      ],
    }) .then(postData =>{
      const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homePage', {posts});
    })
  } catch (err) {
    res.status(500).json(err);
  }
  router.get('/loginPage', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('loginPage');
  });






});





module.exports=router