const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You need a username!',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'You need a valid email!',
            validate: {
                validator: async function(email) {
                    const user = await this.constructor.findOne({ email });
                    if(user) {
                      if(this.id === user.id) {
                        return true;
                      }
                      return false;
                    }
                    return true;
                  },
                  message: 'The specified email address is already in use.',
                },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: Thought
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: User
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;