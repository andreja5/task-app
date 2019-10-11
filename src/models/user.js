const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Ne moze da bude sifra password!')
      }
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be possitive number!!!')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
});

// Creatind virtual field that is not saved in database, it's only used for reference
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

// Deleting password and tokens from request
userSchema.methods.toJSON = function () {
  const user = this;
  
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
}

// JWT
userSchema.methods.generateAuthToken = async function () {

  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  
  return token;
}

// Proveravamo da li postoji user sa istim email-om
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login!')
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login!')
  }

  return user;
}

// Hash-ujemo password pre nego sto ga sacuvamo
userSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
  const user = this;

  await Task.deleteMany({ owner: user._id })

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;