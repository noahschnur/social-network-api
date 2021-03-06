const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);;
                res.sendStatus(400);
            });
    },
    // get one
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);;
            res.sendStatus(400);
        });
    },
    // add thought
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No user found with this id.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.'});
                    return;
                }
                 return res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: "No thought with this id!"});
                }
                return Thought.findOneAndUpdate(
                    { _id: params.id },
                    { $pull: { thoughts: {thoughtId: params.id }}},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(200).json({ message: "Thought deleted!"});
                    return;
                }
                res.json(dbThoughtData);
            })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;