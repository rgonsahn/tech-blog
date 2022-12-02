// only for get routes
const router=require('express').Router()
const { Post, User,Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => posts.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        post, 
        loggedIn: req.session.loggedIn 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  





module.exports=router