const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    if(!req.session.loggedIn){
        res.redirect('/loginPage')
    }
    // Get all projects and JOIN with user data
    const dashData = await Post.findAll({
      attributes: ["title","content"],
      where:  {
          userId: req.session.userId
        },
      
    });

    // Serialize data so the template can read it
    const usersPosts =dashData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboardRoutes', { 
      usersPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).end()
  }
});

router.get('/singlePost/:id', async (req, res) => {
  try {
    const postDbData = await Post.findByPk(req.params.id, {
      attributes: ["id","title","content"]
       
    });

    const postData = postDbData.get({ plain: true });

    res.render('singlePost', {
      ...postData,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId,
        });
        console.log("Your new post:", newPost)
        res.status(200).json(newPost);
    } catch (err) {
        console.log('YOUR POST FAILED', err);
        res.status(400).json(err);
    }
});
router.put('/singlePost/:id', async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId,
        },
            {
                where: {
                    id: req.params.id
                },
            });
        if (affectedRows > 0) {
            res.status(200)(updatedPost);
        } else {
            res.status(500).json(err);
        }

    }
    catch (err) {
        res.status(500).json(err);
    }
});
//DELETE POST
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});


























module.exports = router

