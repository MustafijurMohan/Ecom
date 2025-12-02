const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { versionKey: false, minimize: false, timestamps: true }
);

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
