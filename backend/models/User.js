const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    name: { type: String, trim: true, maxlength: 80 },
    passwordHash: { type: String, required: true, select: false },
    primaryDosha: { type: String, enum: ['vata', 'pitta', 'kapha', null], default: null },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function setPassword(plain) {
  if (typeof plain !== 'string' || plain.length < 8) {
    throw Object.assign(new Error('Password must be at least 8 characters'), { status: 400 });
  }
  const rounds = parseInt(process.env.BCRYPT_ROUNDS, 10) || 12;
  this.passwordHash = await bcrypt.hash(plain, rounds);
};

userSchema.methods.verifyPassword = function verifyPassword(plain) {
  if (!this.passwordHash) return Promise.resolve(false);
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
    primaryDosha: this.primaryDosha,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model('User', userSchema);
