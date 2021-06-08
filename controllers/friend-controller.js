const { User } = require('../models');

const friendController = {
    // add new friend
    addFriend({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = friendController;