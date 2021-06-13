const { Thought } = require('../models');

const reactionController = {
    // add reaction
    addReaction({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { reactions: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id.'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedReaction => {
                if(!deletedReaction) {
                    return res.status(404).json({ message: "No reaction with this id!"});
                }
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $pull: { reactions: {reactionId: params.reactionId }}},
                    { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "Reaction deleted"});
                return;
            }
            res.json(dbThoughtData);
        })
    .catch(err => res.json(err));
    }
};

module.exports = reactionController;