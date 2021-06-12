const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThought);
    
    // /api/thoughts/:id
    router
    .route('/:id')
    .get(getThoughtById)
    .post(addThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;