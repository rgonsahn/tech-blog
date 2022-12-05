const withAuth = require('../../utils/auth');

const router = require('express').Router()


// CREATE POST
router.post('/', withAuth, async (req, res) => {
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
// UPDATE POST
router.put('/', withAuth, async (req, res) => {
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
            res.status(200).end();
        } else {
            res.status(404).end();
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