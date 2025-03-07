import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  acceptedTerms: {
    type: Boolean,
    required: [true, 'Please accept the terms and conditions'],
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure email index is created
userSchema.index({ email: 1 }, { 
  unique: true,
  background: true,
  name: 'email_unique' 
});

// Pre-save middleware to clean email
userSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.trim().toLowerCase();
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;