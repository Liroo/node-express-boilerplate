import mongoose from 'mongoose';

import UserSessionSchema from 'models/user/session';
import UserProfileSchema from 'models/user/profile';

import bcrypt from 'bcrypt';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const SALT_ROUND = 10;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (val) => EMAIL_REGEX.test(val),
  },
  password: {
    type: String,
    required: true,
  },

  profile: {
    type: UserProfileSchema,
  },

  sessions: {
    type: [UserSessionSchema],
    default: [],
  },

  forgetPasswordToken: String,
}, {
  strict: 'throw',
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) { return next(); }

  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUND);
    next();
  } catch(err) {
    next(err);
  }
});

UserSchema.method('comparePassword', async function(password) {
  return await bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', UserSchema);

export default User;
