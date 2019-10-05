import mongoose from 'mongoose';

const UserProfileSchema = mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 255,
  },
  lastName: {
    type: String,
    maxlength: 255,
  },

  company: {
    type: String,
    maxlength: 255,
  }
}, {
  strict: 'throw',
  _id: false,
});

export default UserProfileSchema;
