const router = require('express').Router()
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id', 'email', 'password'],
                },
            ],
        });

        // Serialize data so the template can read it
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        console.log(comments);
        // Pass serialized data and session flag into template
        res.render('singlePost', {
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    const body = req.body
    try {
        const newComment = await Comment.create({
            ...body,
            userId: req.session.userId,
        });
        res.json(newComment);

    } catch (err) {
        res.status(500).json(err);
    }
});







module.exports = router