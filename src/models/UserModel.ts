import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import validator from 'validator';

interface IUser {
  name: string;
  password: string;
  passwordConfirm: string;
  email: string;
  createdAt: Date;
  passwordChangeAt: Date;
  role: 'admin' | 'user';
  passwordToken: string | undefined;
  passwordTokenExpiresIn: Date | undefined;
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  isPasswordChanged(jwtTimestamp: number): boolean;
  getPasswordResetToken(): string;
}

export type TUserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, TUserModel, IUserMethods>({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 4,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (val: string) {
        let obj = this as unknown as { password: string };
        return obj.password === val;
      },
      message: 'passwordConfirm not valid',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email'],
  },
  passwordChangeAt: {
    type: Date,
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpiresIn: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isPasswordChanged = function (jwtTimestamp: number) {
  if (this.passwordChangeAt) {
    const transfromDateToMs = this.passwordChangeAt.getTime() / 1000;
    const passwordChangeAt = parseInt(`${transfromDateToMs}`, 10);
    return jwtTimestamp < passwordChangeAt;
  }
  return false;
};

userSchema.methods.getPasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.passwordToken = crypto.createHash('sha256').update(token).digest('hex');
  this.passwordTokenExpiresIn = Date.now() + 10 * 60 * 1000;
  return token;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = null!;
  return next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangeAt = new Date(Date.now() - 2000);
  return next();
});

const User = model<IUser, TUserModel>('User', userSchema);

export default User;
