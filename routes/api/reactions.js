const router = require('express').Router();
const { 
    createReaction,
    deleteReaction
} = reuqire('../../controllers/reaction-controller');

// /api/thoughts/:thoughtId/reactions
router
    .route('/api/thoughts/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);

module.exports = router;