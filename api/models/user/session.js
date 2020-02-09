import mongoose from 'mongoose';

const UserSessionSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
}, {
  strict: true,
  _id: false,
});

export default UserSessionSchema;
