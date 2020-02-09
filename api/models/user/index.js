import mongoose from 'mongoose';

import UserSessionSchema from 'models/user/session';
import UserProfileSchema from 'models/user/profile';

import bcrypt from 'bcrypt';

// eslint-disable-next-line no-useless-escape
const SALT_ROUND = 10;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
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
  strict: true,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
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

UserSchema.method('getLastSession', function () {
  if (!this || !(this.sessions instanceof Array)) {
    return {};
  }

  return (this.sessions.slice(-1)[0] || {});
});

const User = mongoose.model('User', UserSchema);

export default User;
