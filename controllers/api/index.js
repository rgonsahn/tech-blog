const router=require('express').Router()
const userRoutes = require('./user-routes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments',commentRoutes)







module.exports=router