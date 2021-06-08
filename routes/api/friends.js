const router = require('express').Router();
const {
    addFriend,
    deleteFriend
} = require('../../controllers/friend-controller');

// /api/users/:userId/friends/:friendId
router
    .route('/users/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;