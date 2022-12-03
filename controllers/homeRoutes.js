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
            model: User,
            attributes: ['name','id','email','password'],
            include:{
              model: Comment,
              attributes:['content']
            }
          },
        ],
      }) .then(postData =>{
        const posts = postData.map((post) => posts.get({ plain: true }));

      res.render('homepage', {  post,loggedIn: req.session.loggedIn});
      })
    } catch (err) {
      res.status(500).json(err);
    }
  });
  





module.exports=router